import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SwiperOptions } from 'swiper';
import { MeasureSoilItems } from '../models/MeasureSoil';
import { ConnectingDialogComponent} from './connecting-dialog/connecting-dialog.component';
import { USB } from 'webusb';

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
    const dialogRef = this.dialog.open(ConnectingDialogComponent, {
      panelClass: 'myapp-no-padding-dialog',
      data: {}
    });
    console.log(window.navigator.usb.getDevices());
    window.navigator.usb.requestDevice({filters: []})
      .then(usbDevice => {
        console.log('Product name: ' + usbDevice.productName);
        console.log('Product vendorId: ' + usbDevice.vendorId.toString(16));
        console.log('Product productId: ' + usbDevice.productId);
        dialogRef.close();
      })
      .catch(e => {
        console.log(e);
        dialogRef.close();
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
