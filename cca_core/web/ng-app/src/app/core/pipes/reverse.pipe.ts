import { Pipe, PipeTransform } from '@angular/core';

@Pipe ( {
  name: 'reverse'
} )
export class ReversePipe implements PipeTransform {

  transform ( values: any[] ): any {
    if ( values ) {
      return values.slice ().reverse ();
    } else {
      return values;
    }
  }

}
