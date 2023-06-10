import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {switchMap, map, catchError, tap} from 'rxjs/operators';
import {ProductService} from '../service/product.service';
import {PurchaseService} from '../service/purchase.service';
import {clearCart, filterProducts, loadProducts, loadProductsFailure, loadProductsSuccess, loadPurchases, loadPurchasesFailure, loadPurchasesSuccess, searchPurchases, submitPurchase, submitPurchaseFailure, submitPurchaseSuccess} from './market.actions';

@Injectable()
export class MarketEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private purchaseService: PurchaseService
  ) { }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        return this.productService.getAllProducts()
          .pipe(
            map((products) => loadProductsSuccess({products})),
            catchError((error: HttpErrorResponse) => of(loadProductsFailure({error})))
          );

        // map(() =>{
        //   const products = this.getAllProducts();
        //   return loadProductsSuccess({products});

      })
    )
  );

  filterProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterProducts),
      switchMap((action) => {
        return this.productService.filterProducts(action.filter)
          .pipe(
            map((products) => loadProductsSuccess({products})),
            catchError((error: HttpErrorResponse) => of(loadProductsFailure({error})))
          );
      }))
  );

  loadProductsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsSuccess),
      tap(() => {
        console.log('loadProductsSuccess');
      })
    ),
    {dispatch: false}
  );

  loadPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPurchases),
      switchMap(() => {
        return this.purchaseService.getAllPurchases()
          .pipe(
            map((purchases) => loadPurchasesSuccess({purchases})),
            catchError((error: HttpErrorResponse) => of(loadPurchasesFailure({error})))
          );
      })
    )
  );

  searchPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchPurchases),
      switchMap((action) => {
        return this.purchaseService.searchPurchases(action.filterParams)
          .pipe(
            map((purchases) => loadPurchasesSuccess({purchases})),
            catchError((error: HttpErrorResponse) => of(loadPurchasesFailure({error})))
          );
      })
    )
  );


  submitPurchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitPurchase),
      switchMap((action) => {
        return this.purchaseService.submitPurchase(action.purchase)
          .pipe(
            catchError((error: HttpErrorResponse) => of(submitPurchaseFailure({error})))
          );
      }),
      map(() => submitPurchaseSuccess())
    )
  );

  submitPurchaseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitPurchaseSuccess),
      map(() => {
        return clearCart()
      })
    )
  );

  private getAllProducts() {
    const p1 = {
      id: 1,
      name: 'Apple',
      category: 'FRUITS',
      price: 2.4,
      description: 'Natural apple'
    };

    const p2 = {
      id: 2,
      name: 'Orange',
      category: 'FRUITS',
      price: 3.5,
      description: 'Natural Orange'
    };

    const p3 = {
      id: 3,
      name: 'Lollipop',
      category: 'SWEETS',
      price: 0.7,
      description: 'Colorful'
    };
    const products = [p1, p2, p3];
    return products;
  }
}