import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from './market/components/cart/cart.component';
import {ProductsListComponent} from './market/components/products-list/products-list.component';
import {PurchaseHistoryComponent} from './market/components/purchase-history/purchase-history.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', component: ProductsListComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'cart', component: CartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
