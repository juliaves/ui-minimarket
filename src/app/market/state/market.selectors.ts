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