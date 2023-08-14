export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}

/* Creating a new interface that extends the Product interface, but omits the id and category
properties. 

Concept Data Transfer Object (DTO): https://en.wikipedia.org/wiki/Data_transfer_object
*/
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

/* The line `export interface UpdateProductDTO extends Partial<CreateProductDTO> {}` is creating a new
interface called `UpdateProductDTO` that extends the `Partial` utility type applied to the
`CreateProductDTO` interface. */
export interface UpdateProductDTO extends Partial<CreateProductDTO> {} 