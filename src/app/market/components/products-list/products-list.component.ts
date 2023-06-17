import {AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MarketStoreService} from '../../service/market-store.service';
import {Destroyable} from '../../utils/destroyable';
import {takeUntil} from 'rxjs/operators';
import {Product} from '../../models/product.model';
import {Observable} from 'rxjs';
import {ProductFilter} from '../../models/product-filter.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent extends Destroyable implements OnInit, AfterContentChecked {
  @Output() onCartProductAdded = new EventEmitter<number>();
  
  readonly chooseOption = '-Choose-';
  readonly maxPrice = 100;
  products$: Observable<Product[]>;
  categories: string[];
  filter: ProductFilter = {
    category: '',
    maxPrice: 0
  };

  constructor(
    private marketStoreService: MarketStoreService,
    private cdref: ChangeDetectorRef
  ) {
    super();
    this.marketStoreService.dispatch.loadProducts();
    this.categories = ['', 'FRUITS', 'VEGETABLES', 'DRINKS', 'SWEETS'];
    this.filter.category = '';
    this.filter.maxPrice = this.maxPrice;
  }

  ngOnInit(): void {
    this.products$ = this.marketStoreService.select.products().pipe(takeUntil(this.destroyed$));
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  getDescriptionBgColor(product: Product) {
    if (!product.description) {
      return '';
    }
    return 'bg-custom-green';
  }

  addProductToCart(product: Product) {
    const cartProduct = {
      ...product, 
      quantity: 1
    };

    this.onCartProductAdded.emit(1);
    
    this.marketStoreService.dispatch.addProductToCart(cartProduct);
  }

  // FILTER
  chooseCategory(category: string) {
    this.filter = {
      ...this.filter,
      category: category
    };
    this.marketStoreService.dispatch.filterProducts(this.filter);
  }

  choosePrice(maxPrice: string) {
    this.filter = {
      ...this.filter,
      maxPrice: parseInt(maxPrice)
    };
    this.marketStoreService.dispatch.filterProducts(this.filter);
  }

}