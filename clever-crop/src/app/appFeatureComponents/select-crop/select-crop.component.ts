
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppServicesService} from '../app-services.service';
import {Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';

import { CropListResponse } from '../models/api/CropListResponse';
import { CropInfoResponse } from '../models/api/CropInfoResponse';
import { Crop } from '../models/Crop';

@Component({
  selector: 'app-select-crop',
  templateUrl: './select-crop.component.html',
  styleUrls: ['./select-crop.component.scss']
})

export class SelectCropComponent implements OnInit{

  searchText = '';
  title = 'Select Crop';

  @ViewChild('searchbar') searchbar: ElementRef;

  toggleSearch = false;
  dataSource: Crop[];
  myCrops: CropListResponse;

  constructor(private appService: AppServicesService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.appService.deleteMyCrops();
    this.appService.requestCropsList().subscribe(cropListResponse => {
      this.dataSource = cropListResponse.data;
    });

    this.appService.getMyCrops().subscribe(cropListResponse => {
      this.myCrops = cropListResponse;
    });
  }

  backToMyCrops(){
    this.location.back();
  }

  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }

  addCrop(clickedCrop: Crop) {
    if (this.myCrops.data.findIndex(c => c.index === clickedCrop.index) === -1){
      this.myCrops.data.push(clickedCrop);
      this.appService.setMyCrops(this.myCrops);
      this.router.navigateByUrl('/select-growth/' + clickedCrop.index);
    }
  }

  filterFunction(): Crop[]{
    if (this.searchText === null || this.searchText === ''){
      return this.dataSource;
    }else{
      return this.dataSource.filter(i => i.cropName.includes( this.searchText));
    }
  }
}
