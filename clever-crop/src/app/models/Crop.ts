export class Crop {
    index: Number;
    cropName: String;
    cropGrowthStage: CropGrowthStage;
    url: String;
}

export class CropGrowthStage {
    numberOfStages: Number;
    waterMeasurementMetric: String; // inches
    waterUsage: String; // daily
    stages: Stage[]
}

export class Stage {
   stageNumber: Number;
   stage: String;
   waterUseMin: Number;
   waterUseMax: Number;
}