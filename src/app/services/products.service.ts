import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

import { checkTime } from '../interceptors/time.interceptor'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl = `${environment.API_URL}/api/products`; // Este se relaciona con el proxy para que funcione en desarrollo
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(private http: HttpClient) { }

  /**
   * It returns an observable of an array of products
   * @returns An observable
   */
  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();

    if(limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this.apiUrl}`, { params, context: checkTime() })
    .pipe(
      retry(1),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  /**
   * This function takes in an id as a parameter and returns a product from the database
   * @param {string} id - The id of the product you want to get.
   * @returns The product with the id that was passed in.
   */
  get(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.InternalServerError) {
          return throwError('Something went wrong');
        }
        if(error.status === HttpStatusCode.NotFound) {
          return throwError('Product not found');
        }
        if(error.status === HttpStatusCode.Unauthorized) {
          return throwError('Unauthorized');
        }
        return throwError(error);
      })
    );
  }

  /**
   * The function `getByPage` retrieves a list of products from an API based on the specified page and
   * limit.
   * @param {number} page - The page parameter is used to specify the page number of the data you want
   * to retrieve. It is typically used in pagination to navigate through different pages of data.
   * @param {number} limit - The `limit` parameter specifies the maximum number of items to be returned
   * per page.
   * @returns an HTTP GET request to the specified API URL with the provided page and limit parameters.
   * The response is expected to be an array of Product objects.
   */
  getByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
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
