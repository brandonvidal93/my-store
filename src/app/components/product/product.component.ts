import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

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

  
  /* The `@Output() addedProduct = new EventEmitter<Product>();` line is creating a new event emitter
  called `addedProduct` that will emit a `Product` object. This event emitter can be used to
  communicate from the child component (ProductComponent) to its parent component. When an event is
  emitted using `addedProduct.emit(value)`, the parent component can listen to this event and
  perform any necessary actions based on the emitted value. In this case, the `addedProduct` event
  is emitted when the "Add to Cart" button is clicked, and the `Product` object is passed as the
  emitted value. */
  @Output() addedProduct = new EventEmitter<Product>();

  /* The `@Output() showProduct = new EventEmitter<string>();` line is creating a new event emitter
  called `showProduct` that will emit a string value. This event emitter can be used to communicate
  from the child component (ProductComponent) to its parent component. When an event is emitted
  using `showProduct.emit(value)`, the parent component can listen to this event and perform any
  necessary actions based on the emitted value. */
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }

  /**
   * When the add to cart button is clicked, emit the product object to the parent component
   */
  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}
