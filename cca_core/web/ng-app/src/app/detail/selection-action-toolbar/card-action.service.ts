import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {forkJoin, Observable, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import * as _ from "lodash";
import {MaplesCard, MaplesPlatform, MaplesStatus} from '@cscore/maples-client-model';
import {SecurityService} from "../../core/security/security.service";
import {PlatformType} from "../../core/platform/platform-type.enum";
import {ActionService} from "./action-service";
import {Session} from "../../core/session/model/session";
import {ActionToolbarButtonStatus} from "../../core/action-toolbar/action-toolbar-button-status";
import {WizardRunner} from "../../core/wizard/wizard-runner/wizard-runner.service";
import {Selection, SelectionDataType} from "../../core/session/model/selection";
import {Permission} from "../../core/auth/permission";
import {PlatformStatusValueService} from "../../core/platform/platform-status-value.service";
import {PlatformStatusValue} from "../../core/platform/platform-status-value";
import {CodexService} from "../../codex/codex.service";
import {CodexType} from "../../codex/codex-type.enum";
import {AuditService} from "../../core/audit/audit.service";
import {IdentifierType} from "../../core/session/model/identifier-type.enum";
import {AuditCardReplacementActivity} from "../../core/audit/audit-card-replacement-activity";
import {CardAccountHistory} from "../../core/card/card-account-history";
import {
  getGreencardStatusTypeDisplayName,
  GreencardStatusType
} from '../../core/status/greencard-status/greencard-status-type.enum';
import {IncommStatusType} from "../../core/status/incomm-status/incomm-status-type.enum";
import {FsapiStatusType} from "../../core/status/fsapi-status/fsapi-status-type.enum";
import {AppStateType} from "../../app-state-type.enum";
import {SetSelectionLastReplacementActivityAction} from "../../core/session/action/session-actions";
import {ActivateGreencardB2bCardWizard} from "../../core/action/greencard-actions/activate-greencard-b2b-card-wizard/activate-greencard-b2b-card-wizard";
import {ActivateGreencardGiftCardWizard} from "../../core/action/greencard-actions/activate-greencard-gift-card-wizard/activate-greencard-gift-card-wizard";
import {DeactivateFastcardWizard} from '../fastcard-activation/deactivate-fastcard/deactivate-fastcard-wizard';
import {
  ChangeGreencardStatusWizard,
  ChangeGreencardStatusWizardModel,
  GreencardStatusOption
} from './change-greencard-status-wizard/change-greencard-status-wizard';
import {AdjustGreencardBalanceWizard} from 'src/app/core/action/greencard-actions/adjust-greencard-balance-wizard/adjust-greencard-balance-wizard';
import {GreencardReleaseMerchandiseWizard} from 'src/app/core/action/greencard-actions/greencard-release-merchandise-wizard/greencard-release-merchandise-wizard';
import {ReplaceGreencardWizard} from 'src/app/core/action/greencard-actions/replace-greencard-wizard/replace-greencard-wizard';
import {TransferGreencardWizard} from 'src/app/core/action/greencard-actions/transfer-greencard-wizard/transfer-greencard-wizard';
import {Card} from 'src/app/core/card/card';
import {AuditActivityType} from '../../core/audit/audit-activity-type.enum';
import {ChangeCardStatusWizard} from '../../core/action/card-actions/change-card-status-wizard/change-card-status-wizard';
import {ServeCardStatus} from '../../core/model/account/serve-card-status.enum';
import {CsCoreStatus} from "../../core/model/cs-core-status";

export interface ChangeGreencardStatusCodexSeed {
  allowedStatuses?: string[];
  platformStatus: string,
  permissions: string[],
}

@Injectable ( {
  providedIn: 'root'
} )
export class CardActionService extends ActionService {

  constructor ( private auditService: AuditService,
                private codexService: CodexService,
                private platformStatusService: PlatformStatusValueService,
                securityService: SecurityService,
                private store: Store<AppStateType>,
                private wizardRunner: WizardRunner ) {
    super ( securityService );
  }

  checkServeChangeCardStatus(selection: Selection<SelectionDataType>, card: MaplesCard): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Change Status';
    action.isVisible = this.isSelectionDataLoaded(selection) && selection.getMaplesPlatform() === MaplesPlatform.SERVE;
    action.onClick   = () => {
      let wizard: ChangeCardStatusWizard                = new ChangeCardStatusWizard();
      wizard.model.statusFixed                          = false;
      wizard.model.currentStatus                        = selection.getCustomerAccount().getCardStatus().description;
      wizard.model.accountId                            = selection.getCustomerAccount().id;
      wizard.model.accountStatus                        = selection.getCustomerAccount().getAccountStatus().name;
      wizard.model.platform                             = selection.getCustomerAccount().platform;
      wizard.model.cardChangeStatusRequest.statusReason = selection.getCustomerAccount().getAccountStatus().description;
      wizard.model.identifier                           = selection.getCustomerAccount().id;
      ;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.CHANGE_CARD_STATUS;

      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.CHANGE_CARD_STATUS)) {
      action.disabledReason = 'You must have permission to change a card status';
    }
    if (card.getPlatformStatus().name.toLowerCase() === 'inactive') {
      action.disabledReason = 'Card must be active';
    }
    if (this.isPendingActivation(selection, card)) {
      action.disabledReason = 'Use "Activate" for pending activation cards.';
    }

    return of(action);
  }

  checkActivateServeCard(session: Session, selection: Selection<SelectionDataType>, card: MaplesCard): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Activate';
    action.isVisible = this.isSelectionDataLoaded(selection) && selection.getMaplesPlatform() === MaplesPlatform.SERVE;
    action.onClick   = () => {
      let wizard: ChangeCardStatusWizard                = new ChangeCardStatusWizard();
      wizard.model.statusFixed                          = true;
      wizard.model.currentStatus                        = selection.getCustomerAccount().getCardStatus().description;
      wizard.model.accountId                            = selection.getCustomerAccount().id;
      wizard.model.accountStatus                        = selection.getCustomerAccount().getAccountStatus().name;
      wizard.model.platform                             = selection.getCustomerAccount().platform;
      wizard.model.cardChangeStatusRequest.cardStatus   = 'Activate';
      wizard.model.cardChangeStatusRequest.statusReason = 'None/Blank';
      wizard.model.cardChangeStatusRequest.cardId       = card.identifiers.cardId;
      wizard.model.identifier                           = selection.getCustomerAccount().id;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.ACTIVATE_CARD;

      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.CHANGE_CARD_STATUS)) {
      action.disabledReason = 'You must have permission to change a card status';
    }
    if (!this.securityService.hasPermission(Permission.SERVE_ACTIVATE_CARD)) {
      action.disabledReason = 'You must have permission to activate a card';
    }
    if (!this.isPendingActivation(selection, card)) {
      action.disabledReason = 'A card must be active and in a pending state.';
    }

    return of(action);
  }

  /**
   * Must check pending and activation in two steps because Serve is sending us "PendingActivation" as the status.
   * However, the actual status code in Serve is "Pending-Activation".  If we start getting the real code, we need
   * to handle it.
   *
   * @param card
   */
  private isPendingActivation(selection: Selection<SelectionDataType>, card: MaplesCard): boolean {
    let status: MaplesStatus = selection.getCustomerAccount().getCardStatus();
    if (!status || !card.statuses) {
      return false;
    }

    if (status.description
      && status.description.toLowerCase().indexOf('pending') !== -1
      && status.description.toLowerCase().indexOf('activation') !== -1) {
      return card.getPlatformStatus() && card.getPlatformStatus().name === ServeCardStatus.ACTIVE;
    } else {
      return false;
    }
  }

  checkActivateB2BCard ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let status = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );

    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Activate';
    action.isVisible = this.isSelectionDataLoaded ( selection )
        && selection.platform === PlatformType.GREENCARD
        && selection.getCard ().alerts.isB2B
        && status.name !== GreencardStatusType.REPLACEMENT_REQUESTED;
    action.onClick   = () => {
      let wizard             = new ActivateGreencardB2bCardWizard ();
      wizard.model.selection = _.cloneDeep ( selection );
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      //Must be GreenCard
      if ( selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Card must be a GreenCard product to perform this action.';
      }
      //Must have permission
      else if ( !this.securityService.hasPermission ( Permission.GC_ACTIVATE_B2B_CARD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must be a B2B card
      else if ( !selection.getCard ().alerts.isB2B ) {
        action.disabledReason = 'Card must be a B2B Card to perform this action.';
      }
      //Must be in Initial status
      else if ( !status || status.name !== GreencardStatusType.INITIAL ) {
        action.disabledReason = 'Card must be in Initial status to perform this action.';
      }
    }

    return of ( action );
  }

  checkActivateGiftCardReplacement ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let status = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );

    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Activate';
    action.isVisible = this.isSelectionDataLoaded ( selection )
        && selection.platform === PlatformType.GREENCARD
        && (!selection.getCard ().alerts.isB2B || status.name === GreencardStatusType.REPLACEMENT_REQUESTED);
    action.onClick   = () => {
      let wizard             = new ActivateGreencardGiftCardWizard ();
      wizard.model.selection = _.cloneDeep ( selection );
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      //Must be GreenCard
      if ( selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Card must be a GreenCard product to perform this action.';
      }
      //Must have permission
      else if ( !this.securityService.hasPermission ( Permission.GC_ACTIVATE_GIFT_CARD_REPLACEMENT ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must be in Replacement Requested status
      else if ( !status || status.name !== GreencardStatusType.REPLACEMENT_REQUESTED ) {
        action.disabledReason = 'Card must be in Replacement Requested status to perform this action.';
      }

    }

    return of ( action );
  }

  checkAdjustBalance ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Adjust Balance';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.GREENCARD;
    action.onClick   = () => {
      const wizard      = new AdjustGreencardBalanceWizard ();
      wizard.model.card = selection.getCard ();
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      let greencardStatus = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );
      let incommStatus    = selection.getCard ().getStatusByPlatform ( PlatformType.INCOMM );

      //Must be GreenCard
      if ( selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Card must be a GreenCard product to perform this action.';
        return of ( action );
      }

      //If user has override permission, allow the action regardless of status
      if ( this.securityService.hasPermission ( Permission.ADJUST_BALANCE_STATUS_OVERRIDE ) ) {
        return of ( action );
      }

      //Deny action if no Greencard status available
      if ( !greencardStatus ) {
        action.disabledReason = 'Card must have a GreenCard status to perform this action.';
      }
      //Else, user must have appropriate permission for the card's current status (among other things)
      else {
        switch ( greencardStatus.name ) {
          case GreencardStatusType.INITIAL:
            //Must have permission
            if ( !this.securityService.hasPermission ( Permission.GC_ADJUST_BALANCE_WHEN_INITIAL ) ) {
              action.disabledReason = ActionService.NO_PERMISSION;
            }
            //Must be in InComm Active status or have a positive available balance
            else if ( !incommStatus || incommStatus.name !== IncommStatusType.ACTIVE ) {
              action.disabledReason = 'Card must be in InComm Active status to perform this action.';

              let availableBalance = selection.getCard ().amounts.availableBalance;
              if ( availableBalance && availableBalance.value > 0 ) {
                action.disabledReason = null;
              }
            }
            break;
          case GreencardStatusType.ACTIVE:
            //Must have permission
            if ( !this.securityService.hasPermission ( Permission.GC_ADJUST_BALANCE_WHEN_ACTIVE ) ) {
              action.disabledReason = ActionService.NO_PERMISSION;
            }
            break;
          case GreencardStatusType.EXPIRED:
            //Must have permission
            if ( !this.securityService.hasPermission ( Permission.GC_ADJUST_BALANCE_WHEN_EXPIRED ) ) {
              action.disabledReason = ActionService.NO_PERMISSION;
            }
            break;
          case GreencardStatusType.DEACTIVE:
            //Must have permission
            if ( !this.securityService.hasPermission ( Permission.GC_ADJUST_BALANCE_WHEN_DEACTIVE ) ) {
              action.disabledReason = ActionService.NO_PERMISSION;
            }
            break;
          default:
            action.disabledReason = 'Card must be in an eligible status to perform this action.';
            break;
        }
      }
    }
    return of ( action );
  }

  checkChangeStatus ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let allowedStatuses: GreencardStatusOption[] = [];

    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Change Status';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.GREENCARD;
    action.onClick   = () => {
      const wizard                 = new ChangeGreencardStatusWizard ();
      wizard.model                 = new ChangeGreencardStatusWizardModel ();
      wizard.model.card            = selection.getCard ();
      wizard.model.sessionId       = session.id.toString ();
      wizard.model.allowedStatuses = allowedStatuses;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      let greencardStatus = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );

      //Must be GreenCard
      if ( selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Card must be a GreenCard product to perform this action.';
        return of ( action );
      }

      return this.platformStatusService.findAll ( PlatformType.GREENCARD )
        .pipe ( flatMap ( ( mappings: PlatformStatusValue[] ) => {
          //We need to find the status mapping for the current status, so we can run a Codex against it
          const mapping = mappings.find ( mapping => mapping.value === greencardStatus.name );
          if ( !mapping ) {
            action.disabledReason = 'Card must be in an eligible status to perform this action.';
            return of ( action );
          }

          const permissions = this.securityService.getCurrentUser ().permissions.map ( permission => permission.systemName );

          const seed: ChangeGreencardStatusCodexSeed = {
            platformStatus: mapping.name,
            permissions: permissions
          };

          //Run the codex
          return this.codexService.runOne ( CodexType.CCA_GREENCARD_CHANGE_STATUS, seed )
            .pipe ( map ( result => {
              //Must have at least one available option
              if ( !result.allowedStatuses || !result.allowedStatuses.length ) {

                action.disabledReason = ActionService.NO_PERMISSION;
              } else {
                allowedStatuses = (_.uniq ( result.allowedStatuses.filter ( status => status != result.platformStatus ) ) as string[]).map ( value => {
                  return {
                    cardStatusCode: parseInt ( GreencardStatusType[ value ] ),
                    displayName: getGreencardStatusTypeDisplayName ( value ),
                  };
                } );
              }
              return action;
            } ) );
        } ) );
    } else {
      return of ( action );
    }
  }

  checkDeactivateCard ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Deactivate';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      const wizard           = new DeactivateFastcardWizard ();
      wizard.model.selection = selection as Selection<Card>;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {

      let status : CsCoreStatus;
      if(selection.getCard().platform === 'SEJ') {
        status = selection.getCard().statuses[0];
        if(status.description === 'Active') {
          return  of ( action );
        }
      } else {
        status = selection.getCard ().getStatusByPlatform ( selection.getCard ().platform );
      }



      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.DEACTIVATE_FAST_CARD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must have appropriate status
      else if ( !status ) {
        action.disabledReason = 'Card must have an eligible status to perform this action.';
      }
      //Must be InComm-supported product
      else if ( !selection.getCard ().isInCommSupportedProduct () ) {
        action.disabledReason = 'Card must be an InComm-supported product to perform this action.';
      }
      //Must have activating location data
      else if ( !selection.purchaseLocation ) {
        action.disabledReason = 'Card must have purchase location data to perform this action.';
      }
      //Must have pin if activation type is 2200
      else if ( selection.getCard ().activation
        && selection.getCard ().activation.type
        && selection.getCard ().activation.type.code === '2200'
        && !selection.getCard ().identifiers.vendorPin ) {
        action.disabledReason = 'FastPin Card must have a FastPin to perform this action.';
      }
      // Must have serial number or VAN (according to CCA legacy)
      else if ( !selection.getCard ().identifiers || !selection.getCard ().identifiers.serialNumber || !selection.getCard ().identifiers.van ) {
        action.disabledReason = 'Card must have serial number or VAN.';
      }
      //Must not already be inactive
      else {
        switch ( selection.getCard ().platform ) {
          case PlatformType.GREENCARD:
            if ( status.name === GreencardStatusType.DEACTIVE ) {
              action.disabledReason = 'Card must not already be Inactive to perform this action.';
            }
            break;
          case PlatformType.INCOMM:
            if ( _.includes ( [ IncommStatusType.INACTIVE, IncommStatusType.DEACTIVE, IncommStatusType.CONSUMED ], status.name ) ) {
              action.disabledReason = 'Card must not already be Inactive to perform this action.';
            }
            break;
          case PlatformType.VMS:
          case PlatformType.CCL:
            if ( _.includes ( [ FsapiStatusType.INACTIVE, FsapiStatusType.CLOSED ], status.name ) ) {
              action.disabledReason = 'Card must not already be Inactive or Closed to perform this action.';
            }
            break;
          default:
            break;
        }
      }
    }

    return of ( action );
  }

  checkReleaseMerchandise ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Release Merchandise';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.GREENCARD;
    action.onClick   = () => {
      const wizard      = new GreencardReleaseMerchandiseWizard ();
      wizard.model.card = selection.getCard ();
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      let status = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );

      //Must be GreenCard
      if ( selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Card must be a GreenCard product to perform this action.';
      }
      //Must have permission
      else if ( !this.securityService.hasPermission ( Permission.GC_MERCHANDISE_RELEASE ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must have a GreenCard status
      else if ( !status ) {
        action.disabledReason = 'Card must have a GreenCard status to perform this action.';
      }
      //Must be in Bad Credit status
      else if ( status.name !== GreencardStatusType.BAD_CREDIT ) {
        action.disabledReason = 'Card must be in Bad Credit status to perform this action.';
      }
    }

    return of ( action );
  }

  checkReplaceCard ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let reorder = false;

    const action     = new ActionToolbarButtonStatus ();
    action.label     = 'Replace';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.GREENCARD;
    action.onClick   = () => {
      const wizard         = new ReplaceGreencardWizard ();
      wizard.model.reorder = reorder;
      wizard.model.card    = selection.getCard ();
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      const status = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );

      //Must be GreenCard
      if ( selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Card must be a GreenCard product to perform this action.';
      }
      //Must have permission
      else if ( !this.securityService.hasPermission ( Permission.GC_REPLACE_CARD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must be BIN Replacement eligible
      else if ( !selection.getCard ().alerts.isBinReplacementEligible ) {
        action.disabledReason = 'Card must be eligible for BIN Replacement to perform this action.';
      }
      //Must have a GreenCard status
      else if ( !status ) {
        action.disabledReason = 'Card must have a GreenCard status to perform this action.';
      }
      //If in Replacement Requested, must not have been replaced in the last ten days
      else if ( status.name === GreencardStatusType.REPLACEMENT_REQUESTED ) {
        //Find most recent replacement audit activity record
        let observable: Observable<AuditCardReplacementActivity>;

        if ( selection.lastReplacementActivity ) {
          observable = of ( selection.lastReplacementActivity );
        } else {
          observable = this.auditService.findLastCardReplacementActivity ( IdentifierType.SERIALNUMBER, selection.getCard ().identifiers.serialNumber, PlatformType.GREENCARD )
            .pipe ( map ( ( lastActivity: AuditCardReplacementActivity ) => {
              /*
              If we didn't find a record, populate the selection with an empty record. We'll check for a date below, but
              we want to indicate that we did this search already, so we don't keep calling for the record every time we
              check actions again.
               */
              if ( !lastActivity ) {
                lastActivity = new AuditCardReplacementActivity ();
              }
              selection.lastReplacementActivity = lastActivity;
              this.store.dispatch ( new SetSelectionLastReplacementActivityAction ( selection ) );
              return lastActivity;
            } ) );
        }
        return observable
          .pipe ( map ( ( lastActivity: AuditCardReplacementActivity ) => {
            let lastReplacedDate: Date;

            //If we found a record, start with its date
            if ( lastActivity && lastActivity.lastReplacedDate ) {
              lastReplacedDate = lastActivity.lastReplacedDate.value;
            }

            //Check for more recent record in account history
            const accountHistory: CardAccountHistory = _.find ( selection.getCard ().accountHistories, ( accountHistory: CardAccountHistory ) => {
              return accountHistory.object && accountHistory.object.toLowerCase () === 'card replacement';
            } );
            if ( accountHistory && accountHistory.date && accountHistory.date.value > lastReplacedDate ) {
              lastReplacedDate = accountHistory.date.value;
            }

            //Must have second-tier permission if replaced less than ten days ago
            const tenDaysMs      = 1000 * 60 * 60 * 24 * 10;
            const tenDaysAgoDate = new Date ( new Date ().getTime () - tenDaysMs );
            if ( lastReplacedDate && lastReplacedDate > tenDaysAgoDate ) {
              const canReplaceWithReorderFlag = this.securityService.hasPermission ( Permission.REPLACE_REPLACEMENT_CARD );

              if ( canReplaceWithReorderFlag ) {
                reorder = true;
              } else {
                action.disabledReason = 'You do not have permission to replace this card. A replacement was ordered within the last ten days.';
              }
            }
            //Else, allow the replacement
            else {
              reorder = true;
            }

            return action;
          } ) );
      }
      //Must be in one of these statuses
      else if ( !_.includes ( [
        GreencardStatusType.ACTIVE,
        GreencardStatusType.EXPIRED,
        GreencardStatusType.INITIAL,
        GreencardStatusType.LOST,
        GreencardStatusType.LOST_STOLEN,
        GreencardStatusType.STOLEN,
      ], status.name ) ) {
        action.disabledReason = 'Card must be in an eligible status to perform this action.';
      }
    }

    return of ( action );
  }

  checkTransferCard ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Transfer';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.GREENCARD;
    action.onClick   = () => {
      const wizard           = new TransferGreencardWizard ();
      wizard.model.selection = selection as Selection<Card>;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformCardActions ( session, selection, action ) ) {
      const status  = selection.getCard ().getStatusByPlatform ( PlatformType.GREENCARD );
      const balance = selection.getCard ().amounts.availableBalance;

      //Must have a GreenCard status
      if ( !status ) {
        action.disabledReason = 'Card must have a GreenCard status to perform this action.';
      }
      //Must have positive balance
      else if ( !balance || balance.value <= 0 ) {
        action.disabledReason = 'Card must have a positive balance to perform this action.';
      }
      //Must have permission
      else {
        switch ( status.name ) {
          case GreencardStatusType.ACTIVE:
            if ( !this.securityService.hasAnyPermission ( [ Permission.GC_CARD_TRANSFER, Permission.GC_CARD_TRANSFER_STATUS_OVERRIDE ] ) ) {
              action.disabledReason = ActionService.NO_PERMISSION;
            }
            break;
          default:
            if ( !this.securityService.hasPermission ( Permission.GC_CARD_TRANSFER_STATUS_OVERRIDE ) ) {
              action.disabledReason = ActionService.NO_PERMISSION;
            }
            break;
        }
      }
    }

    return of ( action );
  }

  doAllChecksForSelection ( session: Session, selection: Selection<SelectionDataType> ): Observable<ActionToolbarButtonStatus[]> {
    return forkJoin (
      this.checkActivateB2BCard ( session, selection ),
      this.checkActivateGiftCardReplacement ( session, selection ),
      this.checkAdjustBalance ( session, selection ),
      this.checkChangeStatus ( session, selection ),
      this.checkDeactivateCard ( session, selection ),
      this.checkReleaseMerchandise ( session, selection ),
      this.checkReplaceCard ( session, selection ),
      this.checkTransferCard ( session, selection )
    );
  }

  private isAbleToPerformCardActions ( session: Session, selection: Selection<SelectionDataType>, action: ActionToolbarButtonStatus ): boolean {
    if ( super.isAbleToPerformActions ( session, selection, action ) ) {
      if ( this.isCurrentUserUsingSEJPlatform () && !(action.label === 'Activate' ||  action.label === 'Deactivate' )) {
        action.disabledReason = 'Must not be using SEJ platform to perform this action.';
      }
    }

    return !action.disabledReason;
  }

  private isCurrentUserUsingSEJPlatform (): boolean {
    return this.securityService.getCurrentUser ().prefDefaultDataSource === PlatformType.SEJ;
  }
}
