import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Card } from "../card/card";
import { Customer } from "../customer/customer";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Logger } from "../../logging/logger.service";
import { SearchTypeContainer } from "./search-type-container";
import { Observable } from "rxjs";
import { mapToObject } from "../utils/cca-utils";
import { SearchParameterValueType } from "./search-type/search-parameter-value-type.enum";
import { PlatformType } from '../platform/platform-type.enum';

const buildAll = ( platform: PlatformType ) => map ( ( values: any[] ) => {
  return values.map ( value => new Customer ( value, platform ) );
} );

const invertAll = map ( ( values: Customer[] ) => {
  let results: Card[] = [];

  values.forEach ( ( customer: Customer ) => {
    customer.cards.forEach ( ( card: Card ) => {
      card.customer = customer;
      results.push ( card );
    } );
  } );

  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerSearchService {

  constructor ( private http: HttpClient,
                private logger: Logger ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<Customer[]> {
    let request = this.buildSearchRequest ( searchTypeContainer );
    let params  = new HttpParams ()
      .set ( SearchParameterValueType.PARTNER, request[ SearchParameterValueType.PARTNER ] )
      .set ( SearchParameterValueType.PLATFORM, searchTypeContainer.searchType.platform );

    return this.http.post ( '/rest/customer/search', request, { params: params } )
      .pipe ( buildAll ( searchTypeContainer.searchType.platform ), this.logSearchPipe );
  }

  searchAsCards ( searchTypeContainer: SearchTypeContainer ): Observable<Card[]> {
    return this.search ( searchTypeContainer )
      .pipe ( invertAll );
  }

  private buildSearchRequest ( searchTypeContainer: SearchTypeContainer ): { [ key: string ]: any } {
    let request = mapToObject ( searchTypeContainer.parameters );

    //Combine and clean address fields
    if ( request[ SearchParameterValueType.ADDRESS_LINE_1 ] ) {
      let address = request[ SearchParameterValueType.ADDRESS_LINE_1 ];
      delete request[ SearchParameterValueType.ADDRESS_LINE_1 ];
      if ( address && request[ SearchParameterValueType.ADDRESS_LINE_2 ] ) {
        address = `${address} ${request[ SearchParameterValueType.ADDRESS_LINE_2 ]}`;
        delete request[ SearchParameterValueType.ADDRESS_LINE_2 ];
      }
      request[ SearchParameterValueType.ADDRESS ] = address;
    }

    //Reformat date of birth from MM/dd/yyyy to yyyy-MM-dd
    if ( request[ SearchParameterValueType.DATE_OF_BIRTH ] ) {
      let parts                                         = request[ SearchParameterValueType.DATE_OF_BIRTH ].split ( '/' );
      request[ SearchParameterValueType.DATE_OF_BIRTH ] = `${parts[ 2 ]}-${parts[ 1 ]}-${parts[ 0 ]}`;
    }

    return request;
  }

  private logSearchPipe = map ( ( values: Customer[] ) => {
    this.logger.info ( 'Completed Customer Search', values );
    return values;
  } );
}
