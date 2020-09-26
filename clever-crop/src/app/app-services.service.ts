import { Inject, Injectable } from '@angular/core';
import { Crop } from './models/Crop';
// import * as Rx from 'rxjs/Rx';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CropListResponse } from './models/api/CropListResponse';
import { CropInfoResponse } from './models/api/CropInfoResponse';
import { WeatherResponse } from './models/api/WeatherResponse';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
const STORAGE_KEY = 'my-crops';

@Injectable({
  providedIn: 'root',
})
export class AppServicesService {
  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

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

  public getMyCrops(): Observable<CropListResponse> {
   return of(
      this.storage.get(STORAGE_KEY) || this.getEmptyMyCrops()
    );
  }

  public setMyCrops(cropListResponse: CropListResponse) {
    this.storage.set(STORAGE_KEY, cropListResponse);
  }

  private getEmptyMyCrops(): CropListResponse {
    const emptyCropsResponse = new CropListResponse();
    emptyCropsResponse.status = 'success';
    emptyCropsResponse.statusCode = '200';
    emptyCropsResponse.message = '';
    emptyCropsResponse.data = new Array<Crop>();

    return emptyCropsResponse;
  }
}
