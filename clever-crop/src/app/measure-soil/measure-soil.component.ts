import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { SwiperOptions } from 'swiper';
import { MeasureSoilItems } from '../models/MeasureSoil';
import {ConnectingDialogComponent} from './connecting-dialog/connecting-dialog.component';

@Component({
  selector: 'app-measure-soil',
  templateUrl: './measure-soil.component.html',
  styleUrls: ['./measure-soil.component.scss'],
})
export class MeasureSoilComponent implements OnInit {
  constructor(private router: Router, private location: Location, private dialog: MatDialog) { }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: {
      el: '.swiper-pagination',
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

  ngOnInit(): void { }

  public onSensorConnect(){
    this.dialog.open(ConnectingDialogComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {timeout: 3000}
    });
  }

  public onNextClicked() {
    if (this.index < this.dataSource.length - 1) {
      this.index++;
    } else {
      this.router.navigateByUrl('/my-crops');
    }
  }

  public onPrevClicked() {
    if (this.index > 0) {
      this.index--;
    }
  }

  public onIndexChange(index: number): void { }

  public onSwiperEvent(event: string): void { }

  public volumeClicked() {
    console.log('volume clicked');
  }

  public backClicked() {
    this.location.back();
  }
}
