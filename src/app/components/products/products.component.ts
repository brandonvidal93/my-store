import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
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
  products: Product[] = [];
  showProductDetail = false;
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

  /* Injecting the StoreService and ProductsService into the component. */
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    /* Subscribing to the observable returned by the getAllProducts() method. */
    this.productsService.getAllProducts()
    .subscribe(
      data => {
        this.products = data;
      }
    );
  }

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
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.toggleProductDetail();
    });
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

}
