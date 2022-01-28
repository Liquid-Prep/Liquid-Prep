// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Advice } from '../models/Advice';
import {Crop, Stage} from '../models/Crop';
import { TodayWeather, WeatherInfo } from '../models/TodayWeather';
import { DateTimeUtil } from '../utility/DateTimeUtil';
import { CropDataService } from './CropDataService';
import { WeatherDataService } from './WeatherDataService';
import { SoilMoistureService } from './SoilMoistureService';
import { SoilMoisture } from '../models/SoilMoisture';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WaterAdviceService {

    public moistureWaterMap = new Map([
      ['None', new Map(
        [
          ['LOW', '/assets/moisture-water/nowater_lowmoisture.png'],
          ['MEDIUM', '/assets/moisture-water/nowater_mediummoisture.png'],
          ['HIGH', '/assets/moisture-water/nowater_highmoisture.png']
        ])],
      ['Little', new Map(
        [
          ['LOW', '/assets/moisture-water/littlewater_lowmoisture.png'],
          ['MEDIUM', '/assets/moisture-water/littlewater_mediummoisture.png'],
          ['HIGH', '/assets/moisture-water/littlewater_highmoisture.png']
        ]
      )],
      ['Modest', new Map(
        [
          ['LOW', '/assets/moisture-water/moderatewater_lowmoisture.png'],
          ['MEDIUM', '/assets/moisture-water/moderatewater_mediummoisture.png'],
          ['HIGH', '/assets/moisture-water/moderatewater_highmoisture.png']
        ]
      )],
      ['Plenty', new Map(
        [
          ['LOW', '/assets/moisture-water/lotswater_lowmoisture.png'],
          ['MEDIUM', '/assets/moisture-water/lotswater_mediummoisture.png'],
          ['HIGH', '/assets/moisture-water/lotswater_highmoisture.png']
        ]
      )]
    ]);

    public ADVICE_TEXT: string[] = ['Plenty', 'Modest', 'Little', 'None'];

    public LOW = 'LOW';
    public MED = 'MEDIUM';
    public HIGH = 'HIGH';
    public OPT = 'OPTIMUM';

    private SOIL_MOISTURE_LOW = 'soil moisture level is low';
    private SOIL_MOISTURE_MED = 'soil moisture level is medium';
    private SOIL_MOISTURE_HIGH = 'soil moisture level is high';

    private RAIN_LOW = 'rain probability is low';
    private RAIN_MED = 'rain probability is slightly high';
    private RAIN_HIGH = 'rain probability is high';

    private TEMP_OPT = 'temparature is optimum';
    private TEMP_MED = 'temparature is slightly hot';
    private TEMP_HIGH = 'temparature is very hot';

    private WATER_CROPS = 'Modest'; // 'Water your crops';
    private DONT_WATER = 'None'; // 'Do not water your crops';
    private WATER_CROPS_LESS = 'Little'; // 'Water your crops less than the recommended value';
    private WATER_CROPS_MORE = 'Plenty'; // 'Water your crops more than the recommended value';
    private DEFAULT_WATER_CROPS = this.WATER_CROPS; // 'Water your crops today ';
    private AND = ' and ';

    private waterAdvice: Advice;

    constructor(private weatherDataService: WeatherDataService,
                private cropDataService: CropDataService,
                private soilMoistureService: SoilMoistureService) {
                    this.waterAdvice = new Advice();
    }

    public getWaterAdvice(): Observable<Advice> {
        const selectedCrop = this.cropDataService.getSelectCrop();
        const soilMoisture = this.soilMoistureService.getSoilMoistureReading();
        return new Observable((observer: Observer<Advice>) => {
            this.weatherDataService.getTodayWeather().subscribe(todayWeather => {
                if (todayWeather) {
                    // return this.createWaterAdvice(todayWeather, selectedCrop, soilMoisture);
                    observer.next(this.createWaterAdvice(todayWeather, selectedCrop, soilMoisture));
                    observer.complete();
                }
            });
        });
    }

    private createWaterAdvice(weatherInfo: TodayWeather, crop: Crop, soilMoisture: SoilMoisture): Advice {
      // gather weather info
      // gather crop info for a stage
      const dateTimeUtil = new DateTimeUtil();

      this.waterAdvice.soilMoistureReading = new SoilMoisture();
      this.waterAdvice.cropName = crop.cropName;
      this.waterAdvice.id = crop.id;
      const stage: Stage = this.cropDataService.generateCropGrowthStage(crop);
      this.waterAdvice.stage = stage;
      this.waterAdvice.waterRecommended = stage.waterUse;
      this.waterAdvice.soilMoistureReading.soilMoisturePercentage = soilMoisture.soilMoisturePercentage;
      this.waterAdvice.soilMoistureReading.soilMoistureIndex = soilMoisture.soilMoistureIndex;

      const isDayTime = dateTimeUtil.isDayTime(weatherInfo.sunriseTime.toString(), weatherInfo.sunsetTime.toString());

      if (isDayTime){
          // The The Weather Company by design returns null values for the dayPart after 3 pm local time.
          // Therefore we should default to nighPart if the dayPart returns null values.
          if (weatherInfo.dayTime.temperature !== null) {
            this.waterAdvice.temperature = weatherInfo.dayTime.temperature;
            this.waterAdvice.weatherIconTemp = weatherInfo.dayTime.iconImageUrl;
            this.waterAdvice.wateringDecision = this.generateWaterAdvice(weatherInfo.dayTime, soilMoisture.soilMoistureIndex);
          } else {
            this.waterAdvice.temperature = weatherInfo.nightTime.temperature;
            this.waterAdvice.weatherIconTemp = weatherInfo.nightTime.iconImageUrl;
            this.waterAdvice.wateringDecision = this.generateWaterAdvice(weatherInfo.nightTime, soilMoisture.soilMoistureIndex);
          }
      } else {
        this.waterAdvice.temperature = weatherInfo.nightTime.temperature;
        this.waterAdvice.weatherIconTemp = weatherInfo.nightTime.iconImageUrl;
        this.waterAdvice.wateringDecision = this.generateWaterAdvice(weatherInfo.nightTime, soilMoisture.soilMoistureIndex);
      }
      this.waterAdvice.imageUrl = this.moistureWaterMap.get(this.waterAdvice.wateringDecision).get(soilMoisture.soilMoistureIndex);
      return this.waterAdvice;
    }

    private generateWaterAdvice(weatherInfo: WeatherInfo, soilMoistureIndex: string): string{
        if (this.weatherDataService.isRaining(weatherInfo)) {
            const rainIndex = this.weatherDataService.determineRainIndex(weatherInfo.precipChance);
            this.waterAdvice.rainfallIndex = rainIndex;
            this.waterAdvice.rainfallPercentage = weatherInfo.precipChance;
            return this.determineRainyDayAdvice(rainIndex, soilMoistureIndex);
        } else {
            const temparatureIndex = this.weatherDataService.determineTemperatureIndex(weatherInfo.temperature);
            this.waterAdvice.rainfallIndex = 'NONE';
            this.waterAdvice.rainfallPercentage = weatherInfo.precipChance;
            return this.determineNonRainyDayAdvice(soilMoistureIndex, temparatureIndex);
        }
    }

    private determineRainyDayAdvice(rainIndex: string, soilMoistureIndex: string): string {

        if (rainIndex === this.LOW && soilMoistureIndex === this.LOW) {
            return this.WATER_CROPS;
        } else if (rainIndex === this.LOW && soilMoistureIndex === this.MED) {
            return this.WATER_CROPS_LESS;
        } else if (rainIndex === this.LOW && soilMoistureIndex === this.HIGH) {
            return this.DONT_WATER;
        } else if (rainIndex === this.MED && soilMoistureIndex === this.LOW) {
            return this.WATER_CROPS;
        } else if (rainIndex === this.MED && soilMoistureIndex === this.MED) {
            return this.WATER_CROPS_LESS;
        } else if (rainIndex === this.MED && soilMoistureIndex === this.HIGH) {
            return this.DONT_WATER;
        } else if (rainIndex === this.HIGH && soilMoistureIndex === this.LOW) {
            return this.DONT_WATER;
        } else if (rainIndex === this.HIGH && soilMoistureIndex === this.MED) {
            return this.DONT_WATER;
        } else if (rainIndex === this.HIGH && soilMoistureIndex === this.HIGH) {
            return this.DONT_WATER;
        } else {
            return this.DEFAULT_WATER_CROPS;
        }
    }

    private determineNonRainyDayAdvice(soilMoistureIndex: string, temparatureIndex: string): string {
        if (soilMoistureIndex === this.LOW && temparatureIndex === this.LOW){
            return this.WATER_CROPS;
        } else if (soilMoistureIndex === this.LOW && temparatureIndex === this.OPT) {
            return this.WATER_CROPS;
        } else if (soilMoistureIndex === this.LOW && temparatureIndex === this.MED) {
            return this.WATER_CROPS;
        } else if (soilMoistureIndex === this.LOW && temparatureIndex === this.HIGH) {
            return this.WATER_CROPS_MORE;
        } else if (soilMoistureIndex === this.MED && temparatureIndex === this.LOW) {
            return this.DONT_WATER;
        } else if (soilMoistureIndex === this.MED && temparatureIndex === this.OPT) {
            return this.WATER_CROPS;
        } else if (soilMoistureIndex === this.MED && temparatureIndex === this.MED) {
            return this.WATER_CROPS;
        } else if (soilMoistureIndex === this.MED && temparatureIndex === this.HIGH) {
            return this.WATER_CROPS_MORE;
        } else if (soilMoistureIndex === this.MED && temparatureIndex === this.LOW) {
            return this.DONT_WATER;
        } else if (soilMoistureIndex === this.HIGH && temparatureIndex === this.LOW) {
            return this.DONT_WATER;
        } else if (soilMoistureIndex === this.HIGH && temparatureIndex === this.OPT) {
            return this.DONT_WATER;
        } else if (soilMoistureIndex === this.HIGH && temparatureIndex === this.MED) {
            return this.DONT_WATER;
        } else if (soilMoistureIndex === this.HIGH && temparatureIndex === this.HIGH) {
            return this.WATER_CROPS_LESS;
        } else {
            return this.DEFAULT_WATER_CROPS;
        }
    }
}
