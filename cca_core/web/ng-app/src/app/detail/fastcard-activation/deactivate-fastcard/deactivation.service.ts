import {Injectable} from '@angular/core';
import {CreditingOption, ApsLocation} from '../aps/aps-models';
import {Observable, of} from 'rxjs';
import {ApsService} from '../aps/aps.service';
import {map} from 'rxjs/operators';
import {HierarchyService} from 'src/app/core/node/hierarchy/hierarchy.service';
import {SecurityService} from 'src/app/core/security/security.service';
import {ShortPayService} from 'src/app/core/short-pay/short-pay.service';
import {Card} from 'src/app/core/card/card';
import {Permission} from 'src/app/core/auth/permission';
import {Hierarchy} from 'src/app/core/node/hierarchy/hierarchy';
import {GenericOption} from 'src/app/core/model/generic-option';
import {NodeType} from 'src/app/core/node/node-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DeactivationService {

  constructor(
    private hierarchyService: HierarchyService,
    private securityService: SecurityService,
    private shortPayService: ShortPayService,
  ) {
  }

  public getActivationApsLocation(card: Card): Observable<ApsLocation> {
    return this.getCardHeirarchy(card).pipe(map(ApsService.getApsLocationFromHierarchy));
  }

  public getIncommApsLocation(): ApsLocation | null {
    //Only return values if the user has permission for this
    const hasOverridePermission = this.securityService.hasPermission(Permission.OVERRIDE_BILLABLE);
    return hasOverridePermission ? ApsService.getIncommApsLocation() : null;
  }

  public getShortPayApsLocation(merchantLegacyId: string): Observable<ApsLocation> {

    return this.shortPayService.findByLegacyMerchantId(merchantLegacyId).pipe(map(shortPay => {
      if (shortPay) {
        return {
          locationName: shortPay.locationName,
          merchantId: shortPay.merchantId,
          merchantName: shortPay.merchantName,
          terminalNumber: shortPay.terminalNumber,
        };
      }
    }));
  }

  private getCardHeirarchy(card: Card): Observable<Hierarchy> {
    // First, try the purchase location
    if (card.purchaseLocation && card.purchaseLocation.hierarchy) {
      return of(card.purchaseLocation.hierarchy);
    }

    //If we have activation info and it was activated at a terminal, proceed to find purchase location
    if (!card
      || !card.activation
      || !card.activation.entity
      || !card.activation.entity.id
      || !card.activation.entity.type
      || card.activation.entity.type !== NodeType.TERMINAL) {
      return of(null);
    }

    return this.hierarchyService.findOne('TERMINAL', card.activation.entity.id);
  }

  public static getDeactivationCreditingOptions(): GenericOption<CreditingOption>[] {
    return [
      {
        value: CreditingOption.ACTIVATING_LOCATION,
        displayValue: 'Activating Location (Billable)',
      },
      {
        value: CreditingOption.INCOMM,
        displayValue: 'InComm (Non-Billable)',
      }
    ];
  }

  public static getDeactivationReasons(): string[] {
    return [
      'Consumer Fraud',
      'Consumer Refund',
      'Merchant Fraud',
      'Merchant Refund',
    ];
  }
}
