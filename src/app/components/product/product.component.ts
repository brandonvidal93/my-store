import { Component, Input, OnInit } from '@angular/core';

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
    name: '',
    imageUrl: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
