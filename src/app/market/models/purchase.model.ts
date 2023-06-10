import {CartProduct} from './cart-product.model';

export interface Purchase {
  firstName: string,
  lastName: string,
  email: string,
  cartProducts: CartProduct[],
  date: Date
}