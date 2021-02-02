import { Pipe, PipeTransform } from '@angular/core';
import { CountryGroup } from './state-province-field.component';
import * as _ from "lodash";

@Pipe ( {
  name: 'specifiedCountry'
} )
export class SpecifiedCountryPipe implements PipeTransform {

  transform ( groups: CountryGroup[], specifiedCountry: string ): any {
    return _.filter ( groups, function ( group: CountryGroup ) {
      return !specifiedCountry || group.value === specifiedCountry;
    } );
  }

}
