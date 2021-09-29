
export class WeatherInfo {
    public narrative: string;
    public precipChance: number;
    public precipType: string;
    public humidity: number;
    public temperature: number;
    public windSpeed: number;
    public iconCode: number;
    public iconImageUrl: string;
}

export class TodayWeather {
    public dayOfWeek: string;
    public narrative: string;
    public sunriseTime: Date;
    public sunsetTime: Date;
    public maxTemperature: number;
    public minTemperature: number;
    public dayTime: WeatherInfo;
    public nightTime: WeatherInfo;
    public date: string;
}
