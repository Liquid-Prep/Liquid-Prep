import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Advice } from '../models/Advice';
import {Crop, Stage} from '../models/Crop';
import { SelectedCrop } from '../models/SelectedCrop';
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

    public ADVICE_IMAGES: string[] = [
      '/assets/moisture-water/littlewater_highmoisture.png',
      '/assets/moisture-water/littlewater_lowmoisture.png',
      '/assets/moisture-water/littlewater_mediummoisture.png',
      '/assets/moisture-water/lotswater_highmoisture.png',
      '/assets/moisture-water/lotswater_lowmoisture.png',
      '/assets/moisture-water/lotswater_mediummoisture.png',
      '/assets/moisture-water/moderatewater_highmoisture.png',
      '/assets/moisture-water/moderatewater_lowmoisture.png',
      '/assets/moisture-water/moderatewater_mediummoisture.png',
      '/assets/moisture-water/nowater_highmoisture.png',
      '/assets/moisture-water/nowater_lowmoisture.png',
      '/assets/moisture-water/nowater_mediummoisture.png',
    ];

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
    private DEFAULT_WATER_CROPS = 'None'; // 'Water your crops today ';
    private AND = ' and ';

    constructor(private weatherDataService: WeatherDataService,
                private cropDataService: CropDataService,
                private soilMoistureService: SoilMoistureService) {
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
        const waterAdvice = new Advice();
        waterAdvice.soilMoistureReading = new SoilMoisture();
        waterAdvice.cropName = crop.cropName;
        waterAdvice.id = crop.id;
        const stage: Stage = this.cropDataService.generateCropGrowthStage(crop);
        waterAdvice.stage = stage;
        waterAdvice.waterRecommended = stage.waterUse;
        waterAdvice.soilMoistureReading.soilMoisturePercentage = soilMoisture.soilMoisturePercentage;
        waterAdvice.soilMoistureReading.soilMoistureIndex = soilMoisture.soilMoistureIndex;

        waterAdvice.imageUrl = this.ADVICE_IMAGES[0];

        const isDayTime = dateTimeUtil.isDayTime(weatherInfo.sunriseTime.toString(), weatherInfo.sunsetTime.toString());

        if (isDayTime){
            waterAdvice.temperature = weatherInfo.dayTime.temperature;
            waterAdvice.wateringDecision = this.generateWaterAdvice(weatherInfo.dayTime, soilMoisture.soilMoistureIndex);
        } else {
            waterAdvice.temperature = weatherInfo.nightTime.temperature;
            waterAdvice.wateringDecision = this.generateWaterAdvice(weatherInfo.nightTime, soilMoisture.soilMoistureIndex);
        }
        return waterAdvice;
    }

    private generateWaterAdvice(weatherInfo: WeatherInfo, soilMoistureIndex: string): string{

        if (this.weatherDataService.isRaining(weatherInfo)) {
            const rainIndex = this.weatherDataService.determineRainIndex(weatherInfo.precipChance);
            return this.determineRainyDayAdvice(rainIndex, soilMoistureIndex);
        } else {
            const temparatureIndex = this.weatherDataService.determineTemperatureIndex(weatherInfo.temperature);
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
