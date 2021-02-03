import { Component, OnInit, Input } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

import { Crop } from '../../models/Crop';
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
  myCrops: Crop[];
  displayedColumns: string[] = ['EmptyColumnTitle'];

  tabs = ['My Crops', 'Settings'];
  activeTab = this.tabs[0];
  background: ThemePalette = undefined;

  public currentDate = '';
  public temperature = undefined;

  constructor(private router: Router, private location: Location,
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

    this.cropDataService.getMyCrops().subscribe(myCrops => {
      console.log('myCrops: ',myCrops)
      this.myCrops = myCrops;
    });

    this.currentDate =  formatDate(new Date(), 'MMMM d, yyyy', 'en');

    // TODO: Add weather template
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
    //this.cropDataService.deleteMyCrop(crop.id);
    window.location.reload();
  }
}