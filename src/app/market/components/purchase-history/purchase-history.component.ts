import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Destroyable} from '../../utils/destroyable';
import {Purchase} from '../../models/purchase.model';
import {Observable} from 'rxjs';
import {MarketStoreService} from '../../service/market-store.service';
import {takeUntil} from 'rxjs/operators';
import {CartProduct} from '../../models/cart-product.model';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {PurchaseFilterParams} from '../../models/purchase-filter-params.model';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html'
})
export class PurchaseHistoryComponent extends Destroyable implements OnInit, AfterContentChecked {
  purchases$: Observable<Purchase[]>;
  errorMessage: string = null;
  

  constructor(
    private marketStoreService: MarketStoreService,
    private cdref: ChangeDetectorRef
  ) {
    super();
    this.marketStoreService.dispatch.loadPurchases();
  }

  form = new FormGroup({
    firstName: new FormControl(null, { updateOn: 'change' }),
    lastName: new FormControl(null, { updateOn: 'change' }),
    productName: new FormControl(null, { updateOn: 'change' }),
    maxPrice: new FormControl(null, { validators: [Validators.min(0)], updateOn: 'change' }),
    maxTotal: new FormControl(null, { validators: [Validators.min(0)], updateOn: 'change' }),
    maxQuantity: new FormControl(null, { validators: [Validators.min(1)], updateOn: 'change' })
  });

  private get firstName(): AbstractControl {
    return this.form.get('firstName');
  }
  private get lastName(): AbstractControl {
    return this.form.get('lastName');
  }
  private get productName(): AbstractControl {
    return this.form.get('productName');
  }
  private get maxPrice(): AbstractControl {
    return this.form.get('maxPrice');
  }
  private get maxTotal(): AbstractControl {
    return this.form.get('maxTotal');
  }
  private get maxQuantity(): AbstractControl {
    return this.form.get('maxQuantity');
  }

  ngOnInit(): void {
    this.purchases$ = this.marketStoreService.select.purchases().pipe(takeUntil(this.destroyed$));
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  calculateTotalSum(cartProducts: CartProduct[]): number {
    return cartProducts.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);
  }

  searchPurchases() {
    this.form.markAllAsTouched();
    
    if (!this.form.valid) {
      this.showErrorMessage('Please provide proper filter values!')
      return;
    }

    const filterParams: PurchaseFilterParams = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      productName: this.productName.value,
      maxPrice: this.maxPrice.value,
      maxTotal: this.maxTotal.value,
      maxQuantity: this.maxQuantity.value
    };

    this.marketStoreService.dispatch.searchPurchases(filterParams);
  }

  showErrorMessage(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}