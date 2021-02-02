import { Injectable } from '@angular/core';
import { Permission } from '../../../core/auth/permission';
import { SecurityService } from 'src/app/core/security/security.service';
import { Session } from '../../../core/session/model/session';
import { Selection } from '../../../core/session/model/selection';
import { ActionService } from '../../selection-action-toolbar/action-service';
import { PlatformType } from '../../../core/platform/platform-type.enum';
import { Card } from '../../../core/card/card';
import { FsapiStatusType } from '../../../core/status/fsapi-status/fsapi-status-type.enum';
import { ActionToolbarButtonStatus } from '../../../core/action-toolbar/action-toolbar-button-status';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { EditCustomerSummaryWizard } from '../../selection-action-toolbar/edit-customer-account/edit-customer-summary/edit-customer-summary-wizard';
import { DateService } from 'src/app/core/date/date.service';
import { EditCustomerContactWizard } from '../../selection-action-toolbar/edit-customer-account/edit-customer-contact/edit-customer-contact-wizard';
import { EditCustomerIdentificationWizard } from '../../selection-action-toolbar/edit-customer-account/edit-customer-identification/edit-customer-identification-wizard';

@Injectable ( {
  providedIn: 'root'
} )
export class AccountHolderActionService extends ActionService {

  static readonly RESTRICTED_FIELDS = 'No permission to edit restricted fields';

  constructor ( private dateService: DateService, securityService: SecurityService, private wizardRunner: WizardRunner ) {
    super ( securityService )
  }

  checkEditAccountHolderContact ( session: Session, selection: Selection<any> ): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus ();
    action.isVisible = true;
    action.label     = 'Edit';
    action.onClick   = () => {
      const wizard           = new EditCustomerContactWizard ();
      wizard.model.selection = selection;
      this.wizardRunner.run ( wizard );
    };

    action.disabledReason = this.checkEditAccountHolder ( session, selection );

    return action;
  }

  checkEditAccountHolderSummary ( session: Session, selection: Selection<any> ): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus ();
    action.isVisible = true;
    action.label     = 'Edit';
    action.onClick   = () => {
      const wizard           = new EditCustomerSummaryWizard ( this.dateService );
      wizard.model.selection = selection;
      wizard.model.session   = session;
      this.wizardRunner.run ( wizard );
    };

    action.disabledReason = this.checkEditAccountHolder ( session, selection );

    if ( !action.disabledReason ) {
      if ( selection.getCustomer ().isActiveUnregistered ) {
        action.disabledReason = 'Card must be registered to edit personal information';
      } else if ( !this.securityService.hasPermission ( Permission.VMS_EDIT_ACCOUNT_HOLDER_RESTRICTED_FIELDS ) ) {
        action.disabledReason = AccountHolderActionService.RESTRICTED_FIELDS;
      }
    }

    return action;
  }

  checkEditAccountHolderIdentification ( session: Session, selection: Selection<any> ): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus ();
    action.isVisible = true;
    action.label     = 'Edit';
    action.onClick   = () => {
      const wizard           = new EditCustomerIdentificationWizard ();
      wizard.model.selection = selection;
      this.wizardRunner.run ( wizard );
    };

    action.disabledReason = this.checkEditAccountHolder ( session, selection );

    if ( !action.disabledReason ) {
      if ( selection.getCustomer ().isActiveUnregistered ) {
        action.disabledReason = 'Card must be registered to edit identification';
      } else if ( !this.securityService.hasPermission ( Permission.VMS_EDIT_ACCOUNT_HOLDER_RESTRICTED_FIELDS ) ) {
        action.disabledReason = AccountHolderActionService.RESTRICTED_FIELDS;
      }
    }

    return action;
  }

  private checkEditAccountHolder ( session: Session, selection: Selection<any> ): string | null {
    //Must be users's own session
    if ( !this.isSessionAssignedToCurrentUser ( session ) ) {
      return ActionService.NOT_OWN_SESSION;
    }
    //Must have selection data loaded
    else if ( !this.isSelectionDataLoaded ( selection ) ) {
      return 'Card data must be loaded to perform this action.';
    }
    //Must have permission
    else if ( (selection.platform === PlatformType.VMS && !this.securityService.hasPermission ( Permission.VMS_EDIT_CARD_HOLDER ))
      || (selection.platform === PlatformType.CCL && !this.securityService.hasPermission ( Permission.CCL_EDIT_ACCOUNT )) ) {
      return ActionService.NO_PERMISSION;
    }
    //Must not be a gift card
    else if ( AccountHolderActionService.isVmsGiftCard ( selection ) ) {
      return 'Card must not be a gift card to perform this action.';
    }
    //Must have card in an eligible status (not CLOSED or INACTIVE)
    else {
      const eligibleCard = selection.getCustomer ().cards.find ( ( card: Card ) => {
        return ![ FsapiStatusType.CLOSED, FsapiStatusType.INACTIVE ].includes ( card.getFsapiStatus () );
      } );
      if ( !eligibleCard ) {
        return 'Account must have a card that is not Closed or Inactive to perform this action.';
      } else {
        return null;
      }
    }
  }

  private static isVmsGiftCard ( selection: Selection<any> ): boolean {
    return selection.platform === PlatformType.VMS && selection.getCustomer ().isVmsGiftCard;
  }
}
