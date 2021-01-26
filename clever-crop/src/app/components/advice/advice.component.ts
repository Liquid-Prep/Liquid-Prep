import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppServicesService } from '../../app-services.service';
import { CropDataService } from 'src/app/service/CropDataService';
import { WeatherDataService } from 'src/app/service/WeatherDataService';
import { WaterAdviceService } from 'src/app/service/WaterAdviceService';

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
    private route: ActivatedRoute,
    private cropDataService: CropDataService,
    private weatherDataService: WeatherDataService,
    private waterAdviceService: WaterAdviceService
  ) {}

  ngOnInit(): void {
    this.currentDate = 'Today, ' + formatDate(new Date(), 'MMMM d, yyyy', 'en');
    /*this.appService.getMyCrops().subscribe(adviceResponse => {
    });*/
    this.waterAdviceService.getWaterAdvice().subscribe( advice => {
      console.log('water advice: '+advice);
    });
    /*this.weatherDataService.getTodayWeather().subscribe(todayWeather => {
      if (todayWeather) {
        
      
    });*/
  }

  public volumeClicked() {

  }

  public backClicked() {
    this.location.back();
  }
}