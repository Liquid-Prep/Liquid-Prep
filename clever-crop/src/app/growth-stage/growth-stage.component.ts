import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AppServicesService } from '../app-services.service';
import { Crop, Stage } from '../models/Crop';

@Component({
  selector: 'app-growth-stage',
  templateUrl: './growth-stage.component.html',
  styleUrls: ['./growth-stage.component.scss'],
})

export class GrowthStageComponent implements OnInit {
  crop: Crop;
  stages: Stage[];

  constructor(
    private router: Router,
    private location: Location,
    private appService: AppServicesService
  ) {}

  ngOnInit(): void {
    // TODO find the correct id or figure out  a way to get the crop
    this.appService.requestCropsInfo(1).subscribe(cropInfoResponse => {
      this.crop = cropInfoResponse.data;
      console.log('date', this.crop);
      this.stages = cropInfoResponse.data.cropGrowthStage.stages;
      console.log('stages', this.crop.cropGrowthStage.stages);
    });
  }

  public volumeClicked() {
    console.log('volume clicked');
  }

  public backClicked() {
    this.location.back();
  }

  cardClicked(stage: Stage) {
    this.router.navigateByUrl('/measure-soil');
  }
}
