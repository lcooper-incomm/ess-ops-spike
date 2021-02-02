import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MaplesCustomer} from '@cscore/maples-client-model';
import {Logger} from '../../logging/logger.service';
import {SearchTypeContainer} from './search-type-container';
import {mapToObject} from '../utils/cca-utils';
import {SearchParameterValueType} from './search-type/search-parameter-value-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MaplesCustomerSearchService {

  constructor(private http: HttpClient,
              private logger: Logger) {
  }

  search(searchTypeContainer: SearchTypeContainer): Observable<MaplesCustomer[]> {
    let request = mapToObject(searchTypeContainer.parameters);
    let params  = new HttpParams()
      .set(SearchParameterValueType.PLATFORM, searchTypeContainer.searchType.platform);

    return this.http.post('/rest/maples-customer/search', request, {params: params})
      .pipe(
        map((values: any[]) => {
          return values.map(value => new MaplesCustomer(value));
        }),
        map((values: MaplesCustomer[]) => {
          this.logger.info('Completed Customer Search', values);
          return values;
        }));
  }
}
