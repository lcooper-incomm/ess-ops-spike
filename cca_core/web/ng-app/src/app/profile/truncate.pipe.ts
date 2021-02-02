import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe ( {
  name: 'truncate'
} )
export class TruncatePipe implements PipeTransform {

  transform ( value: string, length: any ): any {

    _.truncate ( value, {
      'omission': ' ...'
    } );
    console.log ( length )
    return value;
  }

}
