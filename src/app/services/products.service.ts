import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  /**
   * It returns an observable of an array of products
   * @returns An observable
   */
  getAllProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
}
