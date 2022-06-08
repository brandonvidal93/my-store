import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeVocales'
})
export class ChangeVocalesPipe implements PipeTransform {

  /**
   * It takes a string, replaces all instances of the letter 'a' with the '@' symbol, replaces all
   * instances of the letter 'e' with the number '3', replaces all instances of the letter 'i' with the
   * number '1', replaces all instances of the letter 'o' with the number '0', and replaces all
   * instances of the letter 'u' with the letter 'U'
   * @param {string} value - string - The value that is passed in from the template.
   * @returns The value of the string is being returned.
   */
  transform(value: string): string {
    return value
    .replace(/(a)/gi, '@')
    .replace(/(e)/g, "3")
    .replace(/(i)/g, "1")
    .replace(/(o)/g, "0")
    .replace(/(u)/g, "U");
  }

}
