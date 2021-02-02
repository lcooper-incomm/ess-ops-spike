import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { ChangeFeePlanVmsWizard } from "../change-fee-plan-vms-wizard";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { CustomerService } from "../../../../../core/customer/customer.service";
import { catchError, map } from "rxjs/operators";
import { FsapiGenericResponse } from "../../../../../core/model/fsapi-generic-response";
import { SetSelectionFeePlansAction } from "../../../../../core/session/action/session-actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";

@Component ( {
  selector: 'cca-change-fee-plan-vms-review',
  templateUrl: './change-fee-plan-vms-review.component.html',
  styleUrls: [ './change-fee-plan-vms-review.component.scss' ]
} )
export class ChangeFeePlanVmsReviewComponent extends WizardPage<ChangeFeePlanVmsWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private customerService: CustomerService,
                private store: Store<AppState> ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit () {
  }

  onNext (): Observable<any> {
    return this.customerService.updateAccount ( this.wizard.model.customerId, this.wizard.model.request )
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( value: FsapiGenericResponse ) => {
          this.updateStore ();
          return 'confirmation-page';
        } )
      );
  }

  updateStore () {
    this.wizard.model.selection.getActiveFeePlan ().isActive                                                         = false
    this.wizard.model.selection.feePlans.find ( feePlan => feePlan.id === this.wizard.model.newFeePlan.id ).isActive = true;
    this.wizard.model.selection.feePlans.push.apply ( this.wizard.model.selection.feePlans, this.wizard.model.newFeePlan );
    this.store.dispatch ( new SetSelectionFeePlansAction ( this.wizard.model.selection ) );
  }
}
