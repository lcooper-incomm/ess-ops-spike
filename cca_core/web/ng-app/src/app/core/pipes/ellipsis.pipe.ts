import { Pipe, PipeTransform } from '@angular/core';

@Pipe ( {
  name: 'ellipsis'
} )
export class EllipsisPipe implements PipeTransform {

  transform ( value: string, maxLength: number ): any {
    if ( value && value.length > maxLength ) {
      return `${value.substring ( 0, maxLength )}...`;
    } else {
      return value;
    }
  }

}
