import { Injectable } from '@angular/core';
import { ActionService } from './action-service';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { SecurityService } from 'src/app/core/security/security.service';
import { Session } from 'src/app/core/session/model/session';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';
import { Permission } from 'src/app/core/auth/permission';
import { TokenDetail } from 'src/app/core/card/token-detail';
import { snapshot } from 'src/app/core/store-utils/store-utils';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { AppStateType } from 'src/app/app-state-type.enum';
import { SessionState } from 'src/app/core/session/session-state';
import { UpdateDeviceStatusWizard } from 'src/app/core/action/vms-actions/update-device-status-wizard/update-device-status-wizard';
import { Customer } from 'src/app/core/customer/customer';
import { Selection } from 'src/app/core/session/model/selection';
import { ChangeDeviceStatus } from 'src/app/core/action/vms-actions/models/vms-request-models';

@Injectable ( {
  providedIn: 'root'
} )
export class MobileWalletDeviceActionService extends ActionService {

  constructor (
    securityService: SecurityService,
    private store: Store<AppState>,
    private wizardRunner: WizardRunner
  ) {
    super ( securityService )
  }

  checkDeleteDevice ( session: Session, selection: Selection<Customer>, token: TokenDetail ): ActionToolbarButtonStatus {
    const allowedStatuses = [
      TokenStatus.ACTIVE,
      TokenStatus.SUSPENDED,
      TokenStatus.INACTIVE,
      TokenStatus.DEACTIVATED,
    ];
    return this.checkStatusChange ( session, selection, 'Delete', token, allowedStatuses, ChangeDeviceStatus.DELETE_TOKEN );
  }

  checkResumeDevice ( session: Session, selection: Selection<Customer>, token: TokenDetail ): ActionToolbarButtonStatus {
    const allowedStatuses = [
      TokenStatus.SUSPENDED,
      TokenStatus.INACTIVE,
      TokenStatus.DEACTIVATED,
    ];
    return this.checkStatusChange ( session, selection, 'Resume', token, allowedStatuses, ChangeDeviceStatus.RESUME_TOKEN );
  }

  checkSuspendDevice ( session: Session, selection: Selection<Customer>, token: TokenDetail ): ActionToolbarButtonStatus {
    const allowedStatuses = [
      TokenStatus.ACTIVE,
      TokenStatus.INACTIVE,
      TokenStatus.DEACTIVATED,
    ];
    return this.checkStatusChange ( session, selection, 'Suspend', token, allowedStatuses, ChangeDeviceStatus.SUSPEND_TOKEN );
  }

  doAllChecksForToken ( token: TokenDetail ): ActionToolbarButtonStatus[] {
    const sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    const session                    = sessionState && sessionState.session;
    const selection                  = sessionState.selection;
    return [
      this.checkDeleteDevice ( session, selection as Selection<Customer>, token ),
      this.checkSuspendDevice ( session, selection as Selection<Customer>, token ),
      this.checkResumeDevice ( session, selection as Selection<Customer>, token ),
    ];
  }

  private checkStatusChange ( session: Session, selection: Selection<Customer>, label: string, token: TokenDetail, allowedStatuses: TokenStatus[], status: ChangeDeviceStatus ): ActionToolbarButtonStatus {
    const action          = new ActionToolbarButtonStatus ();
    action.label          = label;
    action.isVisible      = true;
    action.onClick        = () => {
      const wizard          = new UpdateDeviceStatusWizard ();
      wizard.model.comment  = 'Status Change requested through CCA';
      wizard.model.customer = selection.getCustomer ();
      wizard.model.status   = status;
      wizard.model.token    = token;
      this.wizardRunner.run ( wizard );
    };
    action.disabledReason = this.checkCanUpdateDeviceStatus ( session, token.status, allowedStatuses );
    return action;
  }

  private checkCanUpdateDeviceStatus (
    session: Session,
    status: string,
    allowedStatuses: TokenStatus[],
  ): string | null {
    // Must have session assigned
    if ( !this.isSessionAssignedToCurrentUser ( session ) ) {
      return ActionService.NOT_OWN_SESSION;
    }
    // Must have permission
    else if ( !this.securityService.hasPermission ( Permission.VMS_UPDATE_DEVICE_STATUS ) ) {
      return ActionService.NO_PERMISSION;
    }
    // Device status must be allowed
    else if ( !(allowedStatuses as string[]).includes ( status ) ) {
      return 'Device is not in an eligible status to perform this action.';
    }

    return null;
  }
}

export enum TokenStatus {
  ACTIVE      = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  INACTIVE    = 'INACTIVE',
  SUSPENDED   = 'SUSPENDED',
}
