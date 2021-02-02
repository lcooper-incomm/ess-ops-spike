import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Logger } from "../../logging/logger.service";
import { SearchTypeContainer } from "./search-type-container";
import { Observable } from "rxjs";
import { Card } from '../card/card';
import { CardService } from '../card/card.service';
import { SearchParameterValueType } from "./search-type/search-parameter-value-type.enum";
import { map } from "rxjs/operators";
import { CardSearchRequest } from "./card-search-request";
import { SearchType } from './search-type/search-type';
import { PlatformType } from "../platform/platform-type.enum";
import { SecurityService } from "../security/security.service";

const build = map ( value => new Card ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Card[] = [];
  values.forEach ( value => results.push ( new Card ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CardSearchService {

  constructor ( private cardService: CardService,
                private http: HttpClient,
                private logger: Logger,
                private securityService: SecurityService ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<Card[]> {
    //Handle request params
    let params = new HttpParams ();
    if ( searchTypeContainer.parameters.get ( SearchParameterValueType.RECENT_ACTIVITY ) ) {
      params[ SearchParameterValueType.RECENT_ACTIVITY ] = true;
    }

    //Find identifier
    let identifierType: string;
    let identifier: string;
    searchTypeContainer.parameters.forEach ( ( value: any, key: string ) => {
      if ( value ) {
        identifierType = key;
        identifier     = value;
      }
    } );

    //For special cases, perform a PAN lookup instead
    if ( identifierType === SearchParameterValueType.REVERSE_VRN ) {
      identifierType = SearchParameterValueType.PAN;
    }

    let request = new CardSearchRequest ( {
      identifier: identifier,
      identifierType: identifierType,
      platform: this.getPlatform ( searchTypeContainer.searchType )
    } );

    return this.http.post ( '/rest/card/search', request, { params: params } )
      .pipe ( buildAll, this.logSearchPipe );
  }

  /**
   * Override the searchType's platform if necessary
   */
  private getPlatform ( searchType: SearchType ): PlatformType {
    // Start with search type's platform
    let platform = searchType.platform;

    // If INCOMM, and user's datasource is SEJ, override to SEJ
    if ( platform === PlatformType.INCOMM && this.securityService.getCurrentUser ().prefDefaultDataSource === PlatformType.SEJ ) {
      platform = PlatformType.SEJ;
    }

    return platform;
  }

  private logSearchPipe = map ( ( values: Card[] ) => {
    this.logger.info ( 'Completed Card Search', values );
    return values;
  } );

}
