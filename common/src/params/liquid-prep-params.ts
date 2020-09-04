import { Params } from "../params";

export interface LiquidPrepParams extends Params {
  moistureLevel: number;
  soilWet: string;
  rainTomorrow: string;
}