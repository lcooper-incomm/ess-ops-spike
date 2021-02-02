import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../../core/wizard/wizard-page";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerAlertsService} from "../../../../../core/customer/customer-alerts.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../app-state";
import {ToastFactory} from "../../../../../toast/toast-factory.service";
import {Observable, of} from "rxjs";
import * as _ from "lodash";
import {UpdateAccountAlertWizard} from "../update-account-alert-wizard";
import {CustomerAccountService} from "../../../../../core/customer-account/customer-account.service";

@Component({
  selector: 'cca-update-account-alert-form-page',
  templateUrl: './update-account-alert-form-page.component.html',
  styleUrls: ['./update-account-alert-form-page.component.scss']
})
export class UpdateAccountAlertFormPageComponent extends WizardPage<UpdateAccountAlertWizard> implements OnInit {

  isValuedAlert: boolean = false;
  key: string            = 'form-page';
  wizardForm: FormGroup  = new FormGroup({});

  constructor(private customerAccountService: CustomerAccountService) {
    super();
    this.closeButtonText = 'Cancel';
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Save';
  }

  ngOnInit() {
    this.initForm();
  }

  onNext(): Observable<string> {
    let alert       = _.clone(this.wizard.model.alert);
    alert.type      = this.wizardForm.value.type;
    alert.threshold = this.wizardForm.value.value;
    return this.customerAccountService.updateOneAlert(this.wizard.model.selection.data.id, alert);
  }

  //TODO need to be updated or changed when APLS portion is complete
  private initForm(): void {
    this.isValuedAlert = !_.isNil(this.wizard.model.alert.threshold);
    this.wizardForm    = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      value: new FormControl(this.isValuedAlert ? this.wizard.model.alert.threshold.value.toString() : null, [])
    });
  }

}
