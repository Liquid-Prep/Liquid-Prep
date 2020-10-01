import { Component, OnInit, Input } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-crop',
  templateUrl: './select-crop.component.html',
  styleUrls: ['./select-crop.component.scss']
})
export class SelectCropComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  public backClicked() {
    this._location.back();
  }
}
