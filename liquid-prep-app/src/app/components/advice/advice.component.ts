import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { WaterAdviceService } from 'src/app/service/WaterAdviceService';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.scss']
})
export class AdviceComponent implements OnInit {

  currentDate = '';
  waterRecommeded = undefined;
  wateringDecision = '';
  temperature = undefined;
  soilMoistureLevel = undefined;

  constructor(
    private router: Router,
    private waterAdviceService: WaterAdviceService
  ) {}

  ngOnInit(): void {
    this.currentDate = 'Today, ' + formatDate(new Date(), 'MMMM d, yyyy', 'en');
    this.waterAdviceService.getWaterAdvice().subscribe( advice => {
      this.waterRecommeded = advice.waterRecommended;
      this.wateringDecision = advice.wateringDecision;
      this.temperature = advice.temperature;
      this.soilMoistureLevel = advice.soilMoistureReading.soilMoisturePercentage;
    });
  }

  public volumeClicked() {

  }

  public backClicked() {
    this.router.navigateByUrl('/my-crops').then(r => {});
  }

  onFabClicked() {
    this.router.navigate(['/measure-soil']).then(r => {});
  }
}
