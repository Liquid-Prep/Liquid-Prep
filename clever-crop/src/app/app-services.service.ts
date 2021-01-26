import { Inject, Injectable } from '@angular/core';
import { Crop } from './models/Crop';
import { ImageMapping } from './models/ImageMapping';

import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CropListResponse } from './models/api/CropListResponse';
import { CropInfoResponse } from './models/api/CropInfoResponse';
import { WeatherResponse } from './models/api/WeatherResponse';
import { AdviceResponse } from './models/api/AdviceResponse';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
const STORAGE_KEY = 'my-crops';

@Injectable({
  providedIn: 'root',
})
export class AppServicesService {
  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {
    /*http.get<ImageMapping>(this.mappingFile)
      .subscribe(data => {
        this.imageMapping = data;
      });*/
  }

  //private mappingFile = '/assets/json/imageMapping.json';
  private imageMapping: ImageMapping;
  // private imageMapping = [string:string]

  // private cropsUrl = 'https://liquidprep.com/crops';
  private cropsUrl = '/assets/json/crops.json';

  // private cropUrl = 'https://liquidprep.com/crops/';
  private cropUrl = '/assets/json/crop.json';

  // private weatherUrl = 'https://liquidprep.com/crops/';
  //private weatherUrl = '/assets/json/weather.json';
  private weatherUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/96fd655207897b11587cfcf2b3f58f6e0792f788cf2a04daa79b53fc3d4efb32/liquidprep-cf-api/get_weather_info?geoCode=43.595,-79.640&units=m';

  // private adviceUrl = 'https://liquidprep.com/advice/';
  private adviceUrl = '/assets/json/advice.json';

  public requestCropsList(): Observable<CropListResponse> {
    return this.http.get<CropListResponse>(this.cropsUrl).pipe(
      map((response: CropListResponse) => {
        if (response.data) {
          response.data.map((crop) => {
            console.log('crop: ', crop)
            this.fetchCropImage(crop);
          });
        }
        console.log('response: ', response)
        return response;
      })
    );
  }

  public requestCropsInfo(id): Observable<CropInfoResponse> {
    return this.http.get<CropInfoResponse>(this.cropUrl).pipe(
      map((response: CropInfoResponse) => {
        if (response.data) {
          this.fetchCropImage(response.data);
        }
        return response;
      })
    );
  }

  public requestWeatherInfo(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl);
  }

  private fetchCropImage(crop: Crop) {
    // TODO fix the mapping
    const defaultImage = '../assets/crops-images/missing.jpg';

    if (this.imageMapping != null && this.imageMapping.cropsMap[crop.cropName]) {
      crop.url = this.imageMapping.cropsMap[crop.cropName].url;

      if (crop.cropGrowthStage) {
        crop.cropGrowthStage.stages.forEach((stage) => {
          const url = this.imageMapping.cropsMap[crop.cropName].stagesMap[stage.stageNumber.toString()].url;
          stage.url = url;
        });
      }
    } else {
      crop.url = defaultImage;

      if (crop.cropGrowthStage) {
        crop.cropGrowthStage.stages.forEach((stage) => {
          const stageUrl = '../assets/crops-images/stage' + stage.stageNumber + '.png';
          stage.url = stageUrl;
        });
      }
    }

    /*if (this.imageMapping != null && this.imageMapping.cropsMap[crop.index.toString()]) {
      crop.url = this.imageMapping.cropsMap[crop.index.toString()].url;
      if (crop.cropGrowthStage) {
        crop.cropGrowthStage.stages.forEach((stage) => {
          const url = this.imageMapping.cropsMap[crop.index.toString()].stagesMap[stage.stageNumber.toString()].url;
          stage.url = url;
        });
      }
    } else {
      crop.url = defaultImage;
      if (crop.cropGrowthStage) {
        crop.cropGrowthStage.stages.forEach((stage) => {
          const stageUrl = '../assets/crops-images/stage' + stage.stageNumber + '.png';
          stage.url = stageUrl;
        });
      }
    }*/
  }

  public getMyCrops(): Observable<CropListResponse> {
    return of(this.storage.get(STORAGE_KEY) || this.getEmptyMyCrops());
  }

  public setMyCrops(cropListResponse: CropListResponse) {
    this.storage.set(STORAGE_KEY, cropListResponse);
  }

  public deleteMyCrops(): boolean {
    if (this.storage.get(STORAGE_KEY)) {
      this.setMyCrops(this.getEmptyMyCrops());
      return true;
    }
    return false;
  }

  private getEmptyMyCrops(): CropListResponse {
    const emptyCropsResponse = new CropListResponse();
    emptyCropsResponse.status = 'success';
    emptyCropsResponse.statusCode = 200;
    emptyCropsResponse.message = '';
    emptyCropsResponse.data = new Array<Crop>();

    return emptyCropsResponse;
  }

  /*public requestAdvice(): Observable<AdviceResponse> {
    return this.http.get<WeatherResponse>(this.weatherUrl);
  }*/
}