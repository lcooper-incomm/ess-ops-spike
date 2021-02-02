import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { WizardPage } from "../../../../wizard/wizard-page";
import { Type } from "@angular/core";
import { ResetOnlinePasswordConfirmPageComponent } from "./reset-online-password-confirm-page/reset-online-password-confirm-page.component";
import { ResetOnlinePasswordResultsPageComponent } from "./reset-online-password-results-page/reset-online-password-results-page.component";
import { Customer } from "src/app/core/customer/customer";

export class ResetOnlinePasswordWizard extends AbstractWizard<ResetOnlinePasswordWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'reset-online-password';
  startingPageKey: string = 'confirmation-page';

  constructor () {
    super ();
    this.model     = new ResetOnlinePasswordWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'action-failed': this.model.actionFailed,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'confirmation-page', ResetOnlinePasswordConfirmPageComponent );
    pageMap.set ( 'result-page', ResetOnlinePasswordResultsPageComponent );
  }
}

export class ResetOnlinePasswordWizardModel {
  actionFailed: boolean = true;
  customer: Customer;
}
