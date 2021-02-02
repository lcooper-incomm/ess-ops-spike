import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Customer } from "../../../../core/customer/customer";
import { RedemptionDelay } from "../../../../core/customer/redemption-delay";
import { WizardRunner } from "../../../../core/wizard/wizard-runner/wizard-runner.service";
import { CustomerRedemptionDelayWizard } from "./customer-redemption-delay-wizard/customer-redemption-delay-wizard";

@Component ( {
  selector: 'cca-customer-redemption-delay-section',
  templateUrl: './customer-redemption-delay-section.component.html',
  styleUrls: [ './customer-redemption-delay-section.component.scss' ]
} )
export class CustomerRedemptionDelaySectionComponent extends AbstractSelectionAwareComponent<Customer> implements OnInit {

  allFundsAvailableDate: Date;
  maxWaitTime: number = 0;

  private isInitialized: boolean = false;

  constructor ( protected store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  openDialog (): void {
    let wizard                    = new CustomerRedemptionDelayWizard ();
    wizard.model.redemptionDelays = this.selection.getCustomer ().redemptionDelays;
    this.wizardRunner.run ( wizard );
  }

  private loadRedemptionDelay (): void {
    let customer: Customer = this.selection.getCustomer ();

    //Set max wait time
    if ( customer.redemptionDelays ) {
      customer.redemptionDelays.forEach ( ( delay: RedemptionDelay ) => {
        if ( delay.availableTime > this.maxWaitTime ) {
          this.maxWaitTime = delay.availableTime;
        }
      } );
    } else {
      this.maxWaitTime = 0;
    }

    //Set all funds available date
    this.allFundsAvailableDate = new Date ();
    this.allFundsAvailableDate.setTime ( this.allFundsAvailableDate.getTime () + this.maxWaitTime );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.data && !this.isInitialized ) {
            this.loadRedemptionDelay ();
          }
        } )
    );
  }

}
