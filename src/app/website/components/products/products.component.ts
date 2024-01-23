import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';

import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Input() 
  set productId(id: string | null) {
    if(id) {
      this.onShowDetail(id);
    }
  }
  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();
  showProductDetail = false;
  isProductChosen = false;
  productChosen: Product = {
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
  /* limit = 10;
  offset = 0; */
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  messageResponse = '';
  
  imgAddProduct = './assets/images/add.png';
  imgClose = './assets/images/close.png';

  /* Injecting the StoreService and ProductsService into the component. */
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {}

  /**
   * When the user clicks the Add to Cart button, add the product to the shopping cart.
   * @param {Product} product - Product
   */
  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  /**
   * If the showProductDetail property is true, then set it to false. If the showProductDetail property is false,
   * then set it to true
   */
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  /**
   * The function "onShowDetail" retrieves a product with a given ID from a service and assigns it to
   * the "productChosen" variable, then toggles the product detail view.
   * @param {string} id - The id parameter is a string that represents the unique identifier of a
   * product.
   */
  onShowDetail(id: string) {
    this.statusDetail = 'loading';

    if(!this.showProductDetail) {
      this.showProductDetail = true;
    }
    
    this.productsService.get(id)
    .subscribe(data => {
      this.isProductChosen = true;
      this.productChosen = data;
      this.statusDetail = 'success';
    }, response => {
      this.isProductChosen = false;
      this.messageResponse = response;
      this.statusDetail = 'error';
    });
  }

  readAndUpdateU(id: string) {
    this.productsService.get(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'Cambio de título'})),
    )
    .subscribe(data => {
      console.log(data);
    });
    
    zip(
      this.productsService.get(id),
      this.productsService.update(id, {title: 'Cambio de título'})
    )
    .subscribe(response =>{
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    /* Creating a new product. from model CreateProductDTO */
    const product: CreateProductDTO =  {
      title: 'New Product',
      price: 100,
      description: 'This is a new product',
      images: ['https://placeimg.com/640/480/any'],
      categoryId: 1,
    }

    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  /**
   * The `updateProduct()` function updates a product's title and price using the `productsService` and
   * updates the local `products` array and `productChosen` variable with the updated data.
   */
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'New Title Product',
      price: 250,
    };

    const id = this.productChosen.id;

    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  /**
   * The `deleteProduct()` function deletes a product from the list of products and updates the view.
   */
  deleteProduct() {
    const id = this.productChosen.id;

    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    });
  }

  /**
   * The `loadMore()` function retrieves additional products from the server and appends them to the
   * existing list of products.
   */
  loadMore() {
    this.onLoadMore.emit();
  }
}
