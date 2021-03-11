import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import {SoilMoistureService} from '../../service/SoilMoistureService';
import {SoilMoisture} from '../../models/SoilMoisture';
import {LineBreakTransformer} from './LineBreakTransformer';

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

      this.connectSensor().then( sensorValue => {
        this.soilService.setSoilMoistureReading(sensorValue);
        this.setMeasureView('measuring');
        this.readingCountdown();
      });
      
      
  }

  public async connectSensor() {
    // Vendor code to filter only for Arduino or similar micro-controllers
    const filter = {
      usbVendorId: 0x2341 // Arduino UNO
    };

    try {
      const port = await (window.navigator as any).serial.requestPort({filters: [filter]});
      // Continue connecting to port 9600.
      await port.open({ baudRate: 9600 });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const inputStream = textDecoder.readable.pipeThrough(new TransformStream(new LineBreakTransformer()));
      const reader = inputStream.getReader();

      let sensorMoisturePercantage: number;

      // Listen to data coming from the serial device.
      while (true) {
        const { value, done } = await reader.read();
        
        if (done) {
          reader.releaseLock();
          break;
        }

        if (value !== "" || value !== 'NaN') {
          // The value length between 4 and 6 is quite precise
          if (value.length >= 4 && value.length <= 6){
            sensorMoisturePercantage = +value;
            if (sensorMoisturePercantage !== NaN) {
              reader.cancel();
              // When reader is cancelled an error will be thrown as designed which can be ignored
              await readableStreamClosed.catch(() => { /* Ignore the error*/  });
              await port.close();

              return sensorMoisturePercantage;
            } 
          }
        }
        
        // Capture sensor data only upto 3 digits
        /*if (value.length >= 3 && value.length <= 5){
          sensorValue = +((+value).toPrecision(3));
          // Sometimes the value will return only 2 digits due to unknown glitch with the length method of the value.
          // Therefore making sure the value is higher than 100.
          if (sensorValue > 100) {
            reader.cancel();
            // When reader is cancelled an error will be thrown as designed which can be ignored
            await readableStreamClosed.catch(() => { });
            await port.close();

            //return sensorValue;
          }
        }*/
      }
    } catch (e) {
      // Permission to access a device was denied implicitly or explicitly by the user.
      window.alert("Permission to access a device was denied implicitly or explicitly by the user.")
    }
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

  public readingCountdown(){
    //this.countdownSecond = seconds;
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
