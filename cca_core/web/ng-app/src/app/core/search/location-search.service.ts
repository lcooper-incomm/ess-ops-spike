import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Location } from "../node/location/location";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Logger } from "../../logging/logger.service";
import { SearchTypeContainer } from "./search-type-container";
import { Observable } from 'rxjs';
import { mapToObject } from "../utils/cca-utils";
import { StateProvinceService } from "../form/state-province-field/state-province.service";
import { SearchParameterValueType } from "./search-type/search-parameter-value-type.enum";
import * as _ from "lodash";
import { CsCoreAddressType } from "@cscore/core-client-model";

const build = map ( value => new Location ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Location[] = [];
  values.forEach ( value => results.push ( new Location ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class LocationSearchService {

  constructor ( private http: HttpClient,
                private logger: Logger,
                private stateService: StateProvinceService ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<Location[]> {
    return this.http.post ( '/rest/location/search', mapToObject ( searchTypeContainer.parameters ) )
      .pipe ( buildAll,
        map ( ( values: Location[] ) => {
          //If State was included in the query parameters, filter out results that don't actually match the chosen value
          //This is necessary because MDM requires the abbreviation, but returns matches where the state name CONTAINS the abbreviation...
          let stateParameter = searchTypeContainer.parameters.get ( SearchParameterValueType.STATE_PROVINCE );
          if ( stateParameter ) {
            let state = this.stateService.getStateProvinceByAbbreviation ( stateParameter );
            if ( state ) {
              values = _.filter ( values, ( location: Location ) => {
                let address = location.getAddressByType ( CsCoreAddressType.PHYSICAL );
                return !address || address.state === stateParameter;
              } );
            }
          }
          return values;
        } )
      );
  }

}
