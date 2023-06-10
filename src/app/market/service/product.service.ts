import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProductFilter} from '../models/product-filter.model';
import {Product} from '../models/product.model';
import {Destroyable} from '../utils/destroyable';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends Destroyable {

  private readonly marketURL = '/api/products';

  constructor(private http: HttpClient) { super(); }

  getAllProducts() {
    const url = this.marketURL;
    return this.http.get<Product[]>(url);
  }

  filterProducts(filter: ProductFilter) {
    const url = this.marketURL;
    return this.http.get<Product[]>(url + '/find', {
      params: {
        category: filter.category, 
        maxPrice: filter.maxPrice.toString()}
    });
  }
  


}


