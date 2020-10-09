import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppServicesService } from '../app-services.service';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {

  currentDate = '';

  constructor(
    private router: Router,
    private location: Location,
    private appService: AppServicesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentDate = 'Today, ' + formatDate(new Date(), 'MMMM d, yyyy', 'en');
    this.appService.getMyCrops().subscribe(adviceResponse => {

    });
  }

  public volumeClicked() {

  }

  public backClicked() {
    this.location.back();
  }
}
