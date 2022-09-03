import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  /* A setter that is called when the input changes. */
  img: string = '';
  @Input('img') set changeImage(newimg: string) {
    this.img = newimg;
  }
  
  /* Creating a new event emitter that will emit a boolean value. */
  @Output() imgLoadedEvent = new EventEmitter<string>();
  
  imageDefault = './assets/images/default.png';

  constructor() { }

  /**
   * If the image fails to load, replace it with the default image
   */
  imgError() {
    this.img = this.imageDefault;
  }

  /**
   * The imgLoaded function emits an event to the parent component, which is the home component
   */
  imgLoaded() {
    this.imgLoadedEvent.emit(this.img);
  }

}
