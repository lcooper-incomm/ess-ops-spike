import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { UpdateCustomerAlertWizard } from "../update-customer-alert-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomerAlertsService } from "../../../../../core/customer/customer-alerts.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { Observable } from "rxjs";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-update-customer-alert-form-page',
  templateUrl: './update-customer-alert-form-page.component.html',
  styleUrls: [ './update-customer-alert-form-page.component.scss' ]
} )
export class UpdateCustomerAlertFormPageComponent extends WizardPage<UpdateCustomerAlertWizard> implements OnInit {

  isValuedAlert: boolean = false;
  key: string            = 'form-page';
  wizardForm: FormGroup  = new FormGroup ( {} );

  constructor ( private customerAlertsService: CustomerAlertsService,
                private store: Store<AppState>,
                private toast: ToastFactory ) {
    super ();
    this.closeButtonText = 'Cancel';
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Save';
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    let alert   = _.clone ( this.wizard.model.alert );
    alert.type  = this.wizardForm.value.type;
    alert.value = this.wizardForm.value.value;

    return this.customerAlertsService.updateOne ( this.wizard.model.selection.getCustomer ().id, this.wizard.model.selection.customerAlerts, alert );
  }

  private initForm (): void {
    this.isValuedAlert = !_.isNil ( this.wizard.model.alert.value );
    this.wizardForm    = new FormGroup ( {
      type: new FormControl ( this.wizard.model.alert.type, [ Validators.required ] ),
      value: new FormControl ( this.isValuedAlert ? this.wizard.model.alert.value.value.toString () : null, [] )
    } );
  }

}
