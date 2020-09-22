import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

import { AppServicesService } from '../app-services.service';
import { CropListResponse } from '../models/api/CropListResponse';
import { CropInfoResponse } from '../models/api/CropInfoResponse';

@Component({
  selector: 'app-my-crops',
  templateUrl: './my-crops.component.html',
  styleUrls: ['./my-crops.component.scss'],
})
export class MyCropsComponent implements OnInit {
  dataSource = [];
  displayedColumns: string[] = ['EmptyColumnTitle'];

  tabs = ['My Crops', 'Settings'];
  activeTab = this.tabs[0];
  background: ThemePalette = undefined;

  constructor(private appService: AppServicesService) {}

  ngOnInit(): void {
    this.appService.requestCropsList().subscribe(cropListResponse => {
      this.dataSource = cropListResponse.data;
    });
  }

  public tabClicked(tab) {
    console.log('clicked ' , tab);
    this.activeTab = tab;

  }

  public fabClicked() {
    console.log('fab clicked' );
  }
}
