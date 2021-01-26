import { Inject, Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CropListResponse } from '../models/api/CropListResponse';
import { Crop } from '../models/Crop';
import { ImageMapping } from '../models/ImageMapping';
import { DataService } from './DataService';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const CROP_LIST_KEY = 'crop-list';
const CROPS_STORAGE_KEY = 'my-crops';
const SELECTED_CROP = 'selected-crop';

@Injectable({
  providedIn: 'root',
})
export class CropDataService {
  constructor(private http: HttpClient,
              @Inject(LOCAL_STORAGE) private localStorage: StorageService,
              @Inject(SESSION_STORAGE) private sessionStorage: StorageService,
              private dataService: DataService) {
    http.get<ImageMapping>(this.cropImageMappingFile).subscribe((data) => {
      this.cropImageMapping = data;
    });

    http.get<ImageMapping>(this.stageImageMappingFile).subscribe((data) => {
        this.cropGrowthStageImageMapping = data;
      });
  }

  private cropImageMapping: ImageMapping;
  private cropGrowthStageImageMapping: ImageMapping;
  private cropImageMappingFile = '/assets/json/cropImageMapping.json';
  private defaultImage = '../assets/crops-images/missing.jpg';
  private stageImageMappingFile = '../assets/cropGrowthStageImageMapping.json';

  public getCropsListData(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.dataService.getCropsList().subscribe((cropsList: any) => {
        const cropListData = cropsList.data.docs;
        if (cropListData) {
            console.log('crops list: ', cropListData);
            cropListData.map((crop) => {
                crop.id = crop._id;
                this.fetchCropListImage(crop);
            });
            this.storeCropListInSession(cropListData);
            const filteredCropList = this.filterOutExistingCrops(cropListData);
            console.log('final filteredCropList: ', filteredCropList);
            observer.next(filteredCropList);
            observer.complete();
        } else {
          observer.error('crops list is null or empty');
        }
      });
    });
  }

  public getCropData(id): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.dataService.getCropInfo(id).subscribe((cropInfo: any) => {
        const cropData = cropInfo.data.docs[0];
        console.log('testing cropData mod: ', cropData);
        if (cropData) {
          observer.next(cropData);
          observer.complete();
        } else {
          observer.error('crops data is null or empty');
        }
      });
    });
  }

  public storeSelectedCropInSession(crop) {
    if (crop) {
        this.sessionStorage.set(SELECTED_CROP, crop);
    }
  }

  public storeCropListInSession(cropsListData) {
    this.getCropListFromSessionStorage().subscribe((cropsList: Crop[]) => {
        if (cropsList === undefined || cropsList.length === 0) {
            this.sessionStorage.set(CROP_LIST_KEY, cropsListData);
        } else {
            console.log('crop list already stored in session storage.');
        }
    });
  }

  public getCropListFromSessionStorage(): Observable<Crop[]> {
    return of(this.sessionStorage.get(CROP_LIST_KEY) || this.getEmptyMyCrops());
  }

  public getMyCrops(): Observable<Crop[]> {
    return of(this.localStorage.get(CROPS_STORAGE_KEY) || this.getEmptyMyCrops());
  }

  public filterOutExistingCrops(cropsListData) {
    console.log('cropsListData: ', cropsListData);
    const filteredCropList = new Array<Crop>();
    for (const eachCropData of cropsListData) {
    this.getMyCrops().subscribe(storedCrops => {
        if (storedCrops) {
            storedCrops.forEach(eachStoredCrop => {
                if (eachCropData.id !== eachStoredCrop.id) {
                    filteredCropList.push(eachCropData);
                }

            });
        }
    });
    }
    return filteredCropList;
  }

  public storeMyCropsInLocalStorage(crop: Crop) {
    const cropsData = new Array<Crop>();
    this.getMyCrops().subscribe((myCrops: Crop[]) => {
    console.log('crops: ', myCrops);

    if (myCrops === undefined || myCrops.length === 0) {
        this.localStorage.set(CROPS_STORAGE_KEY, cropsData.push(crop));
    } else {
        myCrops.forEach(eachCrop => {
            if (crop.id === eachCrop.id) {
                console.log('crop is already stored locally.');
            } else {
                this.localStorage.set(CROPS_STORAGE_KEY, myCrops.push(crop));
            }
        });
    }
    });
  }

  /*public deleteMyCrops(): boolean {
    if (this.localStorage.get(CROPS_STORAGE_KEY)) {
      this.setMyCrops(this.getEmptyMyCrops());
      return true;
    }
    return false;
  }*/

  private fetchCropStageImages(crop: Crop) {
    if (this.cropGrowthStageImageMapping != null &&
        this.cropGrowthStageImageMapping.cropsMap[crop.cropName]) {
            /* if (crop.cropGrowthStage) {
                crop.cropGrowthStage.stages.forEach((stage) => {
                const url = this.imageMapping.cropsMap[crop.cropName].stagesMap[stage.stageNumber.toString()].url;
                stage.url = url;
                });
            }*/
        } else {
            /*if (crop.cropGrowthStage) {
                crop.cropGrowthStage.stages.forEach((stage) => {
                const stageUrl = '../assets/crops-images/stage' + stage.stageNumber + '.png';
                stage.url = stageUrl;
                });
            }*/
        }

  }

  private fetchCropListImage(crop: Crop) {
    // TODO fix the mapping
    if (this.cropImageMapping != null &&
      this.cropImageMapping.cropsMap[crop.id]) {
      crop.url = this.cropImageMapping.cropsMap[crop.id].url;
    } else {
      crop.url = this.defaultImage;
    }
  }

  private getEmptyMyCrops(): Crop[] {
      const emptyArray: Crop[] = [];
      return emptyArray;
  }
}