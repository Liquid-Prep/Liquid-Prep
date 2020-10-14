
export class Soil {
  private soilWet: boolean;

  constructor(
    private moistureLevel: number,
    private rainTomorrow: boolean
  ) {
    this.soilWet = this.isSoilWet();
  }  

  isSoilWet() {
    return this.moistureLevel >= 500;
  }

  isWaterNeeded() {
    console.log(`soil: ${this.soilWet}, rainTomorrow: ${this.rainTomorrow}`)
    if(!this.soilWet && this.rainTomorrow) {
      return false;
    } else if(!this.soilWet && !this.rainTomorrow) {
      return true;
    } else if(this.soilWet && !this.rainTomorrow || this.soilWet && this.rainTomorrow) {
      return false;
    }
  }
}  
