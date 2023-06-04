import {Pipe, PipeTransform} from '@angular/core';
import {MobileObject} from "./MobileObject.class";

@Pipe({
    name: 'filterByBand',
    standalone: true
})
export class FilterByBandPipe implements PipeTransform {

  transform(value: any, field: string): MobileObject[] {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(item => item.Band === field) || [];
  }
}
