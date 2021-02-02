import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import {
  MaplesCancelOrderRequest,
  MaplesHoldOrderRequest,
  MaplesOrder,
  MaplesOrderActionResponse,
  MaplesOrderItem,
  MaplesOrderShipment,
  MaplesOrderTransaction,
  MaplesPartner,
  MaplesPlatform,
  MaplesRefundOrderRequest,
  MaplesResendEmailRequest,
  MaplesResumeOrderRequest,
} from '@cscore/maples-client-model';
import {SearchTypeContainer} from '../search/search-type-container';
import {mapToObject} from '../utils/cca-utils';
import {SearchState} from '../search/search-state';
import {Store} from '@ngrx/store';
import {AppState} from '../../app-state';
import {snapshot} from '../store-utils/store-utils';
import {AppStateType} from '../../app-state-type.enum';
import * as _ from 'lodash';
import {SearchTypeType} from '../search/search-type/search-type-type.enum';
import {SearchParameterValueType} from '../search/search-type/search-parameter-value-type.enum';
import {Selection} from '../session/model/selection';
import {RequestQueryParam} from '../routing/request-query-param.enum';
import {ChangeOrderCardStatusRequest} from './change-order-card-status-request';
import {
  SetSelectionOrderRelatedJobsAction,
  SetSelectionOrderTransactionsAction,
  SetSelectionShipmentsAction
} from '../session/action/session-actions';
import {LoadOrderItemsForSelectionAction} from './action/order-actions';
import {CsCoreCurrencyUtil} from '@cscore/gringotts';
import {Logger} from '../../logging/logger.service';
import {CsCoreTimestamp} from '@cscore/core-client-model';
import {OrderRelatedJobView} from './order-related-job-view';
import {OrderCloseCardRelatedJobView} from './order-close-card-related-job-view';
import {PlatformType} from '../platform/platform-type.enum';
import {IdentifierType} from '../session/model/identifier-type.enum';
import {Identifier} from '../session/model/identifier';

const build = map ( value => value ? new MaplesOrder ( value ) : null );

const buildAll = map ( ( values: any[] ) => {
  let results: MaplesOrder[] = [];
  values.forEach ( value => results.push ( new MaplesOrder ( value ) ) );
  return results;
} );

const buildAllCancellationTasks = map ( ( values: any[] ) => {
  let results: OrderRelatedJobView[] = [];
  values.forEach(value => results.push(new OrderRelatedJobView(value)));
  return results;
} );

const buildAllItems = map ( ( values: any[] ) => {
  return values.map ( value => {
    const item = new MaplesOrderItem ( value );

    // TODO Remove this once MAPLES fixes subtotal on their side...
    if ( item.totals && item.totals.grandTotal && item.initialValue && (!item.totals.subtotal || item.totals.subtotal.value === 0) ) {
      let subtotalValue    = item.quantity * item.initialValue.value;
      let subtotal         = CsCoreCurrencyUtil.buildWithDescriptor ( subtotalValue, item.initialValue.descriptor );
      item.totals.subtotal = subtotal;

      let purchaseFees       = item.totals.purchaseFees ? item.totals.purchaseFees :
        CsCoreCurrencyUtil.buildWithDescriptor(0, item.initialValue.descriptor);
      let handlingFees       = item.totals.handlingFees ? item.totals.handlingFees :
        CsCoreCurrencyUtil.buildWithDescriptor(0, item.initialValue.descriptor);
      let grandTotal         = CsCoreCurrencyUtil.add ( subtotal, CsCoreCurrencyUtil.add(purchaseFees,handlingFees) );
      item.totals.grandTotal = grandTotal;
    }

    return item;
  } );
} );

const buildAllShipments = map ( ( values: any[] ) => {
  let results: MaplesOrderShipment[] = [];
  values.forEach ( value => results.push ( new MaplesOrderShipment ( value ) ) );
  return results;
} );

const buildTransactions = map ( ( values: any[] ) => {
  let results: MaplesOrderTransaction[] = [];
  values.forEach ( value => results.push ( new MaplesOrderTransaction ( value ) ) );
  return results;
} );

const buildCloseOrder = map((value: any) => new OrderCloseCardRelatedJobView(value));

