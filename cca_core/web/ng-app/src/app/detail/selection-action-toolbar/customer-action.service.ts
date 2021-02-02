import {Injectable} from '@angular/core';
import {Session} from "../../core/session/model/session";
import {Selection} from "../../core/session/model/selection";
import {forkJoin, Observable, of} from "rxjs";
import {ActionToolbarButtonStatus} from "../../core/action-toolbar/action-toolbar-button-status";
import {SecurityService} from "../../core/security/security.service";
import {WizardRunner} from "../../core/wizard/wizard-runner/wizard-runner.service";
import {ActionService} from "./action-service";
import {PlatformType} from "../../core/platform/platform-type.enum";
import {Permission} from "../../core/auth/permission";
import {Card} from "../../core/card/card";
import {FsapiStatusType, getStatusTypeDisplayName} from '../../core/status/fsapi-status/fsapi-status-type.enum';
import {PropertyService} from "../../core/config/property.service";
import {CsCoreStatusType} from "../../core/model/cs-core-status";
import {PlatformStatusValue} from "../../core/platform/platform-status-value";
import {CodexType} from "../../codex/codex-type.enum";
import {flatMap, map} from "rxjs/operators";
import {PlatformStatusValueService} from "../../core/platform/platform-status-value.service";
import {CodexService} from "../../codex/codex.service";
import {PropertyType} from "../../core/model/property-type.enum";
import {ResetPinWizard} from "../../core/action/vms-actions/fsapi-change-status/reset-pin-wizard/reset-pin-wizard";
import {ChangeFsapiStatusWizard} from "../details-panel/customer-cards-tab/customer-card-panel/customer-card-panel-toolbar/change-fsapi-status-wizard/change-fsapi-status-wizard";
import {ActivateFsapiCardWizard} from "../../core/action/vms-actions/fsapi-change-status/activate-fsapi-card-wizard/activate-fsapi-card-wizard";
import {Logger} from "../../logging/logger.service";
import {FsapiAdjustBalanceWizard} from 'src/app/core/action/vms-actions/fsapi-adjust-balance/fsapi-adjust-balance-wizard';
import {ReplaceFsapiCardWizard} from "./replace-fsapi-card-wizard/replace-fsapi-card-wizard";
import {VmsSendFormWizard} from "../../core/action/vms-actions/vms-send-form-wizard/vms-send-form-wizard";
import {RequestFsapiC2cTransferWizard} from "./request-fsapi-c2c-transfer/request-fsapi-c2c-transfer-wizard";
import {CustomerService} from "../../core/customer/customer.service";
import {ResetOnlinePasswordWizard} from "../../core/action/vms-actions/fsapi-change-status/reset-online-password-wizard/reset-online-password-wizard";
import {RegisterVmsCardWizard} from 'src/app/core/action/vms-actions/register-vms-card-wizard/register-vms-card-wizard';
import {ShippingStatusType} from '../../core/customer/shipping-status-type.enum';
import {containsOneIgnoreCase} from "../../core/utils/string-utils";
import {UpgradeCardWizard} from "./upgrade-card-wizard/upgrade-card-wizard";
import {CardUpgradeUtilityService} from "../../core/card/card-upgrade-utility.service";
import {GenericOption} from 'src/app/core/model/generic-option';
import {Customer} from 'src/app/core/customer/customer';

