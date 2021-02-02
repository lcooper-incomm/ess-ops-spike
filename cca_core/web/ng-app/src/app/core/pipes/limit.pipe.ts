import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe ( {
  name: 'limit'
} )
export class LimitPipe implements PipeTransform {

  transform ( values: any[], start: number, count: number ): any {
    return _.slice ( values, start, start + count );
  }

}
