import {createReducer, on} from '@ngrx/store';
import {CartProduct} from '../models/cart-product.model';
import {ProcessingStatus} from '../models/processing-status.type';
import {Product} from '../models/product.model';
import {addNewProductFailure, addNewProductSuccess, addProductToCart, clearCart, clearNewProductSaveStatus, loadProductsFailure, loadProductsSuccess, loadPurchasesFailure, loadPurchasesSuccess, removeProductFromCart} from './market.actions';
import {Purchase} from '../models/purchase.model';

// Market state
export interface MarketState {
  products: Product[];
  productsMaxPrice: number;
  loadStatus: ProcessingStatus;
}

export const initialMarketState: MarketState = {
  products: [],
  productsMaxPrice: 0,
  loadStatus: undefined
};

// New product state
export interface NewProductState {
  saveStatus: ProcessingStatus;
}

export const initialNewProductState: NewProductState = {
  saveStatus: undefined
};

// Purchases state
export interface PurchaseHistoryState {
  purchases: Purchase[];
}

export const initialPurchaseHistoryState: PurchaseHistoryState = {
  purchases: []
};

// Cart state
export interface CartState {
  cartProducts: CartProduct[];
}

export const initialCartState: CartState = {
  cartProducts: []
};

// App state
export interface AppState {
  marketState: MarketState;
  newProductState: NewProductState;
  purchaseHistoryState: PurchaseHistoryState;
  cartState: CartState;
}

export const initialState: AppState = {
  marketState: initialMarketState,
  newProductState: initialNewProductState,
  purchaseHistoryState: initialPurchaseHistoryState,
  cartState: initialCartState
};

export const MarketFeature = 'minimarket';

function calculateProductsMaxPrice(products: Product[]) {
  const maxPriceProduct = products.reduce((prev, current) => ((prev.price > current.price) ? prev : current), {} as Product)
  return maxPriceProduct ? Math.ceil(maxPriceProduct.price) : 0;
}

function mergeProductsInCart(cartProducts: CartProduct[], productToAdd: CartProduct): CartProduct[] {
  let clonedCartProducts = [...cartProducts];
  const productToAddIdx = clonedCartProducts.findIndex(p => p.id === productToAdd.id);
  if (productToAddIdx > -1) {
    clonedCartProducts[productToAddIdx] = {
      ...clonedCartProducts[productToAddIdx],
      quantity: clonedCartProducts[productToAddIdx].quantity + 1
    };
    return clonedCartProducts;
  }
  clonedCartProducts.push(productToAdd);
  return clonedCartProducts;
}

export const reducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => ({
    ...state,
    marketState: {
      ...state.marketState,
      products: action.products,
      productsMaxPrice: calculateProductsMaxPrice(action.products),
      loadStatus: 'SUCCESS'
    }
  })),
  on(loadProductsFailure, (state) => ({
    ...state,
    marketState: {
      ...state.marketState,
      products: [],
      productsMaxPrice: 0,
      loadStatus: 'FAILURE'
    }
  })),
  on(loadPurchasesSuccess, (state, action) => ({
    ...state,
    purchaseHistoryState: {
      ...state.purchaseHistoryState,
      purchases: action.purchases
    }
  })),
  on(loadPurchasesFailure, (state) => ({
    ...state,
    purchaseHistoryState: {
      ...state.purchaseHistoryState,
      purchases: []
    }
  })),
  on(addProductToCart, (state, action) => ({
    ...state,
    cartState: {
      ...state.cartState,
      cartProducts: mergeProductsInCart(state.cartState.cartProducts, action.product)
    }
  })),
  on(removeProductFromCart, (state, action) => ({
    ...state,
    cartState: {
      ...state.cartState,
      cartProducts: state.cartState.cartProducts.filter(p => p.id !== action.productId)
    }
  })),
  on(clearCart, (state) => ({
    ...state,
    cartState: initialCartState
  })),
  on(addNewProductSuccess, (state) => ({
    ...state,
    newProductState: {
      ...state.newProductState,
      saveStatus: 'SUCCESS'
    }
  })),
  on(addNewProductFailure, (state) => ({
    ...state,
    newProductState: {
      ...state.newProductState,
      saveStatus: 'FAILURE'
    }
  })),
  on(clearNewProductSaveStatus, (state) => ({
    ...state,
    newProductState: {
      ...state.newProductState,
      saveStatus: undefined
    }
  }))

);