const buildTransaction = map ( ( value: any ) => new MaplesOrderTransaction ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class OrderService {

  constructor ( private logger: Logger,
                private http: HttpClient,
                private store: Store<AppState> ) {
  }

  cancelOne ( orderId: string, request: MaplesCancelOrderRequest, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<any> {
    let params = this.buildParameters ( platform, partner);
    return this.http.put ( `/rest/order/${orderId}/cancel`, request, { params: params } );
  }

  changeCardStatus(orderId: string, request: ChangeOrderCardStatusRequest): Observable<OrderCloseCardRelatedJobView> {
    return this.http.put ( `/rest/order/${orderId}/card/status`, request )
      .pipe ( buildCloseOrder );
  }

  findAllRelatedJobs ( id: string, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<OrderRelatedJobView[]> {
    if (platform && platform === MaplesPlatform.ALDER) {
      return of([]);
    } else {
      let params = this.buildParameters ( platform, partner );
      return this.http.get ( `/rest/order/${id}/related-job`, { params: params } )
        .pipe ( buildAllCancellationTasks );
    }
  }

  findAllItemsByOrderId ( id: string, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<MaplesOrderItem[]> {
    let params = this.buildParameters ( platform, partner );
    return this.http.get ( `/rest/order/${id}/item`, { params: params } )
      .pipe ( buildAllItems );
  }

  findAllShipmentsByOrderId ( id: string, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<MaplesOrderShipment[]> {
    let params = this.buildParameters ( platform, partner );

    if (platform === MaplesPlatform.ALDER) {
      return of([]);
    } else {
      return this.http.get ( `/rest/order/${id}/shipment`, { params: params } )
        .pipe ( buildAllShipments );
    }
  }

  findOneById ( id: string, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<MaplesOrder> {
    let params = this.buildParameters ( platform, partner );

    return this.http.get ( `/rest/order/${id}`, { params: params } )
      .pipe ( build );
  }

  findOneByIdentifier ( identifier: Identifier, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<MaplesOrder> {
    if (identifier.type === IdentifierType.ORDER_ID) {
      return this.findOneById(identifier.value, platform, partner);
    } else if (identifier.type === IdentifierType.ORDER_NUMBER) {
      return this.findOneByNumber(identifier.value, partner);
    } else {
      this.logger.error(`Identifier type ${identifier.type} not supported for orders`);
      return of(null);
    }
  }

  findOneByNumber ( number: string, partner: MaplesPartner = null ): Observable<MaplesOrder> {
    let searchTypeType = partner ? SearchTypeType.BOL_ORDER : SearchTypeType.ECOMM_ORDER;

    let searchState: SearchState                 = snapshot ( this.store, AppStateType.SEARCH_STATE );
    let searchTypeContainer: SearchTypeContainer = _.find ( searchState.searchTypeContainers, function ( searchTypeContainer: SearchTypeContainer ) {
      return searchTypeContainer.searchType.type === searchTypeType;
    } );
    searchTypeContainer.parameters.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.ORDER_NUMBER, number );
    if ( partner ) {
      searchTypeContainer.parameters.set ( SearchParameterValueType.BOL_PARTNER, partner );
    }

    return this.search ( searchTypeContainer, partner )
      .pipe ( map ( ( orders: MaplesOrder[] ) => {
        if ( orders.length === 1 ) {
          return orders[ 0 ];
        } else {
          throw new Error ( 'Expected single result from Order lookup' );
        }
      } ) );
  }

  findTransactions ( orderId: string, platform: MaplesPlatform, partner: MaplesPartner = null ): Observable<MaplesOrderTransaction[]> {
    if (platform === MaplesPlatform.ALDER) {
      return of([]);
    }
    let params = new HttpParams ()
      .set ( RequestQueryParam.PARTNER, partner );

    return this.http.get<MaplesOrderTransaction[]> ( `/rest/order/${orderId}/transaction`, { params: params } ).pipe ( buildTransactions );
  }

  holdOne ( orderId: string, request: MaplesHoldOrderRequest, platform: MaplesPlatform = null, partner: MaplesPartner = null ): Observable<any> {
    let params = this.buildParameters ( platform, partner );

    return this.http.put ( `/rest/order/${orderId}/hold`, request, { params: params } );
  }

  loadCancellationTasks ( selection: Selection<MaplesOrder> ): Observable<void> {
    return this.findAllRelatedJobs ( selection.getOrder ().id, selection.getMaplesPlatform() )
      .pipe (
        catchError(() => of([] as OrderRelatedJobView[])),
        tap ( tasks => {
          selection.relatedJobs = tasks;
          if ( selection.id ) {
            this.store.dispatch(new SetSelectionOrderRelatedJobsAction(selection));
          }
        } ),
        mapTo ( null )
      );
  }

  loadItemsAndShipments ( selection: Selection<MaplesOrder> ): Observable<void> {
    return forkJoin ([
      this.findAllItemsByOrderId ( selection.getOrder ().id, selection.getMaplesPlatform(), selection.simplePartner )
        .pipe ( catchError ( () => of ( [] as MaplesOrderItem[] ) ) ),
      this.findAllShipmentsByOrderId ( selection.getOrder ().id, selection.getMaplesPlatform(), selection.simplePartner )
        .pipe ( catchError ( () => of ( [] as MaplesOrderShipment[] ) ) ),
      this.findTransactions(selection.getOrder ().id, selection.getMaplesPlatform(), selection.simplePartner)
        .pipe ( catchError ( () => of ( [] as MaplesOrderTransaction[] ) ) )
    ]).pipe (
      tap ( ( [ items, shipments, transactions ] ) => {
        selection.orderItems     = items;
        selection.orderShipments = shipments;
        selection.orderTransactions = transactions;
        if ( selection.id && selection.platform !== PlatformType.ALDER) {
          this.linkCardsToShipments(selection);
          this.store.dispatch ( new LoadOrderItemsForSelectionAction ( selection ) );
          this.store.dispatch ( new SetSelectionShipmentsAction ( selection ) );
          this.store.dispatch ( new SetSelectionOrderTransactionsAction ( selection ) );
        }
      } ),
      mapTo ( null ),
    );
  }

  loadSecondaryOrderData ( selection: Selection<MaplesOrder> ): Observable<void> {
    if ( selection.getOrder () ) {
      return forkJoin (
        this.loadItemsAndShipments ( selection ),
        this.loadCancellationTasks ( selection ),
      ).pipe (
        mapTo ( null ),
      );
    } else {
      this.logger.warn ( 'Skipping secondary data load for order since the order data wasn\'t found' );
      return of ( null );
    }
  }

  refundOne ( orderId: string, request: MaplesRefundOrderRequest, platform: MaplesPlatform, partner: MaplesPartner = null ): Observable<null> {
    let params = this.buildParameters ( platform, partner );
    return this.http.put<null> ( `/rest/order/${orderId}/refund`, request, { params: params } );
  }

  resendDeliveryEmail ( orderNumber: string, partner: MaplesPartner = null ): Observable<ResendDeliveryEmailResponse> {
    let params = this.buildParameters ( null, partner );
    return this.http.post<null> ( `/rest/order/${orderNumber}/notifications/resend-delivery-email`, null, { params: params } );
  }

  resendEmail ( emailRefId: string, request: MaplesResendEmailRequest, platform: MaplesPlatform, partner: MaplesPartner = null ): Observable<MaplesOrderActionResponse> {
    let params = this.buildParameters ( platform, partner );
    return this.http.post<null> ( `/rest/order/resend-email/${emailRefId}`, request, { params: params } );
  }

  resumeOne ( orderId: string, request: MaplesResumeOrderRequest, partner: MaplesPartner = null ): Observable<any> {
    let params = this.buildParameters ( null, partner );
    return this.http.put ( `/rest/order/${orderId}/resume`, request, { params: params } );
  }

  search ( searchTypeContainer: SearchTypeContainer, partner: MaplesPartner = null ): Observable<MaplesOrder[]> {
    let params = this.buildParameters ( searchTypeContainer.searchType.getMaplesPlatform(), partner );

    return this.http.post ( '/rest/order/search', mapToObject ( searchTypeContainer.parameters ), { params: params } )
      .pipe ( buildAll );
  }

  private buildParameters ( platform: MaplesPlatform, partner: MaplesPartner ): HttpParams {
    let params = new HttpParams ();
    if (platform) {
      params = params.set ( RequestQueryParam.PLATFORM, platform );
    }
    if ( partner ) {
      params = params.set ( RequestQueryParam.PARTNER, partner );
    }
    return params;
  }

  private linkCardsToShipments(selection: Selection<MaplesOrder>): void {
    selection.getAllCardsInOrder().forEach(card => {
      card.shipment = selection.getShipmentForCard(card);
    });
  }
}

export class ResendDeliveryEmailResponse {
  code: string;
  errorMessage: string;
  resendEmailId: number;
  resendEmailRequestDateTime: CsCoreTimestamp;
}
