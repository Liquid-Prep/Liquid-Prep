import { formatDate, DatePipe } from '@angular/common';

export class DateTimeUtil {

  constructor() {}

  public isToday(date: string) {
    const todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log('today date: ', todayDate);

    if (date === todayDate.toString()) {
      return true;
    } else {
      return false;
    }
  }

  public extractDateFromDateTime(dateTime) {
    return new DatePipe('en-US').transform(dateTime, 'yyyy-MM-dd')
    //return this.datePipe.transform(dateTime, 'yyyy-MM-dd');
  }

  public getCurrentTimeInMilliSeconds() {
    return new Date().getTime();
  }

  public isDayTime(sunriseTime: string, sunsetTime: string) {
    const currentTime = new Date().getTime();
    // format sunrise and sunset time to milliseconds
    const formatsunriseTime = new Date(sunriseTime).getTime();
    const formatsunsetTime = new Date(sunsetTime).getTime();
    console.log('hours: ',currentTime, this.getCurrentTimeInMilliSeconds(), formatsunriseTime, formatsunsetTime)
    if ((currentTime >= formatsunriseTime) && (currentTime < formatsunsetTime)) {
      return true;
    } else {
      return false;
    }
  }
}