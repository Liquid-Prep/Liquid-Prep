import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of, Observer } from 'rxjs';
import { WeatherMeasuringUnit } from '../utility/WeatherMeasuringUnit';
import { GeoLocationService } from './GeoLocationService';
import { WeatherResponse } from '../models/api/WeatherResponse';
import { CropListResponse } from '../models/api/CropListResponse';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private commonAPI = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/96fd655207897b11587cfcf2b3f58f6e0792f788cf2a04daa79b53fc3d4efb32/liquidprep-cf-api';
  //private weatherUrl = '/assets/json/weather.json';
  private weatherAPIUrl = this.commonAPI + '/get_weather_info?';

  private cropsListAPIUrl = this.commonAPI + '/get_crop_list';

  private cropAPIUrl = this.commonAPI + '/get_crop_info?';

  constructor(private http: HttpClient) {}

  public getWeatherInfo(): Observable<WeatherResponse> {
    return new Observable((observer: Observer<WeatherResponse>) => {
      const unit = WeatherMeasuringUnit.getInstance().getUnit();
      let coordinates;
      GeoLocationService.getInstance()
        .getCurrentLocation()
        .subscribe((location) => {
          coordinates = location;
          const params = 'geoCode=' + coordinates + '&units=' + unit;
          const url = this.weatherAPIUrl + params;
          this.http.get<WeatherResponse>(url).subscribe((weatherData) => {
            if (weatherData.status === 'success' && weatherData.statusCode === 200) {
              observer.next(weatherData);
              observer.complete();
            } else {
              observer.error(weatherData.message);
            }
          });
        });
    });
  }

  public getCropsList(): Observable<CropListResponse> {
    return new Observable((observer: Observer<any>) => {
      this.http.get<CropListResponse>(this.cropsListAPIUrl).subscribe((cropListData) => {
        if (cropListData.status === 'success' && cropListData.statusCode === 200) {
          //console.log('dataservice: ', cropListData.data.docs);
          observer.next(cropListData);
          observer.complete();
        } else {
          observer.error(cropListData.message);
        }
      });
    });
  }

  public getCropInfo(id: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      console.log('crop id: ', id);
      const params = 'id=' + id;
      const url = this.cropAPIUrl + params;
      console.log(' crop inf url: ', url);
      this.http.get<any>(url).subscribe((cropData) => {
        if (cropData.status === 'success' && cropData.statusCode === 200) {
          observer.next(cropData);
          observer.complete();
        } else {
          observer.error(cropData.message);
        }
      });
    });
  }
}