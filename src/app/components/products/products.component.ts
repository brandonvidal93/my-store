import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
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
  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    /* Subscribing to the observable returned by the getAllProducts() method. */
    this.productsService.getAllProducts().subscribe(
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

  onShowDetail(id: string) {
    this.productsService.getProduct(id).subscribe(data => {
      this.productChosen = data;
      this.toggleProductDetail();
    });
  }
}
