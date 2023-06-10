import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Purchase} from '../models/purchase.model';
import {Destroyable} from '../utils/destroyable';
import {PurchaseFilterParams} from '../models/purchase-filter-params.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends Destroyable {

  private readonly purchaseURL = '/api/purchases';

  constructor(private http: HttpClient) {
    super();
  }
  
  submitPurchase(purchase: Purchase) {
    const url = this.purchaseURL;
    return this.http.post<void | HttpErrorResponse>(url, purchase);
  }

  getAllPurchases() {
    const url = this.purchaseURL;
    return this.http.get<Purchase[]>(url);
  }

  searchPurchases(filterParams: PurchaseFilterParams) {
    const url = this.purchaseURL;
    return this.http.post<Purchase[]>(url + '/search', filterParams);
  }
}