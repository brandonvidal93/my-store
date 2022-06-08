import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  /* Creating an empty array of type Product. */
  private myShoppingCart: Product[] = [];

  /* This is a BehaviorSubject. It is a special type of Subject that keeps hold of the current value
  and emits it to any new subscribers as soon as they subscribe. */
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor() { }

  /**
   * We're pushing the product into the myShoppingCart array and then we're using the next() method to
   * update the myCart subject with the new value of the myShoppingCart array
   * @param {Product} product - Product - this is the product that we are adding to the shopping cart.
   */
  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  /**
   * We're using the reduce() method to sum up the prices of all the items in the shopping cart
   * @returns The total price of all items in the shopping cart.
   */
  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * This function returns the value of the myShoppingCart property.
   * @returns The myShoppingCart property is being returned.
   */
  getShoppingCart() {
    return this.myShoppingCart;
  }
}
