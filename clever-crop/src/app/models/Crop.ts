export class Crop {
    index: number;
    cropName: string;
    cropGrowthStage: CropGrowthStage;
    url: string;
}

export class CropGrowthStage {
    numberOfStages: number;
    waterMeasurementMetric: string; // inches
    waterUsage: string; // daily
    stages: Stage[];
}

export class Stage {
   stageNumber: number;
   stage: string;
   waterUseMin: number;
   waterUseMax: number;
   url: string;
}