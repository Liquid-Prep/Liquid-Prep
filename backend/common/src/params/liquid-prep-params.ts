import { DBParams } from "../db-params";

export interface LiquidPrepParams extends DBParams {
  moistureLevel: number;
  soilWet: string;
  rainTomorrow: string;
  cloudFunctionsURL: string;
  cropName: string;
  id: number;
}