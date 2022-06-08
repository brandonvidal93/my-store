import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  /**
   * It takes a date as an argument and returns a string that represents the time difference between
   * the current date and the date passed in
   * @param {Date} value - The value that is passed to the pipe from your template expression.
   * @returns The difference between the current date and the date passed in.
   */
  transform(value: Date, ): string {
    return formatDistance(new Date(), value);
  }
}
