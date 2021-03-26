import {Component, OnInit, Input, ApplicationRef, NgZone} from '@angular/core';
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
  public weatherIcon = '';
  public loading:Boolean = false;
  public temperature = undefined;
  public todayWeather = null;
  public myCropStatus: 'no-crop' | 'crop-selected' = 'no-crop';
  public errorMessage = "";

  constructor(
    private router: Router, private location: Location,
    private weatherService: WeatherDataService, private cropDataService: CropDataService
    ) {
    this.updateWeatherInfo();
  }

  ngOnInit(): void {

    this.cropDataService.getMyCrops().subscribe(myCrops => {
      this.myCrops = myCrops;
      if (this.myCrops.length > 0){
        this.myCropStatus = 'crop-selected';
      }
    });

    this.currentDate =  formatDate(new Date(), 'MMMM d, yyyy', 'en');

    // TODO: Add weather template
    /*this.dataService.getWeatherInfo().subscribe((weatherInfo: WeatherResponse) => {
      const todayWeather = WeatherService.getInstance().createTodayWeather(weatherInfo);
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
    this.router.navigateByUrl('/select-crop').then(r => {});
  }

  public volumeClicked() {

  }

  public cropClicked(event){
    this.router.navigate(['advice']).then(r => {});
  }

  public backClicked() {
    this.location.back();
  }

  onContextMenu($event: MouseEvent, crop: Crop) {
  }

  onViewCropAdvice(crop: Crop) {
    this.router.navigate(['advice']).then(r => {});
  }

  onRemoveCrop(crop: Crop) {
    this.cropDataService.deleteMyCrop(crop.id);
    window.location.reload();
  }

  onAdd1stCrop() {
    this.router.navigateByUrl('/select-crop').then(r => {});
  }


  updateWeatherInfo(){
    var self = this;
    self.loading = true;
    self.weatherService.getTodayWeather().subscribe(
        (todayWeather: TodayWeather) => {
          self.loading = false;
          self.todayWeather = todayWeather;
          const isDayTime = new DateTimeUtil().isDayTime(todayWeather.sunriseTime.toString(), todayWeather.sunsetTime.toString());
          if (isDayTime) {
            self.temperature = todayWeather.dayTime.temperature;
            self.weatherIcon = "wb_sunny";
          } else {
            self.temperature = todayWeather.nightTime.temperature;
            self.weatherIcon = "bed";
          }
        },
        (err) => {
          self.loading = false;
          self.errorMessage = err ;
        }
    );
  }

  showError() {
    var self = this;
    alert(self.errorMessage);
  }
  
}
