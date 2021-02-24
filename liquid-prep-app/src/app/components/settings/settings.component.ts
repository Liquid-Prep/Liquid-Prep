import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
  }

  public backClicked() {
    this._location.back();
  }
}
