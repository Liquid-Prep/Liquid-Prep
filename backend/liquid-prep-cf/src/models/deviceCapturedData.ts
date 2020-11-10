export class DeviceCaptureData {

    private deviceId: string;
    private latitue: number;
    private longitude: number;
    private altitude: number;
    private timestamp: Date;
    private sensorId: number;
    private soilMositureLevel: number;
    private cropType: string;
    private cropGrowthStage: string;

    constructor(
        deviceId: string,
        latitue: number,
        longitude: number,
        altitude: number,
        timestamp: Date,
        sensorId: number,
        soilMositureLevel: number,
        cropType: string,
        cropGrowthStage: string 
    ) {
            this.deviceId = deviceId;
            this.latitue = latitue;
            this.longitude = longitude;
            this.altitude = altitude;
            this.timestamp = timestamp;
            this.sensorId = sensorId;
            this.soilMositureLevel = soilMositureLevel;
            this.cropType = cropType;
            this.cropGrowthStage = cropGrowthStage;
    }

}