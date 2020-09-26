import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';

import { MeasureSoilItems } from '../models/MeasureSoil';

@Component({
  selector: 'app-measure-soil',
  templateUrl: './measure-soil.component.html',
  styleUrls: ['./measure-soil.component.scss'],
})
export class MeasureSoilComponent implements OnInit {
  constructor(private router: Router) {}

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: {
      el: '.swiper-paginatio    n',
      clickable: false,
      hideOnClick: false,
    },
    longSwipesRatio: 0.1,
    longSwipesMs: 100,
    threshold: 5,
  };

  public index = 0;
  public disabled = false;
  public dataSource = MeasureSoilItems;

  ngOnInit(): void {}

  public onGetStarted() {
    if (this.index < this.dataSource.length) {
      this.index++;
    } else {
      this.router.navigateByUrl('my-crops');
    }
  }

  public onIndexChange(index: number): void {}

  public onSwiperEvent(event: string): void {}

  public volumeClicked() {
    console.log('volume clicked');
  }
}
