import { Injectable } from '@angular/core';
import { map, tap, mapTo } from "rxjs/operators";
import { Customer } from "./customer";
import { HttpClient, HttpParams } from "@angular/common/http";
import { getPlatformTypeDisplayValue, PlatformType } from "../platform/platform-type.enum";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { Card } from "../card/card";
import * as _ from "lodash";
import { Selection } from "../session/model/selection";
import { RoutingService } from "../routing/routing.service";
import { UrlQueryParam } from "../routing/url-query-param.enum";
import { Partner } from "../session/selection/partner";
import { SetDockSelectionsTabSelectionSelectedCardAction } from "../dock/dock/selections-tab/dock-selections-tab-actions";
import { SessionState } from "../session/session-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { SelectionType } from "../session/model/selection-type.enum";
import { SetSelectionSelectedCardAction, SetSelectionFeePlansAction } from '../session/action/session-actions';
import { Observable } from 'rxjs';
import { FsapiGenericResponse } from "../model/fsapi-generic-response";
import { UpdateAccountRequest } from "./update-account-request";
import { FsapiReplaceCardRequest } from "../../detail/selection-action-toolbar/replace-fsapi-card-wizard/fsapi-replace-card-request";
import {
  FsapiAdjustBalanceRequest,
  DisputeDetailTransaction,
  ModifiedUpdateCardStatusRequest,
  RaiseDisputeRequest,
  RegisterVmsCardRequest,
  UpdateDeviceStatusRequest,
  UpdateTransactionRequest,
  VmsReleasePreauthRequest,
  VmsReverseFeeRequest
} from '../action/vms-actions/models/vms-request-models';
import {
  FsapiAdjustBalanceResponse,
  RaiseDisputeResponse,
  RegisterVmsCardResponse,
} from '../action/vms-actions/models/vms-response-models';
import { SendDisputeDocumentTask } from '../model/minion/task/send-dispute-document-task';
import { TaskResponse } from '../model/minion/task-response';
import { DeliveryMethodCode } from '../model/minion/task/delivery-method';
import { FeePlan } from '../model/fee-plan';
import { CustomerFeePlanService } from './customer-fee-plan.service';
import { FsapiStatusType } from '../status/fsapi-status/fsapi-status-type.enum';

const build = ( platform: PlatformType ) => map ( value => new Customer ( value, platform ) );

