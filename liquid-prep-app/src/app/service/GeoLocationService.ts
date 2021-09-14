import { Observable, Observer } from 'rxjs';

export class GeoLocationService {
  private static instance: GeoLocationService;
  private latitude: number;
  private longitude: number;

  private constructor() {}

  public static getInstance(): GeoLocationService {
    if (!this.instance) {
      this.instance = new GeoLocationService();
    }

    return this.instance;
  }

  public getCurrentLocation(): Observable<any> {
    return new Observable((observer: Observer<any>) => {

      let coordinates = null;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position ) => {
            // Successful getCurrentPosition
            if (position) {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;

              coordinates = this.latitude.toFixed(4) + ',' + this.longitude.toFixed(4);
              observer.next(coordinates);
              observer.complete();
            } else {
              throw Error('Geo coordinates are undefined.');
            }
          },
          (error) => {
            // Error with getCurrentPosition
            observer.error(error);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    });
  }
}
