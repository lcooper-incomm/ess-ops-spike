import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {flatMap, map} from "rxjs/operators";
import {
  MaplesCard,
  MaplesCardChangeStatusRequest,
  MaplesCardCode,
  MaplesCardReplacementRequest,
  MaplesCardReplacementResponse,
  MaplesPlatform,
  MaplesResultMessageResponse
} from "@cscore/maples-client-model";
import {Logger} from "../../logging/logger.service";
import {Card} from "./card";
import {Selection} from "../session/model/selection";
import {Identifier} from "../session/model/identifier";
import {IdentifierType} from "../session/model/identifier-type.enum";
import {PlatformType} from "../platform/platform-type.enum";
import * as _ from "lodash";
import {RequestQueryParam} from "../routing/request-query-param.enum";
import {OrderCardRequest} from "../../services/services/order-new-card/order-card-request-models";
import {RegisterVmsCardResponse} from "../action/vms-actions/models/vms-response-models";
import {GenericOption} from '../model/generic-option';

const build = map ( value => new Card ( value ) );

const buildRegisterVmsCardResponse = map ( value => new RegisterVmsCardResponse ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Card[] = [];
  values.forEach ( value => results.push ( new Card ( value ) ) );
  return results;
} );

const buildAllCodes = map ( ( values: any[] ) => {
  let results: MaplesCardCode[] = [];
  values.forEach ( value => results.push ( new MaplesCardCode ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CardService {

  constructor ( private http: HttpClient,
                private logger: Logger ) {
  }

  decryptFsapiPan ( customerId: string, maskedPan: string ): Observable<string> {
    return this.http.get ( `/rest/customer/${customerId}/pan/${maskedPan}/unmask` )
      .pipe ( map ( ( response: any ) => {
        return response.pan;
      } ) );
  }

  decryptGreencardPan ( encryptedPan: string ): Observable<string> {
    let request = {
      identifier: encryptedPan
    };

    return this.http.post ( '/rest/card/pan/unmask', request )
      .pipe ( map ( ( response: any ) => {
        return response.message;
      } ) );
  }

  decryptSrlPan ( serialNumber: string, platform: PlatformType, controlNumber: string ): Observable<string> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform )
      .set ( RequestQueryParam.CONTROL_NUMBER, controlNumber );

    return this.http.get ( `/rest/card/pan/unmask/${serialNumber}`, { params: params } )
      .pipe ( map ( ( response: any ) => {
        return response.message;
      } ) );
  }

  findOne ( identifierType: IdentifierType, identifier: string, platform: PlatformType ): Observable<Card> {
    return this.search ( identifierType, identifier, platform )
      .pipe ( map ( ( results: Card[] ) => {
        if ( results.length === 1 ) {
          return results[ 0 ];
        } else {
          this.logger.error ( 'Expected single result from Card lookup', results );
          return null;
        }
      } ) );
  }

  findOneFromIdentifier ( identifier: Identifier, platform: PlatformType = null ): Observable<Card> {
    if ( !platform ) {
      platform = identifier.platform;
    }
    return this.findOne ( identifier.type, identifier.value, platform );
  }

  findOneFromSelection ( selection: Selection<any> ): Observable<Card> {
    //If this is an SRL product, the lookup is actually done in two steps
    if ( selection.platform === PlatformType.SRL ) {
      return this.loadSrlCardFromSelection ( selection );
    } else {
      return this.findOneFromIdentifier ( selection.getPrimaryIdentifier (), selection.platform );
    }
  }

  orderNewCard ( request: OrderCardRequest, partner ): Observable<RegisterVmsCardResponse> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PARTNER, partner )
      .set ( RequestQueryParam.PLATFORM, PlatformType.VMS );

    return this.http.post ( '/rest/card/orderNewCard', request, { params: params } )
      .pipe ( buildRegisterVmsCardResponse );
  }

  search ( identifierType: IdentifierType, identifier: string, platform: PlatformType ): Observable<Card[]> {
    let request = {
      identifierType: identifierType,
      identifier: identifier,
      platform: platform
    };

    return this.http.post ( '/rest/card/search', request )
      .pipe ( buildAll );
  }

  searchFromIdentifier ( identifier: Identifier ): Observable<Card[]> {
    return this.search ( identifier.type, identifier.value, identifier.platform );
  }

  private loadSrlCardFromSelection ( selection: Selection<any> ): Observable<Card> {
    //In SRL, we expect to have a reverse VRN identifier of some kind AND a serial number identifier
    let primaryIdentifier: Identifier = selection.getIdentifierByType ( IdentifierType.REVERSEVRNBYCONTROLNUMBER );
    if ( !primaryIdentifier ) {
      primaryIdentifier = selection.getIdentifierByType ( IdentifierType.REVERSEVRN );
    }

    let serialNumberIdentifier: Identifier = selection.getIdentifierByType ( IdentifierType.SERIALNUMBER );

    if ( !primaryIdentifier || !serialNumberIdentifier ) {
      this.logger.error ( 'Expected both a Reverse VRN and a Serial Number Identifier for an SRL lookup!', selection );
      throw new Error ( 'Expected both a Reverse VRN and a Serial Number Identifier for an SRL lookup!' );
    }

    //First, search by primary identifier
    return this.searchFromIdentifier ( primaryIdentifier )
      .pipe ( flatMap ( ( results: Card[] ) => {
        if ( results.length ) {
          //Make sure our expected serialNumber exists somewhere in those results
          let srlResult = _.find ( results, function ( card: Card ) {
            return card.identifiers.serialNumber === serialNumberIdentifier.value;
          } );
          if ( !srlResult ) {
            this.logger.error ( 'No SRL Search Result found for SRL lookup matching expected Serial Number!', serialNumberIdentifier.value, results );
            throw new Error ( 'No SRL Search Result found for SRL lookup matching expected Serial Number!' );
          }

          //Now look up the InComm record by Serial Number, and merge the two together
          return this.findOneFromIdentifier ( serialNumberIdentifier )
            .pipe ( map ( ( result: Card ) => {
              result.srlData = srlResult;
              return result;
            } ) );
        } else {
          return of ( null );
        }
      } ) );
  }

  getCardStatusOptions(cardStatus: string): GenericOption<any>[] {
    let statuses: GenericOption<any>[] = [
      {value: 'Closed', displayValue: 'Closed'},
      {value: 'Locked', displayValue: 'Locked'},
      {value: 'PFraud', displayValue: 'PFraud'},
      {value: 'ChargeOff', displayValue: 'Charge-Off'},
      {value: 'PendingActivation', displayValue: "Pending Activation"},
      {value: 'Open', displayValue: 'Open'}
    ];

    cardStatus = cardStatus.toLowerCase();
    if (cardStatus === 'open') {
      return statuses.filter((status) => status.value !== 'Open');
    } else if (cardStatus === 'pfraud') {
      return statuses.filter((status) => status.value !== 'PFraud');
    } else if (cardStatus === 'locked') {
      return statuses.filter((status) => status.value !== 'Locked');
    } else if (cardStatus === 'closed') {
      return statuses.filter((status) => status.value !== 'Closed');
    } else if (cardStatus === 'chargeoff') {
      return statuses.filter((status) => status.value !== 'ChargeOff');
    } else if (cardStatus === 'pendingactivation') {
      return [{value: 'Activate', displayValue: 'Activate'}];
    } else {
      return [];
    }
  }

  findCardStatusCodes(platform: MaplesPlatform): Observable<MaplesCardCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post('/rest/card/codes', {type: 'CARD_STATUS'}, {params: params})
      .pipe(buildAllCodes);
  }

  findCardIdForAccount(accountId: string, platform: MaplesPlatform): Observable<string> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.get<MaplesCard>(`/rest/card/cardId/${accountId}`, {params: params})
      .pipe(map((card: MaplesCard) => card.id));
  }

  findCardStatusReasonById(cardStatusId: string, platform: MaplesPlatform): Observable<MaplesCardCode[]> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post('/rest/card/codes', {
      type: 'CARD_STATUS_REASONS',
      cardStatusId: cardStatusId
    }, {params: params})
      .pipe(buildAllCodes);
  }

  changeCardStatus(cardId: string, request: MaplesCardChangeStatusRequest, platform: MaplesPlatform): Observable<MaplesResultMessageResponse> {
    const params: HttpParams = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.post ( `/rest/card/${cardId}/status`, request, { params: params } )
      .pipe(
        map((value: any) => new MaplesResultMessageResponse(value))
      );
  }

  replaceCard(cardId: string, request: MaplesCardReplacementRequest, platform: MaplesPlatform): Observable<MaplesCardReplacementResponse> {
    const params: HttpParams = new HttpParams()
      .set(RequestQueryParam.PLATFORM, platform);

    return this.http.post(`/rest/card/${cardId}/replace`, request, {params: params})
      .pipe(
        map((value: any) => new MaplesCardReplacementResponse(value))
      );
  }
}
