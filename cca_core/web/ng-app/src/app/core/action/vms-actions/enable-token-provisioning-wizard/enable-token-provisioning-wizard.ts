import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Customer } from "src/app/core/customer/customer";
import { Selection } from "src/app/core/session/model/selection";
import { EnableTokenProvisioningFormPageComponent } from './enable-token-provisioning-form-page/enable-token-provisioning-form-page.component';
import { EnableTokenProvisioningResultPageComponent } from './enable-token-provisioning-result-page/enable-token-provisioning-result-page.component';
import { EnableTokenProvisioningConfirmationPageComponent } from './enable-token-provisioning-confirmation-page/enable-token-provisioning-confirmation-page.component';

export class EnableTokenProvisioningWizard extends AbstractWizard<EnableTokenProvisioningWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'enable-token-provisioning';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new EnableTokenProvisioningWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
      'supported': this.model.supported,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', EnableTokenProvisioningFormPageComponent );
    pageMap.set ( 'confirmation-page', EnableTokenProvisioningConfirmationPageComponent );
    pageMap.set ( 'result-page', EnableTokenProvisioningResultPageComponent );
  }
}

export class EnableTokenProvisioningWizardModel {
  comment: string;
  isOverrideApplied: boolean;
  selection: Selection<Customer>;
  success: boolean   = true;
  supported: boolean = true;
  wasOverrideAppliedAtDialogOpen: boolean;
}
