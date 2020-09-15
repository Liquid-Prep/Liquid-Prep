import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

import { Crop } from 'src/app/models/Crop';
import { AppServicesService } from '../app-services.service';

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

  constructor(private _appService: AppServicesService) {}

  ngOnInit(): void {
    this._appService.requestCropsList().subscribe(data => {
      this.dataSource = data;
    });
  }
  
  public tabClicked(tab) {
    this.activeTab = tab;
  }

  public onRowClicked(row) {
    console.log('row clicked ' , row);
  }
}
