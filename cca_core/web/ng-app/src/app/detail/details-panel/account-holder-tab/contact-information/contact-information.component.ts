import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../../../core/cca-base-component";
import { CsCoreAddressType, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { Selection } from "../../../../core/session/model/selection";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { EditCustomerContactWizard } from 'src/app/detail/selection-action-toolbar/edit-customer-account/edit-customer-contact/edit-customer-contact-wizard';
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { AccountHolderActionService } from '../account-holder-action.service';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';
import { tap } from 'rxjs/operators';

@Component ( {
  selector: 'cca-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: [ './contact-information.component.scss' ]
} )
export class ContactInformationComponent extends CcaBaseComponent implements OnInit {
  actions: ActionToolbarButtonStatus[] = [];
  AddressType                          = CsCoreAddressType;
  buildingActions: boolean             = false;
  CsCorePhoneNumberType                = CsCorePhoneNumberType;
  selection: Selection<any>;

  constructor ( private actionService: AccountHolderActionService,
                private store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  openEditDialog () {
    const wizard           = new EditCustomerContactWizard ();
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  private subscribeToSessionState (): void {
    this.buildingActions = true;
    const complete       = () => this.buildingActions = false;
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .pipe ( tap ( complete, complete ) )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;
            if ( this.selection && this.selection.getCustomer () ) {
              this.actions = [ this.actionService.checkEditAccountHolderContact ( state.session, this.selection ) ];
            }
          }
        } )
    );
  }
}
