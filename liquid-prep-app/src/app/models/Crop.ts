import {DateTimeUtil} from '../utility/DateTimeUtil';

export class Crop {
  id: string;
  cropName: string;
  type: string;
  cropGrowthStage: CropGrowthStage;
  url: string; // crop image mapping url
  seedingDate: Date;
}

export class CropGrowthStage {
  numberOfStages: number;
  waterMeasurementMetric: string; // cm
  waterUsage: string; // daily
  growthStageLengthMeasure: string;
  totalGrowthStageLength: number;
  rootDepthMetric: string;
  stages: Stage[];
}

export class Stage {
  stageNumber: number;
  stage: string;
  waterUse: number;
  stageLength: number;
  rootDepth: number;
  url: string;
  age: number; // the days since the crop was planted
}
