import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelCase'
})
export class LabelCasePipe implements PipeTransform {

  transform(firstName: string, lastName?: string): string {
    return LabelCasePipe.nameFormat(firstName)  +  (lastName ? ", " + LabelCasePipe.nameFormat(lastName) : "");
  }

  static nameFormat(value: string) : string {
    let upper = value ? value.toUpperCase() : "";
    let lower = value ? value.toLowerCase() : "";
    if (upper.length > 0 && lower.length > 0) {
      return upper[0] + lower.substr(1);
    }
    return ""
  }

}
