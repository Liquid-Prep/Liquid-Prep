import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Advice } from '../models/Advice';
import { Crop } from '../models/Crop';
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

    private WATER_CROPS = 'Water your crops, as ';
    private DONT_WATER = 'Do not water your crops, as ';
    private WATER_CROPS_LESS = 'Water your crops less than the recommended value, as ';
    private WATER_CROPS_MORE = 'Water your crops more than the recommended value, as ';
    private DEFAULT_WATER_CROPS = 'Water your crops today ';
    private AND = ' and ';

    

    constructor(private weatherDataService: WeatherDataService, private cropDataService: CropDataService,
                private soilMoistureService: SoilMoistureService) {

    }

    public getWaterAdvice(): Observable<Advice> {
        const selectedCrop = this.cropDataService.getSelectedCropFromSession();
        const soilMoisture = this.soilMoistureService.getSoilMoistureReading();
        return new Observable((observer: Observer<Advice>) => {
            this.weatherDataService.getTodayWeather().subscribe(todayWeather => {
                if (todayWeather) {
                    //return this.createWaterAdvice(todayWeather, selectedCrop, soilMoisture);
                    observer.next(this.createWaterAdvice(todayWeather, selectedCrop, soilMoisture));
                    observer.complete();
                }
                
            });
        });
    }

    private createWaterAdvice(weatherInfo: TodayWeather, cropInfo: SelectedCrop, soilMoisture: SoilMoisture): Advice {
        // gather weather info
        // gather crop info for a stage
        const dateTimeUtil = new DateTimeUtil();
        let waterAdvice = new Advice();
        waterAdvice.soilMoistureReading = new SoilMoisture();
        console.log('cropInfo: ', soilMoisture.soilMoisturePercentage)
        waterAdvice.cropName = cropInfo.cropName;
        waterAdvice.id = cropInfo.id;
        waterAdvice.stage = cropInfo.stage.stage;
        waterAdvice.waterRecommended = cropInfo.stage.waterUse;
        waterAdvice.soilMoistureReading.soilMoisturePercentage = soilMoisture.soilMoisturePercentage;
        waterAdvice.soilMoistureReading.soilMoistureIndex = soilMoisture.soilMoistureIndex;
        
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

        if (rainIndex == this.LOW && soilMoistureIndex == this.LOW) {
            return this.WATER_CROPS + this.RAIN_LOW + this.AND + this.SOIL_MOISTURE_LOW;
        } else if (rainIndex == this.MED && soilMoistureIndex == this.LOW) {
            return this.WATER_CROPS + this.RAIN_MED + this.AND+ this.SOIL_MOISTURE_LOW;
        } else if (rainIndex == this.LOW && soilMoistureIndex == this.MED) {
            return this.WATER_CROPS_LESS + this.RAIN_LOW + this.AND+ this.SOIL_MOISTURE_MED;
        } else if (rainIndex == this.MED && soilMoistureIndex == this.MED) {
            return this.WATER_CROPS_LESS + this.RAIN_MED + this.AND+ this.SOIL_MOISTURE_LOW;
        } else if (rainIndex == this.LOW && soilMoistureIndex == this.HIGH) {
            return this.DONT_WATER + this.RAIN_LOW + this.AND+ this.SOIL_MOISTURE_HIGH;
        } else if (rainIndex == this.MED && soilMoistureIndex == this.HIGH) {
            return this.DONT_WATER + this.RAIN_MED + this.AND+ this.SOIL_MOISTURE_HIGH;
        } else if (rainIndex == this.HIGH && soilMoistureIndex == this.LOW) {
            return this.DONT_WATER + this.RAIN_HIGH + this.AND+ this.SOIL_MOISTURE_LOW;
        } else if (rainIndex == this.HIGH && soilMoistureIndex == this.MED) {
            return this.DONT_WATER + this.RAIN_HIGH + this.AND+ this.SOIL_MOISTURE_MED;
        } else if (rainIndex == this.HIGH && soilMoistureIndex == this.HIGH) {
            return this.DONT_WATER + this.RAIN_HIGH + this.AND+ this.SOIL_MOISTURE_HIGH;
        } else {
            return this.DEFAULT_WATER_CROPS;
        }

    }

    private determineNonRainyDayAdvice(soilMoistureIndex: string, temparatureIndex: string): string {

        if (soilMoistureIndex == this.LOW && temparatureIndex == this.OPT) {
            return this.WATER_CROPS + this.SOIL_MOISTURE_LOW + this.AND+ this.TEMP_OPT;
        } else if (soilMoistureIndex == this.LOW && temparatureIndex == this.MED) {
            return this.WATER_CROPS + this.SOIL_MOISTURE_LOW + this.AND+ this.TEMP_MED;
        } else if (soilMoistureIndex == this.MED && temparatureIndex == this.OPT) {
            return this.WATER_CROPS + this.SOIL_MOISTURE_MED + this.AND+ this.TEMP_OPT;
        } else if (soilMoistureIndex == this.MED && temparatureIndex == this.MED) {
            return this.WATER_CROPS + this.SOIL_MOISTURE_MED + this.AND+ this.TEMP_MED;
        } else if (soilMoistureIndex == this.LOW && temparatureIndex == this.HIGH) {
            return this.WATER_CROPS_MORE + this.SOIL_MOISTURE_LOW + this.AND+ this.TEMP_HIGH;
        } else if (soilMoistureIndex == this.MED && temparatureIndex == this.HIGH) {
            return this.WATER_CROPS_MORE + this.SOIL_MOISTURE_MED + this.AND+ this.TEMP_HIGH;
        } else if (soilMoistureIndex == this.HIGH && temparatureIndex == this.OPT) {
            return this.WATER_CROPS_LESS + this.SOIL_MOISTURE_HIGH + this.AND+ this.TEMP_OPT;
        } else if (soilMoistureIndex == this.HIGH && temparatureIndex == this.MED) {
            return this.WATER_CROPS_LESS + this.SOIL_MOISTURE_HIGH + this.AND+ this.TEMP_MED;
        } else if (soilMoistureIndex == this.HIGH && temparatureIndex == this.HIGH) {
            return this.WATER_CROPS_LESS + this.SOIL_MOISTURE_HIGH + this.AND+ this.TEMP_HIGH;
        } else {
            return this.DEFAULT_WATER_CROPS;
        }
    } 
}