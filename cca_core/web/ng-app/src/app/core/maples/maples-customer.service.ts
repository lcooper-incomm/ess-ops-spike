import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {MaplesCustomer, MaplesIdentificationType, MaplesPlatform} from '@cscore/maples-client-model';
import {SearchParameterValueType} from '../search/search-type/search-parameter-value-type.enum';
import {Selection} from '../session/model/selection';
import {Logger} from '../../logging/logger.service';
import {SetSelectionMaplesCustomerOrderAction} from '../session/action/session-actions';
import {OrderService} from '../order/order.service';
import {SearchTypeContainer} from '../search/search-type-container';
import {SearchType} from '../search/search-type/search-type';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-state';

@Injectable({
  providedIn: 'root'
})
export class MaplesCustomerService {
  private basePath: string = '/rest/maples-customer';

  constructor(private orderService: OrderService,
              private store: Store<AppState>,
              private http: HttpClient,
              private logger: Logger) {
  }

  findOneById(id: string, platform: MaplesPlatform): Observable<MaplesCustomer> {
    let params = new HttpParams()
      .set(SearchParameterValueType.PLATFORM, platform);

    return this.http.get(`${this.basePath}/${id}`, {params: params})
      .pipe(
        map((value: any) => {
          return new MaplesCustomer(value);
        })
      );
  }

  loadSecondaryCustomerData(selection: Selection<MaplesCustomer>): Observable<void> {
    if (selection.getOrder()) {
      return forkJoin(
        this.loadOrders(selection)
      ).pipe(
        mapTo(null),
      );
    } else {
      this.logger.warn('Skipping secondary data load for order since the order data wasn\'t found');
      return of(null);
    }
  }

  loadOrders(selection: Selection<MaplesCustomer>): Observable<void> {
    let search: SearchTypeContainer = new SearchTypeContainer(new SearchType({platform: selection.platform}));
    search.parameters.set('customerNumber', selection.getMaplesCustomer().getIdentification(MaplesIdentificationType.MEMBER_EXT_NUMBER));
    return this.orderService.search(search)
      .pipe(
        tap(orders => {
          selection.orders = orders;
          this.store.dispatch(new SetSelectionMaplesCustomerOrderAction(selection));
        }),
        catchError(() => of([])),
        mapTo(null),
      );
  }
}
