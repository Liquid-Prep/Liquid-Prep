import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { USB } from 'webusb';
import {SoilMoistureService} from '../../service/SoilMoistureService';
import {SoilMoisture} from '../../models/SoilMoisture';

@Component({
  selector: 'app-measure-soil',
  templateUrl: './measure-soil.component.html',
  styleUrls: ['./measure-soil.component.scss'],
})
export class MeasureSoilComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private location: Location, private soilService: SoilMoistureService) { }

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
  public countdownSecond = 5;
  public measureView: 'before-measuring' | 'measuring' | 'after-measuring' = 'before-measuring';
  private interval;
  public soilData: SoilMoisture;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
  }

  public onSensorConnect(){
    // const dialogRef = this.dialog.open(ConnectingDialogComponent, {
    //   panelClass: 'myapp-no-padding-dialog',
    //   data: {}
    // });
    // console.log(window.navigator.usb.getDevices());
    window.navigator.usb.requestDevice({filters: []})
      .then(usbDevice => {
        // dialogRef.close();
        this.setMeasureView('measuring');
        this.readingCountdown(5);
      })
      .catch(e => {
        console.log(e);
        // dialogRef.close();
      });
  }

  public onIndexChange(index: number): void { }

  public onSwiperEvent(event: string): void { }

  public volumeClicked() {
  }

  public backClicked() {
    this.clearCountdown();
    if (this.measureView === 'before-measuring') {
      this.location.back();
    } else {
      this.measureView = 'before-measuring';
    }
  }

  public readingCountdown(seconds){
    this.countdownSecond = seconds;
    this.interval = setInterval(() => {
      if (this.countdownSecond <= 0){
        this.setMeasureView('after-measuring');
        clearInterval(this.interval);
        this.soilData = this.soilService.getSoilMoistureReading();
      }
      this.countdownSecond--;
    }, 1000);
  }

  private clearCountdown(){
    clearInterval(this.interval);
  }

  public setMeasureView(status: 'before-measuring' | 'measuring' | 'after-measuring'){
    this.measureView = status;
  }

  onGetAdvise() {
    this.router.navigate(['advice']).then(r => {});
  }
}
