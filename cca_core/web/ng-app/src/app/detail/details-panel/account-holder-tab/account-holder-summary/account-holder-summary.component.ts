import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Selection } from "../../../../core/session/model/selection";
import { CsCoreAddressType, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { DateService } from "../../../../core/date/date.service";
import { Session } from 'src/app/core/session/model/session';
import { AccountHolderActionService } from '../account-holder-action.service';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';
import { tap } from 'rxjs/operators';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { KycFailureWizard } from 'src/app/core/action/vms-actions/kyc-failure/kyc-failure-wizard';

@Component ( {
  selector: 'cca-account-holder-summary',
  templateUrl: './account-holder-summary.component.html',
  styleUrls: [ './account-holder-summary.component.scss' ]
} )
export class AccountHolderSummaryComponent extends CcaBaseComponent implements OnInit {
  actions: ActionToolbarButtonStatus[] = [];
  AddressType                          = CsCoreAddressType;
  buildingActions: boolean             = false;
  CsCorePhoneNumberType                = CsCorePhoneNumberType;
  dateOfBirth: string;
  selection: Selection<any>;
  session: Session;

  constructor ( private actionService: AccountHolderActionService,
                private dateService: DateService,
                private store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  get kycStatus (): string {
    const customer = this.selection && this.selection.getCustomer ();
    return customer && customer.kyc && customer.kyc.status;
  }

  get showKycFailureLink (): boolean {
    return this.kycStatus && this.kycStatus.indexOf ( 'SUCCESS' ) === -1 && this.kycStatus.indexOf ( 'PENDING' ) === -1;
  }

  openKycDialog (): void {
    const wizard           = new KycFailureWizard ();
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  private setDateOfBirth (): void {
    if ( this.selection && this.selection.getCustomer () && this.selection.getCustomer ().dateOfBirth ) {
      this.dateOfBirth = this.dateService.convertYYYYMMDDToMMDDYYYY ( this.selection.getCustomer ().dateOfBirth );
    } else {
      this.dateOfBirth = null;
    }
  }

  private subscribeToSessionState (): void {
    this.buildingActions = true;
    const complete       = () => this.buildingActions = false;
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .pipe ( tap ( complete, complete ) )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.session   = state.session;
            this.selection = state.selection;
            this.setDateOfBirth ();

            this.actions = [ this.actionService.checkEditAccountHolderSummary ( state.session, this.selection ) ];
          }
        } )
    );
  }
}
