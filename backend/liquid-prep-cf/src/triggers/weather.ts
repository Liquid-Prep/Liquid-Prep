import { Observable, forkJoin } from 'rxjs';
import { util } from '@common/utility';
import { WeatherInfo } from 'src/services/responses/weatherInfoResponse';

export class Weather {
  private FiveDaysURL = 'https://api.weather.com/v3/wx/forecast/daily/5day?format=json';
  private api: string;

  constructor(
    private weatherApiKey: string,
    private geoCode: string,
    private language: string,
    private units: string
  ) {
    console.log("weather fetch info kicked off......");
    console.log("weatherApiKey: ",this.weatherApiKey);
    this.geoCode = this.geoCode ? this.geoCode : '33.84,-84.25';
    this.language = this.language ? this.language : 'en-US';
    this.units = this.units ? this.units : 'm';
  }  

  willItRainTomorrow() {
    let result;
    return Observable.create((observer) => {
      this.get5DaysForecast()
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

  get5DaysForecast() {
    console.log('getForecast() is executed..')
    this.api = `${this.FiveDaysURL}&apiKey=${this.weatherApiKey}&geocode=${this.geoCode}&language=${this.language}&units=${this.units}`;
    console.log("5 days weather API: ",this.api);
    let result;
    return Observable.create((observer) => {
      util.httpGet(this.api)
      .subscribe((data) => {
        result = data;
        console.log('weather API response: ',result)
      }, (err) => {
        console.log(err);
        observer.error(err)
      }, () => {
        observer.next(result);
        observer.complete();
      });  
    });
  }

}  
