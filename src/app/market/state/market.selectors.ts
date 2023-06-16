import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MarketFeature, AppState} from './market.reducer';

const selectState = createFeatureSelector<AppState>(MarketFeature);

// Market selects
const selectMarketState = createSelector(
  selectState,
  state => state.marketState
);

export const selectProducts = createSelector(
  selectMarketState,
  state => state.products
);

// New product selects

const selectNewProductState = createSelector(
  selectState,
  state => state.newProductState
);


export const selectNewProductSaveStatus = createSelector(
  selectNewProductState,
  state => state.saveStatus
);

// Purchase history selects

const selectPurchaseHistoryState = createSelector(
  selectState,
  state => state.purchaseHistoryState
);


export const selectPurchases = createSelector(
  selectPurchaseHistoryState,
  state => state.purchases
);

// Cart selects

const selectCartState = createSelector(
  selectState,
  state => state.cartState
);


export const selectCartProducts = createSelector(
  selectCartState,
  state => state.cartProducts
);