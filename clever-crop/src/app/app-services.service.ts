import { Injectable } from '@angular/core';
import { Crop } from './models/Crop';
// import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CropListResponse } from './models/api/CropListResponse';
import { CropInfoResponse } from './models/api/CropInfoResponse';

@Injectable({
  providedIn: 'root',
})
export class AppServicesService {
  constructor(private http: HttpClient) {}
  // private cropsUrl = 'https://liquidprep.com/crops';
  private cropsUrl = '/assets/json/crops.json';

  // private cropUrl = 'https://liquidprep.com/crops/';
  private cropUrl = '/assets/json/crop.json';

  // private weatherUrl = 'https://liquidprep.com/crops/';
  private weatherUrl = '/assets/json/weather.json';

  requestCropsList(): Observable<CropListResponse> {
    return this.http.get<CropListResponse>(this.cropsUrl).pipe(
      map((response: CropListResponse) => {
        if (response.data) {
          response.data.map((crop) => {
            this.fetchCropImage(crop);
          });
        }
        return response;
      })
    );
  }

  public requestCropsInfo(id): Observable<CropInfoResponse> {
    return this.http.get<CropInfoResponse>(this.cropUrl + id);
  }

  public requestWeatherInfo(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl);
  }

  private fetchCropImage(crop: Crop) {
    // TODO fix the mapping
    crop.url = '../assets/crops-images/corn.jpg';
  }
}
