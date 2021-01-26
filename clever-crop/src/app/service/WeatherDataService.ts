import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { WeatherResponse } from '../models/api/WeatherResponse';
import { WeatherInfo, Today } from '../models/Today';
import { DataService } from './DataService';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {

    public today = new Today();

    constructor(private dataService: DataService) {}

    public getTodayWeather(): Observable<Today>  {
      return new Observable((observer: Observer<Today>) => {
        if (this.today.dayOfWeek) {
          observer.next(this.today);
          observer.complete();
        } else {
          this.dataService.getWeatherInfo().subscribe((weatherInfo: WeatherResponse) => {
            console.log('weather data: ', weatherInfo);
            this.today = this.createTodayWeather(weatherInfo);
            //console.log('today weather: ', todayWeather);
            observer.next(this.today);
            observer.complete();
          });
        }
      });
    }

    public createTodayWeather(weatherData: WeatherResponse): Today {
        const weatherInfo = weatherData.data;
        this.today.dayOfWeek = weatherInfo.dayOfWeek[0];
        this.today.narrative = weatherInfo.narrative[0];
        this.today.sunriseTime = weatherInfo.sunriseTimeLocal[0];
        this.today.sunsetTime = weatherInfo.sunsetTimeLocal[0];
        this.today.maxTemperature = weatherInfo.temperatureMax[0];
        this.today.minTemperature = weatherInfo.temperatureMin[0];

        const dayPart = weatherInfo.daypart[0];

        const dayTime = new WeatherInfo();
        dayTime.narrative = dayPart.narrative[0];
        dayTime.precipChance = dayPart.precipChance[0];
        dayTime.precipType = dayPart.precipType[0];
        dayTime.humidity = dayPart.relativeHumidity[0];
        dayTime.temperature = dayPart.temperature[0];
        dayTime.windSpeed = dayPart.windSpeed[0];

        this.today.dayTime = dayTime;

        const nightTime = new WeatherInfo();
        nightTime.narrative = dayPart.narrative[1];
        nightTime.precipChance = dayPart.precipChance[1];
        nightTime.precipType = dayPart.precipType[1];
        nightTime.humidity = dayPart.relativeHumidity[1];
        nightTime.temperature = dayPart.temperature[1];
        nightTime.windSpeed = dayPart.windSpeed[1];

        this.today.nightTime = nightTime;

        return this.today;
    }

}