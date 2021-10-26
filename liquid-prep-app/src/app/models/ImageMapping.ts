export class ImageMapping {
    cropsMap: Map<string, Crop>;
    cropStageMap: Map<string, CropGrowthStageImageMapping>;
    weatherIconMap: Map<string, WeatherIconMapping>;
}

export class Crop {
    url: string;
}

export class CropGrowthStageImageMapping {
    stageUrl: string;
}

export class WeatherIconMapping {
    weatherIconUrl: string;
}
