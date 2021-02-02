import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';
import { AppState } from 'src/app/app-state';
import { AppStateType } from 'src/app/app-state-type.enum';
import { Card } from 'src/app/core/card/card';
import { GreencardReleasePreAuthWizard } from 'src/app/core/action/greencard-actions/greencard-release-preauth-wizard/greencard-release-preauth-wizard';
import { Permission } from 'src/app/core/auth/permission';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { SecurityService } from 'src/app/core/security/security.service';
import { Selection } from 'src/app/core/session/model/selection';
import { SelectionType } from 'src/app/core/session/model/selection-type.enum';
import { Session } from 'src/app/core/session/model/session';
import { SessionState } from 'src/app/core/session/session-state';
import { snapshot } from 'src/app/core/store-utils/store-utils';
import { Transaction } from 'src/app/core/transaction/transaction';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { ActionService } from '../../../../selection-action-toolbar/action-service';
import { SelectionDataType } from '../../../../../core/session/model/selection';
import { FsapiReverseFeeWizard } from 'src/app/core/action/vms-actions/fsapi-reverse-fee-wizard/fsapi-reverse-fee-wizard';
import { ReportTransactionFraudWizard } from 'src/app/core/action/vms-actions/report-transaction-fraud-wizard/report-transaction-fraud-wizard';
import { FsapiReleasePreauthWizard } from 'src/app/core/action/vms-actions/fsapi-release-preauth-wizard/fsapi-release-preauth-wizard';
import { CustomerTransactionFilterType } from '../../customer-transaction-filter-type.enum';
import { Customer } from 'src/app/core/customer/customer';
import { PropertyType } from "../../../../../core/model/property-type.enum";
import { PropertyService } from "../../../../../core/config/property.service";
import { containsOneIgnoreCase } from "../../../../../core/utils/string-utils";
import { RaiseDisputeWizard } from 'src/app/core/action/vms-actions/raise-dispute/raise-dispute-wizard';
import { ViewDisputeWizard } from 'src/app/core/action/vms-actions/view-dispute/view-dispute-wizard';
import { FullTransactionHistoryDetailsWizard } from "../../full-transaction-history-details-wizard/full-transaction-history-details-wizard";

import { SessionService } from "../../../../../core/session/session.service";

@Injectable ( {
  providedIn: 'root'
} )
export class TransactionActionService extends ActionService {

  constructor (
    securityService: SecurityService,
    private propertyService: PropertyService,
    private store: Store<AppState>,
    private wizardRunner: WizardRunner,
    private sessionService: SessionService
  ) {
    super ( securityService );
  }

  doAllChecksForTransaction ( transaction: Transaction ): ActionToolbarButtonStatus[] {
    const sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    const session = sessionState && sessionState.session;
    const selection = sessionState.selection;

    let actions: ActionToolbarButtonStatus[] = [];
    actions.push ( this.checkViewFullTransactionDetails ( session, selection, transaction ) );

    switch ( selection.type ) {
      case SelectionType.CUSTOMER:
        switch ( selection.platform ) {
          case PlatformType.CCL:
            actions.push ( this.checkReleasePreAuth ( session, selection, transaction ) );
            actions.push ( this.checkReverseFee ( session, selection, transaction ) );
            break;
          case PlatformType.VMS:
            actions.push ( this.checkReleasePreAuth ( session, selection, transaction ) );
            actions.push ( this.checkReverseFee ( session, selection, transaction ) );
            actions.push ( this.checkRaiseDispute ( session, selection, transaction ) );
            actions.push ( this.checkReportAsFraud ( session, selection, transaction ) );
            actions.push ( this.checkViewDispute ( session, selection, transaction ) );
            break;
          default:
            break;
        }
        break;
      case SelectionType.LOCATION:
        break;
      case SelectionType.CARD:
        if ( transaction.platform === PlatformType.GREENCARD ) {
          actions.push ( this.checkReleasePreAuth ( session, selection, transaction ) );
          actions.push ( this.checkRaiseDispute ( session, selection, transaction ) );
          actions.push ( this.checkViewDispute ( session, selection, transaction ) );
        }
        break;
      default:
        break;
    }

    return actions;
  }

