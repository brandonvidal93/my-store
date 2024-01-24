import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  /**
   * It takes a string, splits it into an array of characters, reverses the array, and then joins the
   * array back into a string
   * @param {string} value - The value to be transformed.
   * @returns The value is being split into an array of characters, reversed, and then joined back into
   * a string.
   */
  transform(value: string): string {
    return value.split('').reverse().join('');
  }

}
