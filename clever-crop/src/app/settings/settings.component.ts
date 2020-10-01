import { Component, OnInit, Input } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

import { AppServicesService } from '../app-services.service';
import { CropListResponse } from '../models/api/CropListResponse';
import { CropInfoResponse } from '../models/api/CropInfoResponse';
import { Crop } from '../models/Crop';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private _location: Location) { }

  ngOnInit(): void {
  }

  public volumeClicked() {
    this.router.navigateByUrl('/my-crops');
    console.log('volume clicked');
  }

  public backClicked() {
    this._location.back();
  }
}
