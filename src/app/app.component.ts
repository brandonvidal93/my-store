import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  imgLoaded = '';
  showImg = true;

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
      price: 100,
      imageUrl: 'https://pineapplestores.com/wp-content/uploads/2020/07/01_CM0017_BAS_WORDPRESS.jpg',
    },
    {
      id: '3',
      name: 'Básica Negra',
      price: 100,
      imageUrl: 'https://pineapplestores.com/wp-content/uploads/2020/07/01_CM0001_UNI_WORDPRESS.jpg',
    }
  ];

  /**
   * The function takes a string as an argument and sets the imgLoaded property to the value of the
   * string
   * @param {string} img - string - The image that was loaded.
   */
  onImgLoaded(img: string) {
    this.imgLoaded = img;
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
