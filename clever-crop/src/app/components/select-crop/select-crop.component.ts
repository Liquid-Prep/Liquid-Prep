import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppServicesService} from '../../app-services.service';
import {Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';

import { CropListResponse } from '../../models/api/CropListResponse';
import { CropInfoResponse } from '../../models/api/CropInfoResponse';
import { Crop } from '../../models/Crop';
import { CropDataService } from '../../service/CropDataService';

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
  cropsList: Crop[];
  myCrops: CropListResponse;

  constructor(private appService: AppServicesService, private router: Router, private location: Location,
              private cropService: CropDataService) { }

  ngOnInit(): void {
    // Delete locally stored crops list
    this.appService.deleteMyCrops();

    // Get list of crops from backend service
    this.cropService.getCropsListData().subscribe((cropsListResponse) => {
      console.log('crops list data: ', cropsListResponse);
      this.cropsList = cropsListResponse;
    });

    //this.cropService.setMyCrops(new Crop());

    /*this.appService.getMyCrops().subscribe(cropListResponse => {
      this.myCrops = cropListResponse;
      console.log('crops: ', this.myCrops);
    });*/

    /*this.cropService.getCropData().subscribe((cropData) => {
      console.log('crop data: ', cropData);
    });*/
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
    console.log('clicked crop: ', clickedCrop.id);
    this.router.navigateByUrl('/select-growth/' + clickedCrop.id);
    
    //console.log('id: ', id);
    /*if (this.myCrops.data.findIndex(c => c._id === clickedCrop.index) === -1){
      this.myCrops.data.push(clickedCrop);
      this.appService.setMyCrops(this.myCrops);
      this.router.navigateByUrl('/select-growth/' + clickedCrop.index);
    }*/
  }

  filterFunction(): Crop[]{
    if (this.searchText === null || this.searchText === ''){
      return this.cropsList;
    }else{
      return this.cropsList.filter(i => i.cropName.includes( this.searchText));
    }
  }
}