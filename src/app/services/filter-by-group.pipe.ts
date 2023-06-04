import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByGroup',
    standalone: true
})
export class FilterByGroupPipe implements PipeTransform {

  transform(value: any, field: string): unknown {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(item => item.Group === +field);
  }


}
