import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CartProduct} from '../models/cart-product.model';
import {ProductFilter} from '../models/product-filter.model';
import {Product} from '../models/product.model';
import {Purchase} from '../models/purchase.model';
import {addProductToCart, clearCart, filterProducts, loadProducts, loadPurchases, removeProductFromCart, searchPurchases, submitPurchase} from '../state/market.actions';
import {MarketState} from '../state/market.reducer';
import {selectCartProducts, selectProducts, selectPurchases} from '../state/market.selectors';
import {PurchaseFilterParams} from '../models/purchase-filter-params.model';

@Injectable({
  providedIn: 'root'
})
export class MarketStoreService{

  constructor(private store: Store<MarketState>) { }


  select = new (class {
    constructor(private store: Store<MarketState>) { }

    products(): Observable<Product[]> {
      return this.store.pipe(select(selectProducts));
    }

    cartProducts(): Observable<CartProduct[]> {
      return this.store.pipe(select(selectCartProducts));
    }

    purchases(): Observable<Purchase[]> {
      return this.store.pipe(select(selectPurchases));
    }
   
  })(this.store);

  dispatch = new (class {
    constructor(private store: Store<MarketState>) { }

    loadProducts(): void {
      this.store.dispatch(loadProducts());
    }

    filterProducts(filter: ProductFilter): void {
      this.store.dispatch(filterProducts({filter}));
    }

    addProductToCart(product: CartProduct): void {
      this.store.dispatch(addProductToCart({product}));
    }

    removeProductFromCart(productId: number): void {
      this.store.dispatch(removeProductFromCart({productId}));
    }

    submitPurchase(purchase: Purchase): void {
      this.store.dispatch(submitPurchase({purchase}));
    }

    loadPurchases(): void {
      this.store.dispatch(loadPurchases());
    }

    searchPurchases(filterParams: PurchaseFilterParams): void {
      this.store.dispatch(searchPurchases({filterParams}));
    }
    
  })(this.store);

}