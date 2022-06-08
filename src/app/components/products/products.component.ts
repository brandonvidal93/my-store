import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  /* Creating an empty array of type Product. */
  myShoppingCart: Product[] = [];
  total: number = 0;

  /* Creating an array of objects of type Product. */
  products: Product[] = [
    {
      id: '1',
      name: 'Básica Blanca',
      price: 100,
      imageUrl: 'https://pineapplestores.com/wp-content/uploads/2020/07/01_CM0011_UNI_WORDPRESS-626x791.jpg',
    },
    {
      id: '2',
      name: 'Básica Roja',
      price: 120,
      imageUrl: 'https://pineapplestores.com/wp-content/uploads/2020/07/01_CM0017_BAS_WORDPRESS.jpg',
    },
    {
      id: '3',
      name: 'Básica Negra',
      price: 150,
      imageUrl: 'https://pineapplestores.com/wp-content/uploads/2020/07/01_CM0001_UNI_WORDPRESS.jpg',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * When the user clicks the Add to Cart button, add the product to the shopping cart.
   * @param {Product} product - Product
   */
  onAddToShoppingCart(product: Product) {
    this.myShoppingCart.push(product);
    this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
