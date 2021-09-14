export class WeatherMeasuringUnit {

    private static instance: WeatherMeasuringUnit;
    // Default value is set to metric system.
    private unit = 'm';

    private constructor() { }

    public static getInstance(): WeatherMeasuringUnit {
        if (!this.instance) {
            this.instance = new WeatherMeasuringUnit();
        }

        return this.instance;
    }

    public setUnit(unit: string) {
        this.unit = unit;
        return this.unit;
    }

    public getUnit() {
        return this.unit;
    }
}
