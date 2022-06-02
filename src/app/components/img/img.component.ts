import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  /* A property that is being passed in from the parent component. */
  @Input() img: string = '';
  
  /* Creating a new event emitter that will emit a boolean value. */
  @Output() imgLoadedEvent = new EventEmitter<string>();
  imageDefault = './assets/images/default.png';

  constructor() { }

  ngOnInit(): void {
  }

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
