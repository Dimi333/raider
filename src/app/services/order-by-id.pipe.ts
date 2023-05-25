import {Pipe, PipeTransform} from '@angular/core';
import {MobileObject} from "./MobileObject.class";

@Pipe({
  name: 'orderById'
})
export class OrderByIdPipe implements PipeTransform {
  transform(value: any, field: string): MobileObject[] {
    if (!Array.isArray(value)) {
      return [];
    }

    value.sort((a: any, b: any) => {
      if (a['Id'] < b['Id']) {
        return -1;
      } else if (a['Id'] > b['Id']) {
        return 1;
      } else {
        return 0;
      }
    });

    return value;
  }
}
