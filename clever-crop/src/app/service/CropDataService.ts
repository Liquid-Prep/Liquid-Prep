import { Inject, Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CropListResponse } from '../models/api/CropListResponse';
import { Crop, Stage } from '../models/Crop';
import { ImageMapping } from '../models/ImageMapping';
import { DataService } from './DataService';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SelectedCrop } from '../models/SelectedCrop';

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
    /*http.get<ImageMapping>(this.cropImageMappingFile).subscribe((data) => {
      this.cropImageMapping = data;
    });

    http.get<ImageMapping>(this.stageImageMappingFile).subscribe((data) => {
      this.cropGrowthStageImageMapping = data;
    });*/
  }

  /*private cropImageMapping: ImageMapping;
  private cropGrowthStageImageMapping: ImageMapping;*/
  private cropImageMappingFile = '/assets/json/cropImageMapping.json';
  private defaultImage = '../assets/crops-images/missing.jpg';
  private stageImageMappingFile = '../assets/json/cropGrowthStageImageMapping.json';

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
        const cropData: Crop = cropInfo.data.docs[0];
        if (cropData) {
            console.log('testing cropData mod: ', cropData);
            /*cropData.map((crop) => {
                crop.id = crop._id;
                this.fetchCropStageImages(crop);
            });*/
            cropData.id = cropInfo.data.docs[0]._id;
            this.fetchCropStageImages(cropData);
            //this.storeSelectedCropInSession(cropData);
            observer.next(cropData);
            observer.complete();
        } else {
            observer.error('crops data is null or empty');
        }
      });
    });
  }

  public createSelectedCrop(crop: Crop, stage: Stage) {
    const selectedCrop = new SelectedCrop();
    selectedCrop.cropName = crop.cropName;
    selectedCrop.id = crop.id;
    selectedCrop.stage = stage;
    selectedCrop.imageUrl = crop.url;

    return selectedCrop;
  }

  // Storing selected crop in session to access later to generate water advise
  public storeSelectedCropInSession(selectedCrop: SelectedCrop) {
    if (selectedCrop) {
        this.sessionStorage.set(SELECTED_CROP, selectedCrop);
    }
  }

  public getSelectedCropFromSession() {
      return this.sessionStorage.get(SELECTED_CROP);
  }

  // store crops list in session storage
  public storeCropListInSession(cropsListData) {
    this.getCropListFromSessionStorage().subscribe((cropsList: Crop[]) => {
        if (cropsList === undefined || cropsList.length === 0) {
            this.sessionStorage.set(CROP_LIST_KEY, cropsListData);
        } else {
            console.log('crop list already stored in session storage.');
        }
    });
  }

  // check if crops list exits in session storage else return empty list
  public getCropListFromSessionStorage(): Observable<Crop[]> {
    return of(this.sessionStorage.get(CROP_LIST_KEY) || this.getEmptyMyCrops());
  }

  // check if my-crops list exists in local storage else return empty list
  public getMyCropsFromLocalStorage(): Observable<Crop[]> {
    return of(this.localStorage.get(CROPS_STORAGE_KEY) || this.getEmptyMyCrops());
  }

  // check if my-crops list exists in local storage else return empty list
  public getMyCrops(): Observable<Crop[]> {
    return new Observable((observer: Observer<any>) => {
      let crops = [];
      this.getMyCropsFromLocalStorage().subscribe((myCrops:any) => {
        if (myCrops.length !== 0) {
          myCrops.map((crop) => {
            crop.id = crop._id;
            this.fetchCropListImage(crop);
          });
          crops = myCrops;
        }
        observer.next(crops);
        observer.complete();
      })
    });
  }

  // Filter out crops which are already existing in my-crops list stored locally
  public filterOutExistingCrops(cropsListData) {
    console.log('cropsListData: ', cropsListData);
    let filteredCropList = new Array<Crop>();
    this.getMyCrops().subscribe(storedCrops => {
        if (storedCrops !== undefined && storedCrops.length !== 0) {
            console.log('existing cropsListData: ', storedCrops);
            for (const eachCropData of cropsListData) {
                storedCrops.forEach(eachStoredCrop => {
                    if (eachCropData.id !== eachStoredCrop.id) {
                        filteredCropList.push(eachCropData);
                    }

                });
            }
        } else {
            console.log('returning all cropsListData: ');
            filteredCropList = cropsListData;
        }
    });
    return filteredCropList;
  }

  public storeMyCropsInLocalStorage(crop: Crop) {
    console.log('storeMyCropsInLocalStorage crop data: ', crop);
    const cropsData = new Array<Crop>();
    this.getMyCrops().subscribe((myCrops) => {
    console.log('storeMyCropsInLocalStorage my-crops: ', myCrops);

    // If the crops list is empty in local storage then store the crop
    // Else store the crop if its not already existing.
    if (myCrops.length === 0) {
      cropsData.push(crop);
      this.localStorage.set(CROPS_STORAGE_KEY, cropsData);
    } else {
        myCrops.forEach(eachCrop => {
            if (crop.id === eachCrop.id) {
                console.log('crop is already stored locally.');
            } else {
              myCrops.push(crop);
              this.localStorage.remove(CROPS_STORAGE_KEY);
              this.localStorage.set(CROPS_STORAGE_KEY, myCrops);
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

  public getCropImageMapping(): Observable<ImageMapping> {
    return new Observable((observer: Observer<ImageMapping>) => {
      this.http.get<ImageMapping>(this.cropImageMappingFile).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
    
  }

  public getCropGrowthStageImageMapping(): Observable<ImageMapping> {
    return new Observable((observer: Observer<ImageMapping>) => {
      this.http.get<ImageMapping>(this.stageImageMappingFile).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
  }

  private fetchCropStageImages(crop: Crop) {
    this.getCropGrowthStageImageMapping().subscribe((cropGrowthStageImageMapping: ImageMapping) => {
      if (cropGrowthStageImageMapping != null) {
        if (crop.cropGrowthStage) {
            crop.cropGrowthStage.stages.forEach((stage) => {
              const stageUrl = cropGrowthStageImageMapping.cropStageMap[stage.stageNumber.toString()].url;
              stage.url = stageUrl;
            });
       }
      } else {
        if (crop.cropGrowthStage) {
            crop.cropGrowthStage.stages.forEach((stage) => {
              const stageUrl = '../assets/crops-images/stage' + stage.stageNumber + '.png';
              stage.url = stageUrl;
            });
        }
      }
    });
  }

  private fetchCropListImage(crop: Crop) {
    this.getCropImageMapping().subscribe((cropImageMapping: ImageMapping) => {
      console.log('fetchCropListImage: ', cropImageMapping)
    if (cropImageMapping != null &&
      cropImageMapping.cropsMap[crop.id]) {
      console.log('fetchCropListImage: ', crop.id)
      crop.url = cropImageMapping.cropsMap[crop.id].url;
    } else {
      crop.url = this.defaultImage;
    }
    });
  }

  private getEmptyMyCrops(): Crop[] {
    const emptyArray: Crop[] = [];
    return emptyArray;
  }
}