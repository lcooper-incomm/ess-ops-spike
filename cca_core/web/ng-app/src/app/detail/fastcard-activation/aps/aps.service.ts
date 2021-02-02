import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ActivateFastcardRequest, DeactivateFastcardRequest, ApsRequest } from './aps-request';
import { BillableOption, ApsLocation, SimpleIdentifier } from './aps-models';
import * as _ from "lodash";
import { GenericOption } from 'src/app/core/model/generic-option';
import { IdentifierType } from 'src/app/core/session/model/identifier-type.enum';
import { Hierarchy } from 'src/app/core/node/hierarchy/hierarchy';
import { Selection } from 'src/app/core/session/model/selection';
import { Location } from 'src/app/core/node/location/location';
import { Card } from 'src/app/core/card/card';

@Injectable ( {
  providedIn: 'root'
} )
export class ApsService {
  constructor ( private http: HttpClient ) {
  }

  public activateCard ( request: ActivateFastcardRequest, merchantId?: string,platform? : string  ): Observable<any> {
    return this.request ( `/rest/aps/apsAction/activate`, request, merchantId,platform );
  }

  public deactivateCard ( request: DeactivateFastcardRequest, merchantId?: string, platform? : string ): Observable<any> {
    return this.request ( `/rest/aps/apsAction/deactivate`, request, merchantId,platform );
  }

  private request ( path: string, request: ApsRequest, merchantId?: string,platform?: string ): Observable<any> {
    if ( request ) {
      const params = new HttpParams ().set ( 'merchantId', merchantId )
                                      .set('platform',platform)  ;
      return this.http.post ( path, request, { params } );
    }
  }

  public static getActivationIdentifierTypeOption ( identifierType: IdentifierType ): GenericOption<IdentifierType> {
    return {
      displayValue: ApsService.getIdentifierTypeLabel ( identifierType ),
      value: identifierType,
    };
  }

  public static getActivationIdentifierTypeOptions (): GenericOption<IdentifierType>[] {
    const types = [
      IdentifierType.VAN,
      IdentifierType.SERIALNUMBER,
      IdentifierType.PIN,
    ];
    return types.map ( ApsService.getActivationIdentifierTypeOption );
  }

  public static getActivationBillingOptions (): GenericOption<BillableOption>[] {
    return [
      {
        value: BillableOption.BILLABLE,
        displayValue: 'Billable',
      },
      {
        value: BillableOption.NON_BILLABLE,
        displayValue: 'Non-Billable',
      }
    ];
  }

  public static getActivationReasons (): string[] {
    return [
      'Activation Issue',
      'Technical Issue',
      'Replacement PIN',
    ];
  }

  public static getApsLocationFromHierarchy ( hierarchy: Hierarchy ): ApsLocation {
    const merchant = _.last ( hierarchy.merchants );

    return {
      locationName: hierarchy.location.name,
      merchantId: merchant.id,
      merchantLegacyId: merchant.legacyId,
      merchantName: merchant.name,
      terminalNumber: hierarchy.terminal && hierarchy.terminal.terminalNumber,
    };
  }

  public static getApsLocationFromSelection ( selection: Selection<Location> ): ApsLocation {
    return {
      ...ApsService.getApsLocationFromHierarchy ( selection.hierarchy ),
      terminalNumber: selection.terminals[ 0 ] && selection.terminals[ 0 ].terminalNumber
    };
  }

  public static getBestIdentifierCombo ( card: Card ): SimpleIdentifier | null {
    if ( card.identifiers.serialNumber ) {
      return {
        identifierType: IdentifierType.SERIALNUMBER,
        identifier: card.identifiers.serialNumber,
      };
    } else if ( card.identifiers.van ) {
      return {
        identifierType: IdentifierType.VAN,
        identifier: card.identifiers.van,
      };
    } else {
      return null;
    }
  }

  public static getIncommApsLocation (): ApsLocation {
    return {
      locationName: 'DOTSFraudLoc',
      merchantName: 'InComm Corporate',
      terminalNumber: 'DOTSFraudTerm',
    };
  }

  private static getIdentifierTypeLabel ( identifierType: IdentifierType ): string {
    switch ( identifierType ) {
      case IdentifierType.PIN:
        return 'PIN';
      case IdentifierType.SERIALNUMBER:
        return 'Serial Number';
      case IdentifierType.VAN:
        return 'VAN 16';
      default:
        return 'Card Number';
    }
  }
}
