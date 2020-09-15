import { Injectable } from '@angular/core';
import { Crop } from './models/Crop';
import { Observable, observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor(private http: HttpClient) { }
  // private cropsUrl = 'https://liquidprep.com/crops';
  private cropsUrl = '/assets/json/crops.json';

  // private cropUrl = 'https://liquidprep.com/crops/';
  private cropUrl = '/assets/json/crop.json';


  requestCropsList(): Observable<Crop[]> {
    return this.http.get<Crop[]>(this.cropsUrl);
  }

  requestCropsInfo(id): Observable<Crop[]> {
    return this.http.get<Crop[]>(this.cropUrl + id);
  }
}