export interface ChangeFsapiStatusCodexSeed {
  allowedStatuses?: string[];
  permissions: string[],
  platform: PlatformType,
  platformStatus: string,
}

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerActionService extends ActionService {

  constructor ( private cardUpgradeService: CardUpgradeUtilityService,
                private codexService: CodexService,
                private customerService: CustomerService,
                private logger: Logger,
                private platformStatusService: PlatformStatusValueService,
                private propertyService: PropertyService,
                protected securityService: SecurityService,
                private wizardRunner: WizardRunner ) {
    super ( securityService );
  }

  checkActivateCard ( session: Session, selection: Selection<Customer>, card: Card ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Activate';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      // If wizards are created for other platforms and this type needs to change, use a union type instead of AbstractWizard<any>
      let activateWizard: ActivateFsapiCardWizard;

      switch ( selection.platform ) {
        case PlatformType.CCL:
        case PlatformType.VMS:
          activateWizard                  = new ActivateFsapiCardWizard ();
          activateWizard.model.selection  = selection;
          activateWizard.model.customerId = selection.getCustomer ().id;
          activateWizard.model.maskedPan  = selection.selectedCard.identifiers.panMasked;
          activateWizard.model.sessionId  = session.id.toString ();
          break;
        // add any other platforms here if they need to use a different wizard or different data on the wizard for somme reason
        default:
          this.logger.error ( 'Unsupported platform for customer change status', selection );
          return; // <-- Do this so that we don't open a potentially broken wizard in the next line down
      }
      this.wizardRunner.run ( activateWizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let cardStatus = card.getStatusByPlatform ( selection.platform );

      //Must have permission
      if ( (selection.platform === PlatformType.VMS && !this.securityService.hasPermission ( Permission.VMS_ACTIVATE_CARD ))
        || (selection.platform === PlatformType.CCL && !this.securityService.hasPermission ( Permission.CCL_ACTIVATE_CARD )) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Card must be Inactive
      else if ( !cardStatus || cardStatus.name !== FsapiStatusType.INACTIVE ) {
        action.disabledReason = 'Card must be in Inactive status to perform this action.';
      }
    }

    return of ( action );
  }

  checkAdjustBalance ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    const action     = new ActionToolbarButtonStatus ();
    action.label     = 'Adjust Balance';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      const wizard           = new FsapiAdjustBalanceWizard ();
      wizard.model.selection = selection;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( selection.platform === PlatformType.VMS && !this.securityService.hasPermission ( Permission.VMS_ADJUST_BALANCE )
        || selection.platform === PlatformType.CCL && !this.securityService.hasPermission ( Permission.CCL_ADJUST_BALANCE ) ) {
        action.disabledReason = ActionService.NO_PERMISSION
      }
      //Must have card selected
      else if ( !selection.selectedCard ) {
        action.disabledReason = 'Must have a card selected to perform this action.';
      }
      //That card must not be in LOST-STOLEN, HOT CARDED, or CLOSED status
      else {
        const cardStatus = selection.selectedCard.getStatusByPlatform ( selection.platform );

        if ( cardStatus.name === FsapiStatusType.LOST_STOLEN
          || cardStatus.name === FsapiStatusType.HOT_CARDED
          || cardStatus.name === FsapiStatusType.CLOSED ) {
          action.disabledReason = 'Card must not be in Closed, Hot Carded, or Lost-Stolen status to perform this action.';
        }
      }
    }

    return of ( action );
  }

  checkChangeFeePlan ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Change Fee Plan';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.VMS;
    action.onClick   = () => {
      //TODO create and "run" wizard here
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.VMS_CHANGE_FEE_PLAN ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
    }

    return of ( action );
  }

  checkChangeStatus ( session: Session, selection: Selection<Customer>, card: Card ): Observable<ActionToolbarButtonStatus> {
    let allowedStatuses: GenericOption<FsapiStatusType>[] = [];

    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Change Status';
    action.isVisible = this.isSelectionDataLoaded ( selection );

    action.onClick = () => {
      const wizard                 = new ChangeFsapiStatusWizard ();
      wizard.model.allowedStatuses = allowedStatuses;
      wizard.model.card            = card;
      wizard.model.sessionId       = session.id.toString ();
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      return this.platformStatusService.findAll ( card.platform )
        .pipe ( flatMap ( ( mappings: PlatformStatusValue[] ) => {
          const mapping = mappings.find ( mapping => mapping.name === card.getFsapiStatus () );

          if ( !mapping ) {
            action.disabledReason = 'Card must be in a supported status to perform this action.';
            return of ( action );
          }

          const permissions = this.securityService.getCurrentUser ().permissions.map ( permission => permission.systemName );

          let codexName;
          switch ( card.platform ) {
            case PlatformType.CCL:
              codexName = CodexType.CCA_CCL_GIFT_CHANGE_STATUS;
              break;
            case PlatformType.VMS:
              codexName = card.isVmsGiftCard ? CodexType.CCA_VMS_GIFT_CHANGE_STATUS : CodexType.CCA_VMS_GPR_CHANGE_STATUS;
              break;
            default:
              action.disabledReason = 'Card must be from a supported Platform to perform this action.';
              return of ( action );
          }

          const codexSeed: ChangeFsapiStatusCodexSeed = {
            permissions: permissions,
            platformStatus: mapping.name,
            platform: card.platform
          };

          return this.codexService.runOne ( codexName, codexSeed )
            .pipe ( map ( response => {
              if ( !response.allowedStatuses || !response.allowedStatuses.length ) {
                action.disabledReason = ActionService.NO_PERMISSION;
              } else {
                allowedStatuses = response.allowedStatuses.filter ( status => status != response.platformStatus ).map ( value => {
                  const status: FsapiStatusType = FsapiStatusType[ value ];
                  return {
                    displayValue: getStatusTypeDisplayName ( status ),
                    value: status,
                  };
                } )
              }
              return action;
            } ) );
        } ) );
    } else {
      return of ( action );
    }
  }

  checkRegisterCard ( session: Session, selection: Selection<Customer>, card: Card ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Register';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.VMS;
    action.onClick   = () => {
      const wizard          = new RegisterVmsCardWizard ();
      wizard.model.card     = card;
      wizard.model.customer = selection.getCustomer ();
      wizard.model.partner  = selection.partner;
      wizard.model.platform = selection.platform;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let shippedStatus = card.getStatusByType ( CsCoreStatusType.SHIPPING );
      let cardStatus    = card.getFsapiStatus ();

      //Must have permission
      if ( !this.securityService.hasAnyPermission ( [ Permission.VMS_REGISTER_CARD_POSTAL_CODE_ONLY, Permission.VMS_REGISTER_CARD_PERSONALIZED ] ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Card must be shipped
      else if ( !shippedStatus || shippedStatus.name !== ShippingStatusType.SHIPPED ) {
        action.disabledReason = 'Card must be shipped to perform this action.';
      }
      //Card must be Inactive
      else if ( cardStatus !== FsapiStatusType.INACTIVE ) {
        action.disabledReason = 'Card must be in Inactive status to perform this action.';
      }
      //Card must be a starter card
      else if ( !card.productCategory || card.productCategory.toLowerCase ().indexOf ( 'starter' ) === -1 ) {
        action.disabledReason = 'Card must be a Starter Card to perform this action.';
      }
    }

    return of ( action );
  }

  checkReplaceCard ( session: Session, selection: Selection<Customer>, card: Card ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Replace';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let wizard              = new ReplaceFsapiCardWizard ();
      wizard.model.customerId = selection.getCustomer ().id;
      wizard.model.firstName  = selection.getCustomer ().firstName;
      wizard.model.lastName   = selection.getCustomer ().lastName;
      wizard.model.selection  = selection;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let cardStatus = card.getStatusByPlatform ( selection.platform );

      //Must have permission
      if ( (selection.platform === PlatformType.VMS && !this.securityService.hasPermission ( Permission.VMS_REPLACE_CARD ))
        || (selection.platform === PlatformType.CCL && !this.securityService.hasPermission ( Permission.CCL_REPLACE_CARD )) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //GPR Card must be in LOST-STOLEN or DAMAGE status
      else if ( !card.isVmsGiftCard && (!cardStatus || (cardStatus.name !== FsapiStatusType.DAMAGE && cardStatus.name !== FsapiStatusType.LOST_STOLEN)) ) {
        action.disabledReason = 'Card must be in Damage or Lost-Stolen status to perform this action.';
      }
      //Gift Card must be in Damage, Fraud Hold, or Lost-Stolen status
      else if ( card.isVmsGiftCard && (!cardStatus || (cardStatus.name !== FsapiStatusType.DAMAGE && cardStatus.name !== FsapiStatusType.FRAUD_HOLD && cardStatus.name !== FsapiStatusType.LOST_STOLEN)) ) {
        action.disabledReason = 'Card must be in Damage, Fraud Hold, or Lost-Stolen status to perform this action.';
      }
    }

    return of ( action );
  }

  checkRequestC2CTransfer ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Request Transfer';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let activeCard = selection.getCustomer ().getCardByStatus ( FsapiStatusType.ACTIVE );
      if ( !activeCard ) {
        activeCard = selection.getCustomer ().getCardByStatus ( FsapiStatusType.ACTIVE_UNREGISTERED );
      }

      let wizard             = new RequestFsapiC2cTransferWizard ( this.customerService );
      wizard.model.selection = selection;
      wizard.model.session   = session;
      wizard.model.fromCard  = activeCard;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let hasActiveCard = !!selection.getCustomer ().cards.find ( ( card: Card ) => {
        let cardStatus = card.getStatusByPlatform ( selection.platform );
        return cardStatus && cardStatus.name === FsapiStatusType.ACTIVE;
      } );

      //Must have permission
      if ( (selection.platform === PlatformType.CCL && !this.securityService.hasAnyPermission ( [ Permission.CCL_C2C_TRANSFER_REQUEST, Permission.CCL_C2C_TRANSFER_APPROVE ] ))
        || (selection.platform === PlatformType.VMS && !this.securityService.hasAnyPermission ( [ Permission.VMS_C2C_TRANSFER_REQUEST, Permission.VMS_C2C_TRANSFER_APPROVE ] )) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must either be CCL or not a Gift Card
      else if ( selection.platform !== PlatformType.CCL && selection.getCustomer ().isVmsGiftCard ) {
        action.disabledReason = 'Card must not be a gift card to perform this action.';
      }
      //Must have an active card
      else if ( !hasActiveCard ) {
        action.disabledReason = 'Account must have an Active card to perform this action.';
      }
    }

    return of ( action );
  }

  checkResetOnlinePassword ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Reset Password';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.VMS;
    action.onClick   = () => {
      let resetPasswordWizard            = new ResetOnlinePasswordWizard ();
      resetPasswordWizard.model.customer = selection.getCustomer ();
      this.wizardRunner.run ( resetPasswordWizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.VMS_RESET_ONLINE_PASSWORD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must not be a gift card
      else if ( this.isVmsGiftCard ( selection ) ) {
        action.disabledReason = 'Card must not be a gift card to perform this action.';
      }
    }

    return of ( action );
  }

  checkResetPin ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Reset PIN';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.VMS;
    action.onClick   = () => {
      let resetPinWizard              = new ResetPinWizard ();
      resetPinWizard.model.customerId = selection.getCustomer ().id;
      resetPinWizard.model.maskedPan  = selection.selectedCard.identifiers.panMasked;
      resetPinWizard.model.sessionId  = selection.externalSessionId;
      this.wizardRunner.run ( resetPinWizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.VMS_RESET_PIN ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must either NOT be a Gift Card, or must be a non-AMEX Gift Card
      else {
        let isVmsGiftCard        = selection.getCustomer ().isVmsGiftCard;
        let isPinEnabledGiftCard = false;

        if ( isVmsGiftCard ) {
          if ( selection.getCustomer ().productCode ) {
            let amexGiftCardProductCodes = this.propertyService.findOneValueFromSnapshot ( PropertyType.AMEX_GIFT_CARD_PRODUCT_CODES, true );
            isPinEnabledGiftCard         = !amexGiftCardProductCodes.find ( ( productCode: string ) => {
              return productCode.toLowerCase () === selection.getCustomer ().productCode.toLowerCase ();
            } );
            if ( !isPinEnabledGiftCard ) {
              action.disabledReason = 'Card must be a PIN-Enabled Card to perform this action.';
            }
          } else {
            action.disabledReason = 'Could not determine Product Code.';
          }
        }
      }
    }

    return of ( action );
  }

  checkSendForm ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Send Form';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.VMS;
    action.onClick   = () => {
      let sendFormWizard             = new VmsSendFormWizard ();
      sendFormWizard.model.selection = selection;
      this.wizardRunner.run ( sendFormWizard );
    };

    let activeCard = selection.getCustomer ().cards.find ( ( card: Card ) => {
      return [ FsapiStatusType.ACTIVE, FsapiStatusType.ACTIVE_UNREGISTERED ].includes ( card.getFsapiStatus () );
    } );

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.VMS_SEND_FORM ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //If it's a gift card, it must be ACTIVE
      else if ( this.isVmsGiftCard ( selection ) && !activeCard ) {
        action.disabledReason = 'Account must have an Active Card to perform this action.';
      }
    }
    selection.getCustomer ().isMomentumMc   = this.isMomentumMc ( selection );
    selection.getCustomer ().isMomentumVisa = this.isMomentumVisa ( selection );
    selection.getCustomer ().isTitaniumMc   = this.isTitaniumMc ( selection );

    return of ( action );
  }

  checkUpgrade ( session: Session, selection: Selection<Customer> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Upgrade';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.VMS;
    action.onClick   = () => {
      let wizard               = new UpgradeCardWizard ();
      wizard.model.selection   = selection;
      wizard.model.customerId  = selection.getCustomer ().id;
      wizard.model.canWaiveFee = this.securityService.hasPermission ( Permission.VMS_WAIVE_FEE_FOR_UPGRADE_FROM_STARTER_CARD );
      this.wizardRunner.run ( wizard );
    };
    let canWaiveFee  = this.securityService.hasPermission ( Permission.VMS_WAIVE_FEE_FOR_UPGRADE_FROM_STARTER_CARD );

    let feeValue           = this.cardUpgradeService.getUpgradeFeeValue ( selection );
    let balance            = this.cardUpgradeService.getCardBalance ( selection );
    let hasSufficientFunds = this.cardUpgradeService.hasSufficientFunds ( feeValue, balance );

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.VMS_UPGRADE_FROM_STARTER_CARD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must be eligible for Upgrade
      else if ( !selection.getCustomer ().flags.isUpgradeEligible ) {
        action.disabledReason = 'Account must be eligible for upgrade to perform this action.';
      }
      //Must have sufficient funds or the ability to waive the upgrade fee
      else if ( !canWaiveFee && !hasSufficientFunds ) {
        action.disabledReason = 'Account has insufficient funds to perform this action.';
      }
    }

    return of ( action );
  }

  doAllChecksForSelection ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus[]> {
    return forkJoin (
      this.checkAdjustBalance ( session, selection ),
      this.checkRequestC2CTransfer ( session, selection ),
      this.checkResetOnlinePassword ( session, selection ),
      this.checkResetPin ( session, selection ),
      this.checkSendForm ( session, selection ),
      this.checkUpgrade ( session, selection )
    );
  }

  private isMomentumMc ( selection: Selection<Customer> ): boolean {
    let momentumMcCodes = this.propertyService.findOneValueFromSnapshot ( PropertyType.DFC_MOMENTUM_MC_PRODUCT_CODES, true );
    return containsOneIgnoreCase ( momentumMcCodes, selection.getCustomer ().productCode );
  }

  private isMomentumVisa ( selection: Selection<Customer> ): boolean {
    let momentumVisaCodes = this.propertyService.findOneValueFromSnapshot ( PropertyType.DFC_MOMENTUM_VISA_PRODUCT_CODES, true );
    return containsOneIgnoreCase ( momentumVisaCodes, selection.getCustomer ().productCode );
  }

  private isTitaniumMc ( selection: Selection<Customer> ): boolean {
    let titaniumMcCodes = this.propertyService.findOneValueFromSnapshot ( PropertyType.DFC_TITANIUM_MC_PRODUCT_CODES, true );
    return containsOneIgnoreCase ( titaniumMcCodes, selection.getCustomer ().productCode );
  }

  private isVmsGiftCard ( selection: Selection<Customer> ): boolean {
    return selection.platform === PlatformType.VMS && selection.getCustomer ().isVmsGiftCard;
  }
}
