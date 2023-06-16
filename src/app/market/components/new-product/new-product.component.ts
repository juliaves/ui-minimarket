import {Component, OnInit} from '@angular/core';
import {MarketStoreService} from '../../service/market-store.service';
import {Destroyable} from '../../utils/destroyable';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Product} from '../../models/product.model';
import {take, takeUntil} from 'rxjs';
import {AlertMessage, AlertMessageStatus} from '../../models/alert-message.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent extends Destroyable implements OnInit{
  readonly chooseOption = '-Choose-';
  categories: string[];
  selectedCategory = '';
  alertMessage: AlertMessage = {
    status: undefined,
    message: undefined
  }

  constructor(
    private marketStoreService: MarketStoreService
  ) {
    super();
    this.marketStoreService.dispatch.loadProducts();
    this.categories = ['', 'FRUITS', 'VEGETABLES', 'DRINKS', 'SWEETS'];
  }

  ngOnInit(): void {
    this.marketStoreService.dispatch.clearNewProductSaveStatus();
  }

  form = new FormGroup({
    name: new FormControl(null, { validators: Validators.required, updateOn: 'change' }),
    price: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(100)], updateOn: 'change' }),
    description: new FormControl(null, { updateOn: 'change' })
  });

  private get name(): AbstractControl {
    return this.form.get('name');
  }

  private get price(): AbstractControl {
    return this.form.get('price');
  }

  private get description(): AbstractControl {
    return this.form.get('description');
  }

  chooseCategory(category: string) {
    this.selectedCategory = category;
  }
  
  addNewProduct(): void{
    this.form.markAllAsTouched();
    if (this.selectedCategory === '' || !this.form.valid) {
      const alertMessage = {
        ...this.alertMessage,
        status: 'ERROR' as AlertMessageStatus,
        message: 'Please fill properly in mandatory fields!'
      };
      this.showAlertMessage(alertMessage)
      return;
    }
    const newProduct: Product = {
      id: null,
      name: this.name.value,
      category: this.selectedCategory,
      price: this.price.value,
      description: this.description.value
    };
    
    this.marketStoreService.select.newProductSaveStatus().pipe(take(2), takeUntil(this.destroyed$)).subscribe((saveStatus) => {
      if (saveStatus === 'FAILURE') {
        const alertMessage = {
          ...this.alertMessage,
          status: 'ERROR' as AlertMessageStatus,
          message: 'An error occured while saving the product!'
        };
        this.showAlertMessage(alertMessage)
        this.marketStoreService.dispatch.clearNewProductSaveStatus();
      }
      if (saveStatus === 'SUCCESS') {
        this.form.reset();
        this.selectedCategory = '';
        const alertMessage = {
          ...this.alertMessage,
          status: 'SUCCESS' as AlertMessageStatus,
          message: 'Product was successfully saved!'
        };
        this.showAlertMessage(alertMessage)
        this.marketStoreService.dispatch.clearNewProductSaveStatus();
      }
    });
    this.marketStoreService.dispatch.addNewProduct(newProduct);
  }

  showAlertMessage(alertMessage: AlertMessage) {
    this.alertMessage = alertMessage;
    setTimeout(() => {
      this.alertMessage = {
        ...this.alertMessage,
        status: undefined,
        message: undefined
      };
    }, 3000);
  }
}