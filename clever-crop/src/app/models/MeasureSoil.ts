export class MeasureSoil {
  title: string;
  description: string;
  url: string;

  constructor(title, description, url) {
    this.title = title;
    this.description = description;
    this.url = url;
  }
}

export const MeasureSoilItems = [
  new MeasureSoil('Step 1:', 'Get your sensor Ready', 'assets/img-31.png'),
  new MeasureSoil('Step 2:', 'Place your sensor in the soil', 'assets/img-32.png'),
  new MeasureSoil('Step 3:', 'Read information on it', 'assets/img-33.png'),
];