  private checkReleasePreAuth ( session: Session, selection: Selection<SelectionDataType>, transaction: Transaction ): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus ();
    action.label = 'Release Pre-Auth';

    action.isVisible = true;
    action.onClick = () => {
      if ( selection.platform === PlatformType.CCL || selection.platform === PlatformType.VMS ) {
        const wizard = new FsapiReleasePreauthWizard ();
        wizard.model.selection = selection as Selection<Customer>;
        wizard.model.transaction = transaction;
        this.wizardRunner.run ( wizard );
      } else {
        const wizard = new GreencardReleasePreAuthWizard ();
        wizard.model.selection = selection as Selection<Card>;
        wizard.model.transaction = transaction;
        this.wizardRunner.run ( wizard );
      }
    };

    // Must have permission
    if ( selection.platform === PlatformType.CCL && !this.securityService.hasPermission ( Permission.CCL_RELEASE_PRE_AUTH )
      || selection.platform === PlatformType.GREENCARD && !this.securityService.hasPermission ( Permission.GC_RELEASE_PREAUTH )
      || (selection.platform === PlatformType.VMS && !this.securityService.hasPermission ( Permission.VMS_RELEASE_PRE_AUTH ))
    ) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }
    // Must have session assigned
    else if ( !this.isSessionAssignedToCurrentUser ( session ) ) {
      action.disabledReason = ActionService.NOT_OWN_SESSION;
    }
    // Must not be using SEJ platform
    else if ( this.isUsingSejPlatform () ) {
      action.disabledReason = 'Must not be using the SEJ platform to perform this action.';
    }
    // If VMS, must have transaction filter set correctly
    else if ( (selection.platform === PlatformType.VMS || selection.platform === PlatformType.CCL)
      && !TransactionActionService.isHoldsTransactionFilter ( selection ) ) {
      action.disabledReason = 'Transaction Type filter must be set to "Pending Pre-Auth" to perform this action.';
    }
    // If Greencard, must meet these additional requirements
    else if ( selection.platform === PlatformType.GREENCARD ) {
      const card = selection.getCard ();
      const greencardSatus = card.getStatusByPlatform ( selection.platform );

      //Transaction must also be Greencard platform
      if ( transaction.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Transaction must be a Greencard transaction to perform this action.';
      }
      // Card must be active
      else if ( !greencardSatus || (greencardSatus.name !== '8' && greencardSatus.name !== '08') ) {
        action.disabledReason = 'Card must be in Active status to perform this action.';
      }
      // Transaction must be pending
      else if ( !transaction.flags.isPending ) {
        action.disabledReason = 'Transaction must be pending to perform this action.';
      }
    }

    return action;
  }

  private checkReverseFee ( session: Session, selection: Selection<SelectionDataType>, transaction: Transaction ): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus ();
    action.label = 'Reverse Fee';
    action.isVisible = true;
    action.onClick = () => {
      const wizard = new FsapiReverseFeeWizard ();
      wizard.model.selection = selection as Selection<Customer>;
      this.wizardRunner.run ( wizard );
      wizard.model.transaction = transaction;
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      // Must have permission
      if ( (selection.platform === PlatformType.VMS && !this.securityService.hasPermission ( Permission.VMS_REVERSE_FEE ))
        || (selection.platform === PlatformType.CCL && !this.securityService.hasPermission ( Permission.CCL_REVERSE_FEE )) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Transaction must have a fee greater than zero
      else if ( !transaction.fee || transaction.fee.amount.value <= 0 ) {
        action.disabledReason = 'Transaction must have an eligible fee amount over $0.00 to perform this action.';
      }
    }

    return action;
  }

  private checkRaiseDispute ( session: Session, selection: Selection<SelectionDataType>, transaction: Transaction ): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus ();
    action.label = 'Dispute';
    action.isVisible = true;
    action.onClick = () => {
      const wizard = new RaiseDisputeWizard ();
      wizard.model.selection = selection as Selection<Customer>;
      wizard.model.session = session;
      wizard.model.transactions = [transaction];
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      // Must have permission if GREENCARD
      if ( selection.platform === PlatformType.GREENCARD && !this.securityService.hasPermission ( Permission.GC_RAISE_DISPUTE ) ) {

        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Must not be CCL and must have permission
      else if ( selection.platform === PlatformType.CCL || !this.securityService.hasPermission ( Permission.VMS_RAISE_DISPUTE ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Transaction must be disputable AND not GC ( Greencard has no isDisputable flag )
      else if ( !transaction.flags.isDisputable && selection.platform !== PlatformType.GREENCARD ) {
        action.disabledReason = 'Transaction must be disputable to perform this action.';
      }
      // Transaction must not be in dispute if it is GreenCard ( Greencard isIndispute flag has been added)
      else if ( transaction.flags.isInDispute && selection.platform == PlatformType.GREENCARD ) {
        action.disabledReason = 'Transaction must be disputable to perform this action.';
      }
    }

    selection.getCustomer ().useCanadianDispute = this.useCanadianDispute ( selection );

    return action;
  }

  private checkReportAsFraud ( session: Session, selection: Selection<SelectionDataType>, transaction: Transaction ): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus ();
    action.label = 'Report as Fraud';
    action.isVisible = true;
    action.onClick = () => {
      const wizard = new ReportTransactionFraudWizard ();
      wizard.model.selection = selection as Selection<Customer>;
      wizard.model.transactions = [transaction];
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      // Must have permission
      if ( !this.securityService.hasPermission ( Permission.VMS_REPORT_TRANSACTION_AS_FRAUD ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Must not be CCL
      else if ( selection.platform === PlatformType.CCL ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Transaction must not already be flagged as fraudulent
      else if ( transaction.flags.isFraudulent ) {
        action.disabledReason = 'Transaction has already been reported as Fraudulent.';
      }
    }

    return action;
  }

  private checkViewDispute ( session: Session, selection: Selection<SelectionDataType>, transaction: Transaction ): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus ();
    action.label = 'View Dispute';
    action.isVisible = true;
    action.onClick = () => {
      const wizard = new ViewDisputeWizard ();
      wizard.model.selection = selection;
      wizard.model.transaction = transaction;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      // Must not be CCL and must have permission
      if ( selection.platform === PlatformType.CCL || !this.securityService.hasPermission ( Permission.VMS_VIEW_DISPUTE ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Transaction must be disputable
      else if ( !transaction.flags.isInDispute ) {
        action.disabledReason = 'Transaction must be in dispute to perform this action.';
      }
    }

    return action;
  }

  private checkViewFullTransactionDetails ( session: Session, selection: Selection<SelectionDataType>, transaction: Transaction ): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus ();
    action.label = 'View All Details';
    action.isVisible = true;
    action.onClick = () => {
      const wizard = new FullTransactionHistoryDetailsWizard ();
      wizard.model.transaction = transaction;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      if ( !this.securityService.hasPermission ( Permission.HISTORY_FULL_VIEW ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
    }
    return action;
  }

  private useCanadianDispute ( selection: Selection<any> ): boolean {
    let canadianDisputeCodes = this.propertyService.findOneValueFromSnapshot ( PropertyType.CANADA_DISPUTE_PRODUCT_CODES, true );
    return containsOneIgnoreCase ( canadianDisputeCodes, selection.getCustomer ().productCode );
  }

  private isUsingSejPlatform (): boolean {
    return this.securityService.getCurrentUser ().prefDefaultDataSource === PlatformType.SEJ;
  }

  private static isHoldsTransactionFilter ( selection: Selection<any> ): boolean {
    const request = selection.getDefaultTransactionSearchRequest ();
    return request && request.transactionFilter === CustomerTransactionFilterType.HOLDS;
  }
}
