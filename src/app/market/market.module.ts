import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CartComponent} from './components/cart/cart.component';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {AppRequiredMarkerComponent} from './components/required-marker.component';
import {MarketEffects} from './state/market.effects';
import {MarketFeature, reducer} from './state/market.reducer';
import {PurchaseHistoryComponent} from './components/purchase-history/purchase-history.component';
import {NewProductComponent} from './components/new-product/new-product.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    CartComponent,
    PurchaseHistoryComponent,
    NewProductComponent,
    AppRequiredMarkerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forFeature(MarketFeature, reducer),
    EffectsModule.forFeature([MarketEffects])
  ],
  providers: [],
  exports: [
    ProductsListComponent,
    PurchaseHistoryComponent,
    NewProductComponent,
    CartComponent
  ]
})
export class MarketModule { }