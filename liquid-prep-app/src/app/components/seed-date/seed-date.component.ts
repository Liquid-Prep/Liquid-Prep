import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Crop, Stage } from '../../models/Crop';
import { CropDataService } from 'src/app/service/CropDataService';

@Component({
  selector: 'app-seed-date',
  templateUrl: './seed-date.component.html',
  styleUrls: ['./seed-date.component.scss']
})
export class SeedDateComponent implements OnInit {
  crop: Crop;
  stages: Stage[];
  date: Date;
  maxDate = new Date();

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private cropService: CropDataService
  ) {
    this.date = new Date();
  }

  ngOnInit(): void {
    // TODO find the correct id or figure out a way to get the crop
    const cropId = this.route.snapshot.paramMap.get('id');
    this.cropService.getCropData(cropId)
      .subscribe(
        (cropData) => {
          this.crop = cropData;
          this.stages = cropData.cropGrowthStage.stages;
        },
        (err) => {
          alert("Could not get crop info: " + err);
        }
    );
  }

  public volumeClicked() {

  }

  public backClicked() {
    this.location.back();
  }

  clickConfirm() {
    // add crop info to my crops list
    this.cropService.storeMyCropsInLocalStorage(this.crop);
    // store selected crop in session to generate water advise
    // const selectedCrop = this.cropService.createSelectedCrop(this.crop, stage);
    // this.cropService.storeSelectedCropInSession(selectedCrop);

    this.router.navigate(['/measure-soil']).then(r => {});
  }

}
