export class Crop {
  id: string;
  cropName: string;
  type: string;
  cropGrowthStage: CropGrowthStage;
  url: string;
}

export class CropGrowthStage {
  numberOfStages: number;
  waterMeasurementMetric: string; // cm
  waterUsage: string; // daily
  stages: Stage[];
}

export class Stage {
  stageNumber: number;
  stage: string;
  waterUse: number;
  url: string;
}