import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: Date): string {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };
      switch (true) {
        case seconds <= intervals.day: return 'Today';
        case seconds <= intervals.day * 2: return 'Yesterday';
        default: return `${Math.floor(seconds / intervals.day)} days ago`;
      }
    }
    return '';
  }

}
