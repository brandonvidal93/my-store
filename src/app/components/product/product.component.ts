import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  /* Setting the default value of the product property to an empty object. */
  @Input() product: Product = {
    id: '',
    price: 0,
    title: '',
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };

  /* Creating a new event emitter that will emit a product. */
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * When the add to cart button is clicked, emit the product object to the parent component
   */
  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

}
