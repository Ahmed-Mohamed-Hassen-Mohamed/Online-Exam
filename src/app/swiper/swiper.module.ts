import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { swiperComponent } from './swiper.component';
import { register } from 'swiper/element/bundle';
register();

@NgModule({
  declarations: [
    swiperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [
    swiperComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class swiperModule { }
