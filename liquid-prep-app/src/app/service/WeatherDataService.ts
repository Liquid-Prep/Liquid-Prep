import { Inject, Injectable } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { Observable, Observer } from 'rxjs';
import { WeatherResponse } from '../models/api/WeatherResponse';
import { WeatherInfo, TodayWeather } from '../models/TodayWeather';
import { DataService } from './DataService';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DateTimeUtil } from '../utility/DateTimeUtil';

const TODAY_WEATHER = 'today-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {

    public today = new TodayWeather();
    private dateTimeUtil;

    constructor(private dataService: DataService, @Inject(LOCAL_STORAGE) private localStorage: StorageService,
                private datePipe: DatePipe) {
                  this.dateTimeUtil = new DateTimeUtil();
                }

    public getTodayWeather(): Observable<TodayWeather>  {
      const self = this;
      // check if the weather data stored locally is valid for today
      // else get today weather data from backend
      const localTodayWeather = self.getTodayWeatherFromLocalStorage();
      if (localTodayWeather) {
        if (self.dateTimeUtil.isToday(localTodayWeather.date)) {
          return new Observable((observer: Observer<TodayWeather>) => {
            observer.next(localTodayWeather);
            observer.complete();
          });
        } else {
          return new Observable((observer: Observer<TodayWeather>) => {
            this.dataService.getWeatherInfo().subscribe({
              next(weatherInfo: WeatherResponse) {
                self.today = self.createTodayWeather(weatherInfo);
                self.storeTodayWeatherInLocalStorage(self.today);
                observer.next(self.today);
                observer.complete();
              },
              error(err) {
                observer.error('Error getting weather data: ' + (err.message ? err.message : err) );
              }
            });
          });
        }
      } else {
        return new Observable((observer: Observer<TodayWeather>) => {
          if (self.today.dayOfWeek) {
            observer.next(self.today);
            observer.complete();
          } else {
            this.dataService.getWeatherInfo().subscribe({
              next(weatherInfo: WeatherResponse) {
                self.today = self.createTodayWeather(weatherInfo);
                self.storeTodayWeatherInLocalStorage(self.today);
                observer.next(self.today);
                observer.complete();
              },
              error(err) {
                console.log('Error getting weather data: ' + (err.message ? err.message : err) );
              }
            });
          }
        });
      }
    }

    public createTodayWeather(weatherData: WeatherResponse): TodayWeather {
        const weatherInfo = weatherData.data;
        this.today.dayOfWeek = weatherInfo.dayOfWeek[0];
        this.today.narrative = weatherInfo.narrative[0];
        this.today.sunriseTime = weatherInfo.sunriseTimeLocal[0];
        this.today.sunsetTime = weatherInfo.sunsetTimeLocal[0];
        this.today.maxTemperature = weatherInfo.temperatureMax[0];
        this.today.minTemperature = weatherInfo.temperatureMin[0];
        this.today.date = this.dateTimeUtil.extractDateFromDateTime(weatherInfo.validTimeLocal[0]);

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

    public storeTodayWeatherInLocalStorage(todayWeather: TodayWeather){
      if (todayWeather && this.dateTimeUtil.isToday(todayWeather.date)) {
        this.localStorage.set(TODAY_WEATHER, todayWeather);
      }

    }

    public getTodayWeatherFromLocalStorage(): TodayWeather {
      return this.localStorage.get(TODAY_WEATHER);
    }

    // determine if its raining more than 25%
    public isRaining(weatherInfo: WeatherInfo) {
      if ((weatherInfo.precipType === 'rain') || (weatherInfo.precipType === 'precip')) {
          if (weatherInfo.precipChance > 25) {
              return true;
          } else {
              return false;
          }
      } else {
          return false;
      }
    }

    // Referred - https://www.britannica.com/technology/agricultural-technology/Weather-conditions-and-controls#ref558352
    public determineTemperatureIndex(temp: number) {
      if (temp < 5) {
        return 'LOW';
      } else if (temp >= 5 && temp <= 25) {
          return 'OPTIMUM';
      } else if (temp > 25 && temp < 30) {
          return 'MEDIUM';
      } else {
          return 'HIGH';
      }
    }

    public determineRainIndex(precip: number) {
      if (precip >= 25 && precip < 50) {
          return 'LOW';
      } else if (precip >= 50 && precip < 75) {
          return 'MEDIUM';
      } else {
          return 'HIGH';
      }
    }

    /*public isToday(date: string) {
      const todayDate =  formatDate(new Date(), 'yyyy-MM-dd', 'en');
      if (date === todayDate.toString()) {
        return true;
      } else {
        return false;
      }
    }
    public extractDateFromDateTime(dateTime) {
      return this.datePipe.transform(dateTime, 'yyyy-MM-dd');
    }*/

}
