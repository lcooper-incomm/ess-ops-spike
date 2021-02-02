import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MaplesAccount } from '@cscore/maples-client-model';
import { Logger } from '../../logging/logger.service';
import { mapToObject } from '../utils/cca-utils';
import { SearchParameterValueType } from './search-type/search-parameter-value-type.enum';
import { SearchTypeContainer } from './search-type-container';

const buildAll = map ( ( values: any[] ) => values.map ( value => new MaplesAccount ( value ) ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerAccountSearchService {
  private static basePath: string = '/rest/customer-account';

  constructor (
    private http: HttpClient,
    private logger: Logger,
  ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<MaplesAccount[]> {
    const request = mapToObject ( searchTypeContainer.parameters );
    const headers = new HttpHeaders ().set ( 'cca-query', JSON.stringify ( request ) );
    const params  = new HttpParams ().set ( SearchParameterValueType.PLATFORM, searchTypeContainer.searchType.platform );

    return this.http.get ( `${CustomerAccountSearchService.basePath}/search`, { headers, params } )
      .pipe ( buildAll, this.logSearchPipe );
  }

  private logSearchPipe = map ( ( values: MaplesAccount[] ) => {
    this.logger.info ( 'Completed Customer Account Search', values );
    return values;
  } );
}
