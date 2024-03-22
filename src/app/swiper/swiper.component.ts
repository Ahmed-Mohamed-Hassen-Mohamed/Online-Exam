import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class swiperComponent implements OnInit {
  @Input() groups: any[] = [];
  slidesPerView = 3;
  spaceBetween = 20;
  ngOnInit(): void {}
}
