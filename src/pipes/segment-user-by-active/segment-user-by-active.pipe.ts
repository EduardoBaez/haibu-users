import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'segmentUserByActive'
})
export class SegmentUserByActivePipe implements PipeTransform {

  transform(value: any, active: number): any {
    if (active === 100) return value
    return value.filter((item: any) => {
      return item.activo === active
    })
  }

}
