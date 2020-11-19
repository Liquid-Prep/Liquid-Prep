export class CropInformation {

    private cropType: string;
    private cropGrowthStage: string;
    private waterUseMin: number;
    private waterUseMax: number;

    constructor(
        cropType: string,
        cropGrowthStage: string,
        waterUseMin: number,
        waterUseMax: number
    ) {
        this.cropType = cropType;
        this.cropGrowthStage = cropGrowthStage;
        this.waterUseMin = waterUseMin;
        this.waterUseMax = waterUseMax;
    }

}