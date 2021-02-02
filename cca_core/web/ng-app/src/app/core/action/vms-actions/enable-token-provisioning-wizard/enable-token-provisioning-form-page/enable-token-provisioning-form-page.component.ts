import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { EnableTokenProvisioningWizard } from '../enable-token-provisioning-wizard';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SecurityService } from 'src/app/core/security/security.service';
import { Permission } from 'src/app/core/auth/permission';

@Component ( {
  selector: 'cca-enable-token-provisioning-form-page',
  templateUrl: './enable-token-provisioning-form-page.component.html',
  styleUrls: [ './enable-token-provisioning-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class EnableTokenProvisioningFormPageComponent extends WizardPage<EnableTokenProvisioningWizard> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private formBuilder: FormBuilder, private securityService: SecurityService ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    this.wizard.model.comment           = this.getValueFromForm<string> ( 'comment' );
    this.wizard.model.isOverrideApplied = this.getValueFromForm<boolean> ( 'isOverrideApplied' );
    return of ( 'confirmation-page' );
  }

  get checkboxTooltip (): string {
    return this.wizard.model.wasOverrideAppliedAtDialogOpen ?
      'The Fraud Check Override has already been applied to this account' :
      'Check this box to disable fraud checks when provisioning Mobile Wallet';
  }

  get enableOverrideCheckbox (): boolean {
    return !this.wizard.model.wasOverrideAppliedAtDialogOpen && this.securityService.hasPermission ( Permission.VMS_MOBILE_WALLET_FRAUD_CHECK_OVERRIDE );
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'comment': [ null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ],
      'isOverrideApplied': [ { value: this.wizard.model.isOverrideApplied, disabled: !this.enableOverrideCheckbox } ],
    } );
  }
}
