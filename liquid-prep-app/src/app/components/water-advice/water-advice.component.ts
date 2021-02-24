import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

export interface Advice {
  weather_icon: string;
  temperature: string;
  date: Date;
  volume: string;
}

@Component({
  selector: 'app-water-guide',
  templateUrl: './water-advice.component.html',
  styleUrls: ['./water-advice.component.scss']
})
export class WaterAdviceComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  public bgImg = '../../assets/crops-images/corn.jpg';
  public cropName = 'Waxy corn';

  public dailyAdvices: Advice[] = [
    {
      weather_icon: 'wb_sunny',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-1.png'
    },
    {
      weather_icon: 'wb_cloudy',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-2.png'
    },
    {
      weather_icon: 'wb_sunny',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-3.png'
    },
    {
      weather_icon: 'wb_cloudy',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-1.png'
    },
    {
      weather_icon: 'wb_sunny',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-2.png'
    },
    {
      weather_icon: 'wb_sunny',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-3.png'
    },
    {
      weather_icon: 'wb_sunny',
      temperature: '30',
      date: new Date('1/1/16'),
      volume: '../../assets/water-volume-1.png'
    }
  ];

  ngOnInit(): void {
  }

  public onClose(){
    this.location.back();
  }

  public onFabClicked(){
    this.router.navigate(['/measure-soil']);
  }
}
