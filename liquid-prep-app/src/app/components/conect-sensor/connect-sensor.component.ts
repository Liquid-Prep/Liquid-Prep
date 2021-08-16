import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seed-date',
  templateUrl: './connect-sensor.component.html',
  styleUrls: ['./connect-sensor.component.scss']
})
export class ConnectSensorComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {

  }

  public volumeClicked() {

  }

  public backClicked() {
    this.location.back();
  }

  clickConfirm(connectionMethod: string) {

    if (connectionMethod.endsWith('USB')){
      this.connectWithUSB();
    } else {
      this.connectWithBluetooth();
    }

    this.router.navigate(['/measure-soil']).then(r => {});
  }

  // The actual connection method
  private connectWithBluetooth(){
    // There is method in measure-soil.components
  }

  private connectWithUSB(){
    // There is method in measure-soil.components
  }

}
