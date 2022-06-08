import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  /* Creating an empty array of type Product. */
  private myShoppingCart: Product[] = [];

  constructor() { }

  /**
   * The addProduct function takes a Product object as an argument and adds it to the myShoppingCart
   * array
   * @param {Product} product - Product - this is the product that we are adding to the shopping cart.
   */
  addProduct(product: Product) {
    this.myShoppingCart.push(product);
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
