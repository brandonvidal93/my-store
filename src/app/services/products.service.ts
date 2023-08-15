import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

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
  getAll() {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  /**
   * This function takes in an id as a parameter and returns a product from the database
   * @param {string} id - The id of the product you want to get.
   * @returns The product with the id that was passed in.
   */
  get(id: string) {
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

  /**
   * The function updates a product with the given ID using the provided data.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * product that needs to be updated. It is used to specify which product should be updated in the
   * database.
   * @param {UpdateProductDTO} dto - The `dto` parameter is an object of type `UpdateProductDTO` which
   * contains the updated information for the product.
   * @returns an HTTP PUT request to update a product with the specified ID using the provided data
   * transfer object (DTO). The response from the server will be of type `Product`.
   */
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  /**
   * The delete function sends a DELETE request to the specified API endpoint with the given ID.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * product that needs to be deleted.
   * @returns The `delete` method is returning an `Observable` of type `Product`.
   */
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
