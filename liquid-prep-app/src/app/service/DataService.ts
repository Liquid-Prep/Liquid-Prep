import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of, Observer } from 'rxjs';
import { WeatherMeasuringUnit } from '../utility/WeatherMeasuringUnit';
import { GeoLocationService } from './GeoLocationService';
import { WeatherResponse } from '../models/api/WeatherResponse';
import { CropListResponse } from '../models/api/CropListResponse';
import config from 'src/config.json';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private weatherAPIUrl =  '/get_weather_info?';

  private cropsListAPIUrl = '/get_crop_list';

  private cropAPIUrl = '/get_crop_info?';

  constructor(private http: HttpClient) {}

  public getWeatherInfo(): Observable<WeatherResponse> {
    const self = this;
    return new Observable((observer: Observer<WeatherResponse>) => {
      const unit = WeatherMeasuringUnit.getInstance().getUnit();
      let coordinates;
      GeoLocationService.getInstance()
        .getCurrentLocation()
          .subscribe({
              next(location){
                coordinates = location;
                const params = 'geoCode=' + coordinates + '&units=' + unit;
                const url = config.backendAPIEndpoint + self.weatherAPIUrl + params;
                self.http.get<WeatherResponse>(url)
                  .subscribe(
                    (weatherData) => {
                      if (weatherData.status === 'success' && weatherData.statusCode === 200) {
                        observer.next(weatherData);
                        observer.complete();
                      } else {
                        observer.error(weatherData.message);
                      }
                    },
                    (err) => {
                      observer.error(err.message);
                    }
                );
              },
              error(err) {
                const msg = `Geolocation and weather data not found because \n${err.message}`;
                alert(msg);
              }
          });
    });
  }

  public getCropsList(): Observable<CropListResponse> {
    const self = this;
    return new Observable((observer: Observer<any>) => {
      const url = config.backendAPIEndpoint + self.cropsListAPIUrl;
      self.http.get<CropListResponse>(url)
        .subscribe(
            (cropListData) => {
              if (cropListData.status === 'success' && cropListData.statusCode === 200) {
                observer.next(cropListData);
                observer.complete();
              } else {
                observer.error(cropListData.message);
              }
            },
            (err) => {
              observer.error(err);
            }
      );
    });
  }

  public getCropInfo(id: string): Observable<any> {
    const self = this;
    return new Observable((observer: Observer<any>) => {
      const params = 'id=' + id;
      const url = config.backendAPIEndpoint + self.cropAPIUrl + params;
      self.http.get<any>(url)
        .subscribe(
          (cropData) => {
            if (cropData.status === 'success' && cropData.statusCode === 200) {
              observer.next(cropData);
              observer.complete();
            } else {
              observer.error(cropData.message);
            }
          },
          (err) => {
            observer.error(err);
          }
      );
    });
  }
}
