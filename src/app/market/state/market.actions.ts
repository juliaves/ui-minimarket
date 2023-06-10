import {HttpErrorResponse} from '@angular/common/http';
import {createAction, props} from '@ngrx/store';
import {CartProduct} from '../models/cart-product.model';
import {ProductFilter} from '../models/product-filter.model';
import {Product} from '../models/product.model';
import {Purchase} from '../models/purchase.model';
import {PurchaseFilterParams} from '../models/purchase-filter-params.model';

export const loadProducts = createAction(
  '[MARKET] LOAD_PRODUCTS'
);

export const filterProducts = createAction(
  '[MARKET] FILTER_PRODUCTS',
  props<{filter: ProductFilter}>()
);

export const loadProductsSuccess = createAction(
  '[MARKET] LOAD_PRODUCTS_SUCCESS',
  props<{products: Product[]}>()
);

export const loadProductsFailure = createAction(
  '[MARKET] LOAD_PRODUCTS_FAILURE',
  props<{error: HttpErrorResponse}>()
);

export const addProductToCart = createAction(
  '[MARKET] ADD_PRODUCT_TO_CART',
  props<{product: CartProduct}>()
);

export const removeProductFromCart = createAction(
  '[MARKET] REMOVE_PRODUCT_TO_CART',
  props<{productId: number}>()
);

export const submitPurchase = createAction(
  '[MARKET] SUBMIT_PURCHASE',
  props<{purchase: Purchase}>()
);

export const submitPurchaseSuccess = createAction(
  '[MARKET] SUBMIT_PURCHASE_SUCCESS'
);

export const submitPurchaseFailure = createAction(
  '[MARKET] SUBMIT_PURCHASE_FAILURE',
  props<{error: HttpErrorResponse}>()
);

export const clearCart = createAction(
  '[MARKET] CLEAR_CART'
);

export const loadPurchases = createAction(
  '[MARKET] LOAD_PURCHASES'
);

export const loadPurchasesSuccess = createAction(
  '[MARKET] LOAD_PURCHASES_SUCCESS',
  props<{purchases: Purchase[]}>()
);

export const loadPurchasesFailure = createAction(
  '[MARKET] LOAD_PURCHASES_FAILURE',
  props<{error: HttpErrorResponse}>()
);

export const searchPurchases = createAction(
  '[MARKET] SEARCH_PURCHASES',
  props<{filterParams: PurchaseFilterParams}>()
);