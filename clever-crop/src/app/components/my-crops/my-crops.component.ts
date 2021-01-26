import { Component, OnInit, Input } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

import { AppServicesService } from '../../app-services.service';
import { CropListResponse } from '../../models/api/CropListResponse';
import { CropInfoResponse } from '../../models/api/CropInfoResponse';
import { Crop } from '../../models/Crop';
import { DataService } from '../../service/DataService';
import { WeatherResponse } from 'src/app/models/api/WeatherResponse';
import { WeatherDataService } from 'src/app/service/WeatherDataService';
import { TodayWeather } from 'src/app/models/TodayWeather';
import { CropDataService } from 'src/app/service/CropDataService';
import { DateTimeUtil } from 'src/app/utility/DateTimeUtil';

@Component({
  selector: 'app-my-crops',
  templateUrl: './my-crops.component.html',
  styleUrls: ['./my-crops.component.scss'],
})
export class MyCropsComponent implements OnInit {
  dataSource: Crop[];
  displayedColumns: string[] = ['EmptyColumnTitle'];

  tabs = ['My Crops', 'Settings'];
  activeTab = this.tabs[0];
  background: ThemePalette = undefined;

  public currentDate = '';
  public temperature = 0;

  constructor(private appService: AppServicesService, private router: Router, private location: Location,
              private weatherService: WeatherDataService, private cropDataService: CropDataService) {

                console.log('currentDate: '+this.currentDate);
                this.weatherService.getTodayWeather().subscribe((todayWeather: TodayWeather) => {
                  console.log('today weather: ', todayWeather);
                  const isDayTime = new DateTimeUtil().isDayTime(todayWeather.sunriseTime.toString(), todayWeather.sunsetTime.toString());
                  if (isDayTime) {
                    this.temperature = todayWeather.dayTime.temperature;
                  } else {
                    this.temperature = todayWeather.nightTime.temperature;
                  }
                  
                });
              }

  ngOnInit(): void {
    /*this.appService.getMyCrops().subscribe(cropListResponse => {
      this.dataSource = cropListResponse.data;
    });*/

    this.cropDataService.getMyCrops().subscribe((myCrops: Crop[]) => {
      this.dataSource = myCrops;
    });

    this.currentDate =  formatDate(new Date(), 'MMMM d, yyyy', 'en');

    /*const today =  formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log('today date: ', today);*/

    /*this.dataService.getWeatherInfo().subscribe((weatherInfo: WeatherResponse) => {
      //console.log('weather data: ', weatherInfo);
      const todayWeather = WeatherService.getInstance().createTodayWeather(weatherInfo);
      console.log('today weather: ', todayWeather);
    });*/

    
  }

  public tabClicked(tab) {
    this.activeTab = tab;
    if (tab === tab[0]) {
      this.router.navigateByUrl('/my-crops');
    } else {
      this.router.navigateByUrl('/settings');
    }
  }

  public fabClicked() {
    this.router.navigateByUrl('/select-crop');
  }

  public volumeClicked() {

  }

  public cropClicked(event){
    //this.router.navigate(['/water-advice/:1']);
    this.router.navigate(['advice']).then(r => {});
  }

  public backClicked() {
    this.location.back();
  }

  onContextMenu($event: MouseEvent, crop: Crop) {
    console.log('onContextMenu');
  }

  onViewCropAdvice(crop: Crop) {
    this.router.navigate(['advice']).then(r => {});
  }

  onRemoveCrop(crop: Crop) {
    this.appService.deleteMyCrops();
    window.location.reload();
  }
}