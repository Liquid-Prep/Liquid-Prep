import { Injectable } from '@angular/core';
import { SoilMoisture } from '../models/SoilMoisture';

@Injectable({
    providedIn: 'root',
})

export class SoilMoistureService {

    private soilMoistureReadingPercentage = 0;

    public setSoilMoistureReading(valuePercentage) {
        this.soilMoistureReadingPercentage = valuePercentage;
    }

    public getSoilMoistureReading() {
        const soilMoisture = new SoilMoisture();
        // TODO: replace staticSoilMoisture with the real time value once the sensor connection is integrated.
        soilMoisture.soilMoisturePercentage = this.soilMoistureReadingPercentage;

        if (soilMoisture.soilMoisturePercentage <= 33) {
            soilMoisture.soilMoistureIndex = 'LOW';
        } else if (soilMoisture.soilMoisturePercentage > 33 && soilMoisture.soilMoisturePercentage <= 66) {
            soilMoisture.soilMoistureIndex = 'MEDIUM';
        } else {
            soilMoisture.soilMoistureIndex = 'HIGH';
        }

        return soilMoisture;
    }
}
