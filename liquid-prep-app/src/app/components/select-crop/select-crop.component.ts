import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import { CropListResponse } from '../../models/api/CropListResponse';
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
  NO_NEW_CROPS = ''

  constructor(private router: Router, private location: Location,
              private cropService: CropDataService) { }

  ngOnInit(): void {

    // Get list of crops from backend service
    this.cropService.getCropsListData().subscribe((cropsListResponse) => {
      if (cropsListResponse === undefined || cropsListResponse.length === 0) {
        this.NO_NEW_CROPS = '../../assets/crops-images/noNewCrops.PNG'
      } else {
        this.cropsList = cropsListResponse;
      }
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
    this.router.navigateByUrl('/select-growth/' + clickedCrop.id);
   
  }

  filterFunction(): Crop[]{
    if (this.searchText === null || this.searchText === ''){
      return this.cropsList;
    }else{
      return this.cropsList.filter(i => i.cropName.includes( this.searchText));
    }
  }
}