const buildFsapiGeneric            = map ( value => new FsapiGenericResponse ( value ) );
const buildFsapiAdjustBalance      = map ( value => new FsapiAdjustBalanceResponse ( value ) );
const buildRegisterVmsCardResponse = map ( value => new RegisterVmsCardResponse ( value ) );
const buildTaskResponse            = map ( value => new TaskResponse ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerService {
  static readonly basePath = '/rest/customer';

  constructor (
    private feePlanService: CustomerFeePlanService,
    private http: HttpClient,
    private routingService: RoutingService,
    private store: Store<AppState>,
  ) {
  }

  adjustBalance ( customerId: string, request: FsapiAdjustBalanceRequest ): Observable<FsapiAdjustBalanceResponse> {
    return this.http.post ( `${CustomerService.basePath}/${customerId}/adjustBalance`, request ).pipe ( buildFsapiAdjustBalance );
  }

  changeCardStatus ( customerId: string, request: ModifiedUpdateCardStatusRequest ): Observable<FsapiGenericResponse> {
    return this.http.put ( `${CustomerService.basePath}/${customerId}/updateStatus`, request )
      .pipe ( buildFsapiGeneric );
  }

  findOneById ( id: string, platform: PlatformType, partner: Partner ): Observable<Customer> {
    let params: HttpParams = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform )
      .set ( RequestQueryParam.PARTNER, partner.type );

    return this.http.get ( `${CustomerService.basePath}/${id}`, { params: params } )
      .pipe ( build ( platform ) );
  }

  loadSecondaryCustomerData ( selection: Selection<Customer> ): Observable<void> {
    return this.feePlanService.findAllByCustomerId ( selection.getCustomer ().id, selection.platform, selection.partner.type )
      .pipe (
        tap ( ( feePlans: FeePlan[] ) => {
          selection.feePlans = feePlans;
          this.store.dispatch ( new SetSelectionFeePlansAction ( selection ) );
        } ),
        mapTo ( null ),
      );
  }

  raiseDispute ( customerId: string, request: RaiseDisputeRequest ): Observable<RaiseDisputeResponse> {
    return this.http.post<RaiseDisputeResponse> ( `${CustomerService.basePath}/${customerId}/raiseDispute`, request );
  }

  registerCard (
    customerId: string,
    request: RegisterVmsCardRequest,
    platform: PlatformType,
    partner: Partner,
    createSession: boolean = false,
  ): Observable<RegisterVmsCardResponse> {
    const params: HttpParams = new HttpParams ()
      .set ( 'createSession', createSession.toString () )
      .set ( RequestQueryParam.PLATFORM, platform )
      .set ( RequestQueryParam.PARTNER, partner.type );

    return this.http.post ( `${CustomerService.basePath}/${customerId}/registerCard`, request, { params } )
      .pipe ( buildRegisterVmsCardResponse );
  }

  releasePreauth ( customerId: string, platform: PlatformType, request: VmsReleasePreauthRequest ): Observable<FsapiGenericResponse> {
    const params = { platform };
    return this.http.post ( `${CustomerService.basePath}/${customerId}/releasePreauth`, request, { params } )
      .pipe ( buildFsapiGeneric );
  }

  resendDisputeDocuments (
    request: DisputeDetailTransaction,
    deliveryMethod: DeliveryMethodCode,
    deliveryValue: string | null,
    partner: Partner,
    platform: PlatformType,
  ): Observable<TaskResponse> {
    const params: HttpParams = new HttpParams ()
      .set ( 'deliveryMethod', deliveryMethod )
      .set ( 'deliveryValue', deliveryValue )
      .set ( RequestQueryParam.PLATFORM, platform )
      .set ( RequestQueryParam.PARTNER, partner.type );
    return this.http
      .post ( `${CustomerService.basePath}/resendDisputeDocuments`, request, { params } )
      .pipe ( buildTaskResponse );
  }

  resetOnlinePassword ( customerId: string, request: UpdateAccountRequest ): Observable<FsapiGenericResponse> {
    return this.http.post ( `${CustomerService.basePath}/${customerId}/resetOnlinePassword`, request )
      .pipe ( buildFsapiGeneric );
  }

  reverseFee ( customerId: string, request: VmsReverseFeeRequest ): Observable<FsapiAdjustBalanceResponse> {
    return this.http
      .post ( `${CustomerService.basePath}/${customerId}/reverseFee`, request )
      .pipe ( buildFsapiAdjustBalance );
  }

  setQueryParamForCard(card: Card): void {
    this.routingService.setQueryParam ( UrlQueryParam.DETAILS_LAST_FOUR, card.identifiers.pan.slice ( -4 ) );
  }

  sendDisputeDocumentation ( request: SendDisputeDocumentTask ): Observable<TaskResponse> {
    return this.http
      .post ( `${CustomerService.basePath}/sendDisputeDocumentation`, request )
      .pipe ( buildTaskResponse );
  }

  setSelectedCardForSelection ( selection: Selection<Customer>, card: Card = null ): void {
    if ( !card ) {
      card = this.getSelectedCardForCustomer ( selection.getCustomer (), selection.platform );
    }
    selection.selectedCard = card;
    this.store.dispatch ( new SetSelectionSelectedCardAction ( selection ) );
    this.store.dispatch ( new SetDockSelectionsTabSelectionSelectedCardAction ( selection ) );

    //Only update the query parameter if this card belongs to the current selection
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    if ( sessionState.selection
      && sessionState.selection.type === SelectionType.CUSTOMER
      && sessionState.selection.getCustomer ()
      && sessionState.selection.getCustomer ().cards ) {
      let isSelectionOwnerOfCard = _.find ( sessionState.selection.getCustomer ().cards, function ( selectionCard: Card ) {
        return selectionCard.identifiers.pan === card.identifiers.pan;
      } );
      if ( isSelectionOwnerOfCard ) {
        this.setQueryParamForCard(card);
      }
    }
  }

  updateDeviceStatus ( customerId: string, request: UpdateDeviceStatusRequest ): Observable<FsapiGenericResponse> {
    return this.http
      .put ( `${CustomerService.basePath}/${customerId}/device`, request )
      .pipe ( buildFsapiGeneric );
  }

  updateAccount ( customerId: string, request: UpdateAccountRequest ): Observable<FsapiGenericResponse> {
    return this.http.put ( `${CustomerService.basePath}/${customerId}`, request )
      .pipe ( buildFsapiGeneric );
  }

  updateTransaction ( customerId: string, request: UpdateTransactionRequest ): Observable<FsapiGenericResponse> {
    return this.http.put ( `${CustomerService.basePath}/${customerId}/transaction`, request )
      .pipe ( buildFsapiGeneric );
  }

  private getSelectedCardForCustomer ( customer: Customer, platform: PlatformType ): Card {
    let card: Card;

    if ( customer && customer.cards.length ) {
      //First, try to find a card matching the last-four query param, if present
      let lastFour = this.routingService.getQueryParam ( UrlQueryParam.DETAILS_LAST_FOUR );
      if ( lastFour ) {
        card = _.find ( customer.cards, function ( card: Card ) {
          let cardLastFour = card.identifiers.pan ? card.identifiers.pan.slice ( -4 ) : null;
          return cardLastFour === lastFour;
        } );
      }

      //Then, try to find the active-ish card (the first one that isn't INACTIVE, CLOSED, or EXPIRED)
      if ( !card ) {
        card = _.find ( customer.cards, function ( card: Card ) {
          let status = card.getStatusByPlatform ( platform );
          return status
            && status.name !== FsapiStatusType.INACTIVE
            && status.name !== FsapiStatusType.CLOSED
            && status.name !== FsapiStatusType.EXPIRED;
        } );
      }

      //Finally, just pick the first available card...
      if ( !card ) {
        card = customer.cards[ 0 ];
      }
    }

    return card;
  }

  replaceCard ( customerId: string, request: FsapiReplaceCardRequest ): Observable<FsapiGenericResponse> {
    return this.http.post ( `/rest/customer/${customerId}/replaceCard`, request )
      .pipe ( buildFsapiGeneric );
  }

  public toggleOneTimeFraudOverride ( customerId: string ): Observable<any> {
    const options = {
      params: {
        yawnerPlatform: getPlatformTypeDisplayValue ( PlatformType.VMS )
      }
    };
    // TODO: this endpoint does not exist yet. Doesn't have to be this exactly.
    //  At least try and make the name shorter
    return this.http.put ( `${CustomerService.basePath}/${customerId}/toggle-one-time-fraud-override`, null, options );
  }
}
