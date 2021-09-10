export class ImageMapping {
    cropsMap: Map<string, Crop>;
    cropStageMap: Map<string, CropGrowthStageImageMapping>;
}

export class Crop {
    url: string;
}

export class CropGrowthStageImageMapping {
    stageUrl: string;
}
