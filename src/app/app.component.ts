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

  /**
   * The function takes a string as an argument and sets the imgLoaded property to the value of the
   * string
   * @param {string} img - string - The image that was loaded.
   */
  // onImgLoaded(img: string) {
  //   this.imgLoaded = img;
  // }

  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }
}
