import { Observable, forkJoin } from 'rxjs';
import { util } from '@common/utility';

export class Weather {
  private url = 'https://api.weather.com/v3/wx/forecast/daily/3day?format=json';
  private api: string;

  constructor(
    private weatherApiKey: string,
    private geoCode: string,
    private language: string,
    private units: string
  ) {
    this.geoCode = this.geoCode ? this.geoCode : '33.84,-84.25';
    this.language = this.language ? this.language : 'en-US';
    this.units = this.units ? this.units : 'e';
    this.api = `${this.url}&apiKey=${weatherApiKey}&geocode=${geoCode}&language=${language}&units=${units}`;
  }  

  willItRainTomorrow() {
    let result;
    return Observable.create((observer) => {
      this.getForecast()
      .subscribe((data) => {
        result = data.result;
        let precip = result['daypart'][0]['precipChance'];
        let rain = false;
        if(precip[2] >= 50 || precip[3] >= 50) {
          rain = true;
        }
        observer.next({rain: rain});
        observer.complete();
      }, (err) => {
        console.log(err);
        observer.error(err)
      });  
    });
  }

  getForecast() {
    let result;
    return Observable.create((observer) => {
      util.httpGet(this.api)
      .subscribe((data) => {
        result = data;
      }, (err) => {
        console.log(err);
        observer.error(err)
      }, () => {
        observer.next({result: result});
        observer.complete();
      });  
    });
  }

}  
