import { SoilMoisture } from './SoilMoisture';

export class Advice {
    id: string;
    cropName: string;
    stage: string;
    waterRecommended: number;
    temperature: number;
    wateringDecision: string;
    soilMoistureReading: SoilMoisture;
    imageUrl: string;
}