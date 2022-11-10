import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) { }

  /**
   * It returns an observable of an array of products
   * @returns An observable
   */
  getAllProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  /**
   * This function takes in an id as a parameter and returns a product from the database
   * @param {string} id - The id of the product you want to get.
   * @returns The product with the id that was passed in.
   */
  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * It takes a CreateProductDTO object as an argument, and returns an Observable of type Product
   * @param {CreateProductDTO} dto - CreateProductDTO
   * @returns The created product
   */
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }
}
