import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import {SoilMoistureService} from '../../service/SoilMoistureService';
import {SoilMoisture} from '../../models/SoilMoisture';
import {LineBreakTransformer} from './LineBreakTransformer';
import { Buffer } from 'buffer';
//import { Buffer } from '@ty'

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
      

      //this.connectBluetooth();
      
  }

  public async connectBluetooth() {
    // Vendor code to filter only for Arduino or similar micro-controllers
    const filter = {
      usbVendorId: 0x2341,
      esp32: 0x1234,
      sample2: 0x12345678,
      device: 0x40080698, // Arduino UNO
      esp32test: 0x400806a8
    };
    /*const port = await (window.navigator as any).bluetooth.requestDevice({ filters: [{
      name: 'ESP32test'
    }] })
      .then(device => { console.log("device: ", device)})
      .catch(error => { console.error(error); });*/

      /*let serviceUuid = document.querySelector('#service').value;
      if (serviceUuid.startsWith('0x')) {
        serviceUuid = parseInt(serviceUuid);
      }

      let characteristicUuid = document.querySelector('#characteristic').value;
      if (characteristicUuid.startsWith('0x')) {
        characteristicUuid = parseInt(characteristicUuid);
      }*/

      await (window.navigator as any).bluetooth.requestDevice({
        filters: [{
          name: 'ESP32-LiquidPrep'
        }],
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'] // Required to access service later.
      })
      .then(device => { 
        console.log("device name: ", device.name);
        console.log("device: ", device);

        // Set up event listener for when device gets disconnected.
        device.addEventListener('gattserverdisconnected', onDisconnected);

        // Attempts to connect to remote GATT Server.
        return device.gatt.connect();
      })
      .then(server => {
        // Getting Battery Service…
        console.log("server: "+server)
        return server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
      })
      .then(service => {
        // Getting Battery Level Characteristic…
        console.log("service: "+service)
        return service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
        //return service.getCharacteristics();
      })
      .then(characteristic => {
        // Reading Battery Level…
        //console.log("characteristic declaration: "+characteristic.readDeclarartion())
        console.log("characteristic : "+characteristic)
        console.log('> Characteristic UUID:  ' + characteristic.uuid);
        console.log('> Broadcast:            ' + characteristic.properties.broadcast);
        console.log('> Read:                 ' + characteristic.properties.read);
        console.log('> Write w/o response:   ' +
          characteristic.properties.writeWithoutResponse);
          console.log('> Write:                ' + characteristic.properties.write);
          console.log('> Notify:               ' + characteristic.properties.notify);
          console.log('> Indicate:             ' + characteristic.properties.indicate);
          console.log('> Signed Write:         ' +
          characteristic.properties.authenticatedSignedWrites);
          console.log('> Queued Write:         ' + characteristic.properties.reliableWrite);
          console.log('> Writable Auxiliaries: ' +
          characteristic.properties.writableAuxiliaries);
        /*console.log("characteristic uuid : "+characteristic.map(c => c.uuid).join('\n' + ' '.repeat(19)))
        console.log("characteristic value: "+characteristic.map(c => c.value).join('\n' + ' '.repeat(19)))*/
        //console.log("characteristic value: "+characteristic.readValue())
        characteristic.readValue().then(value => {
          console.log('character value: '+value)
          //console.log('character unit 8 value: '+value.getUint64())
          const decoder = new TextDecoder('utf-8');
          console.log(`User Description: ${decoder.decode(value)}`);
        })
        
        //return characteristic.readValue();
      })
      /*.then(value => {
        console.log("Battery percentage is "+value.getUint8(0));
        console.log(`Battery percentage is ${value.getUint8(0)}`);
      })*/
      .catch(error => { console.error(error); });

      function onDisconnected(event) {
        const device = event.target;
        console.log(`Device ${device.name} is disconnected.`);
      }

      /*await (window.navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // Required to access service later.
      })
      .then(device => { console.log("device: ", device) })
      .catch(error => { console.error(error); });*/

      /*await (window.navigator as any).bluetooth.requestDevice({
        filters: [{
          services: [0x400, 0x1234, 0x12345678, '4fafc201-1fb5-459e-8fcc-c5c9c331914b']
        }]
      })
      .then(device => { console.log("device: ", device) })
      .catch(error => { console.error(error); });*/

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
