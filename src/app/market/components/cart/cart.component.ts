import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {CartProduct} from '../../models/cart-product.model';
import {Purchase} from '../../models/purchase.model';
import {MarketStoreService} from '../../service/market-store.service';
import {Destroyable} from '../../utils/destroyable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent extends Destroyable implements OnInit {
  @Output() onCartProductRemoved = new EventEmitter<number>();
  @Output() onCartCleared = new EventEmitter<void>();

  cartProducts: CartProduct[];
  errorMessage: string = null;

  constructor(
    private marketStoreService: MarketStoreService
  ) {
    super();
  }

  form = new FormGroup({
    firstName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    lastName: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    email: new FormControl(null, { validators: Validators.email, updateOn: 'change' })
  });

  private get firstName(): AbstractControl {
    return this.form.get('firstName');
  }

  private get lastName(): AbstractControl {
    return this.form.get('lastName');
  }

  private get email(): AbstractControl {
    return this.form.get('email');
  }

  ngOnInit(): void {
    this.marketStoreService.select.cartProducts().pipe(takeUntil(this.destroyed$)).subscribe(cartProducts => {
      this.cartProducts = cartProducts;
    });
  }

  calculateTotalSum(cartProducts: CartProduct[]): any {
    let sum = '0';
    cartProducts.forEach(product => {
      sum += (product.price * product.quantity)
    });
    return sum;
  }

  submitPurchase(): void {
    this.form.markAllAsTouched();
    
    if (!this.form.valid) {
      this.showErrorMessage('Please fill properly in mandatory fields!')
      return;
    }
    if(!this.cartProducts || this.cartProducts.length === 0){
      this.showErrorMessage('There is no any product to purchase!')
    }
    const purchase = {} as Purchase;
    purchase.firstName = this.firstName.value;
    purchase.lastName = this.lastName.value;
    purchase.email = this.email.value;
    purchase.cartProducts = this.cartProducts;
    this.marketStoreService.dispatch.submitPurchase(purchase);
    this.form.reset();
    this.onCartCleared.emit();
  }

  showErrorMessage(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  removeProductFromCart(product: CartProduct) {
    this.marketStoreService.dispatch.removeProductFromCart(product.id);
    this.onCartProductRemoved.emit(product.quantity);
  }

}