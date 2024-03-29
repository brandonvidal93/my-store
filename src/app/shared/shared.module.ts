import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from "./components/product/product.component";
import { ProductsComponent } from "./components/products/products.component";

import { HighlightDirective } from "./directives/highlight.directive";

import { ChangeVocalesPipe } from "./pipes/change-vocales.pipe";
import { ReversePipe } from "./pipes/reverse.pipe";
import { TimeAgoPipe } from "./pipes/time-ago.pipe";

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective,
    ChangeVocalesPipe,
    ReversePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    HighlightDirective,
    ChangeVocalesPipe,
    ReversePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
