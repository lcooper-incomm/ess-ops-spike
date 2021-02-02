import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { CustomerFeePlanService } from "../../../../core/customer/customer-fee-plan.service";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { FeePlan } from "../../../../core/model/fee-plan";
import { Customer } from 'src/app/core/customer/customer';

@Component ( {
  selector: 'cca-customer-fee-section',
  templateUrl: './customer-fee-section.component.html',
  styleUrls: [ './customer-fee-section.component.scss' ]
} )
export class CustomerFeeSectionComponent extends AbstractSelectionAwareComponent<Customer> implements OnInit {

  dormancyFee: string;
  monthlyFee: string;

  @ViewChild ( 'feeSpinner' )
  spinner: SpinnerComponent;

  private attemptedToLoadFeePlans: boolean = false;

  constructor ( private feePlanService: CustomerFeePlanService,
                protected store: Store<AppState> ) {
    super ( store )
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  private getFeesFromFeePlan (): void {
    this.dormancyFee = null;
    this.monthlyFee  = null;

    let activeFeePlan: FeePlan = this.selection.getActiveFeePlan ();
    if ( activeFeePlan ) {
      /*
      This part is STUPID. There is no consistency in VMS for the fee names, and they even have typos in their names! So,
      if we don't find it by CCA's first choice, try a few others we've been made aware of...
       */

      let dormancyFeeDetail = activeFeePlan.getFeeDetailByType ( 'DORMANCY FEE' );
      if ( !dormancyFeeDetail ) {
        dormancyFeeDetail = activeFeePlan.getFeeDetailByDescription ( 'DORMACY FEE' ); // <-- Yep, for real...
      }

      if ( dormancyFeeDetail ) {
        this.dormancyFee = dormancyFeeDetail.amount ? dormancyFeeDetail.amount.displayValue : null;
      }

      let monthlyFeeDetail = activeFeePlan.getFeeDetailByType ( 'MONTHLY FEE TYPES' );
      if ( !monthlyFeeDetail ) {
        monthlyFeeDetail = activeFeePlan.getFeeDetailByType ( 'NEXTCALA MONTHLY FEE' );
      }
      if ( monthlyFeeDetail ) {
        this.monthlyFee = monthlyFeeDetail.amount ? monthlyFeeDetail.amount.displayValue : null;
      }
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            if ( state.selection && state.selection.feePlans.length ) {
              this.getFeesFromFeePlan ();
            }
          }
        } )
    );
  }
}
