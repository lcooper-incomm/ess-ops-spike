import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe ( {
  name: 'orderBy'
} )
export class OrderByPipe implements PipeTransform {

  transform<T> ( value: T[], fieldName: string, reverse: boolean = false ): T[] {
    const sortDirection: 'asc' | 'desc' = reverse ? 'desc' : 'asc';
    return _.orderBy ( value, fieldName, sortDirection );
  }

}
