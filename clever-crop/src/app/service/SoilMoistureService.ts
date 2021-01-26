import { Injectable } from "@angular/core";
import { SoilMoisture } from "../models/SoilMoisture";

@Injectable({
    providedIn: 'root',
})

export class SoilMoistureService {

    // This static soil moisture value is temporary.
    // Should be removed/replaced with the dynamic reading from the sensor.
    private staticSoilMoisture = 30;

    public getSoilMoistureReading() {
        const soilMoisture = new SoilMoisture();
        // TODO: replace staticSoilMoisture with the real time value once the sensor connection is integrated.
        soilMoisture.soilMoisturePercentage = this.staticSoilMoisture;

        if (soilMoisture.soilMoisturePercentage <= 33) {
            soilMoisture.soilMoistureIndex = 'LOW'; 
        } else if (soilMoisture.soilMoisturePercentage > 33 && soilMoisture.soilMoisturePercentage <= 66) {
            soilMoisture.soilMoistureIndex = 'MEDIUM'
        } else {
            soilMoisture.soilMoistureIndex = 'HIGH'
        }

        return soilMoisture;  
    }
}