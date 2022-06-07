import { Component, EventEmitter, Input, OnInit, Output, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges {

  /* A setter that is called when the input changes. */
  img: string = '';
  @Input('img') set changeImage(newimg: string) {
    this.img = newimg;
    console.log('ImgComponent changeImage', 'newimg =>', newimg);
  }
  
  /* Creating a new event emitter that will emit a boolean value. */
  @Output() imgLoadedEvent = new EventEmitter<string>();
  
  imageDefault = './assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // Antes del renderizado
    // No correr cosas asíncronas, fetch, suscripción a eventos, etc.
    // Solo se corre una vez
    console.log('ImgComponent constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before render
    // Cambios de los @inputs las veces que se actualicen
    console.log('ImgComponent ngOnChanges', 'imgValue =>', this.img);
    console.log('ImgComponent ngOnChanges', 'changes =>', changes);
  }

  ngOnInit(): void {
    // before render
    // Se pueden correr cosas asíncronas, fetch, promesas, etc.
    // Se corre una vez
    // console.log('ImgComponent ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter++;
    //   console.log('Run Counter');
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // after render
    // Handler children components
    console.log('ImgComponent ngAfterViewInit');
  }

  /* A lifecycle hook that is called when the component is destroyed. */
  ngOnDestroy(): void {
    // delete
    // console.log('ImgComponent ngOnDestroy');
    // window.clearInterval(this.counterFn);
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
