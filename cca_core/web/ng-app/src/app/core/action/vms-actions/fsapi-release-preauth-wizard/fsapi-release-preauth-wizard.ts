import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Customer } from "src/app/core/customer/customer";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import { Type } from "@angular/core";
import { Transaction } from "src/app/core/transaction/transaction";
import { FsapiReleasePreauthFormPageComponent } from "./fsapi-release-preauth-form-page/fsapi-release-preauth-form-page.component";
import { FsapiReleasePreauthConfirmationPageComponent } from "./fsapi-release-preauth-confirmation-page/fsapi-release-preauth-confirmation-page.component";
import { FsapiReleasePreauthResultPageComponent } from "./fsapi-release-preauth-result-page/fsapi-release-preauth-result-page.component";
import { ReasonCode } from "../../product-action-reason-code";
import { Selection } from "src/app/core/session/model/selection";

export class FsapiReleasePreauthWizard extends AbstractWizard<FsapiReleasePreauthWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'vms-release-preauth';    // todo rename this to 'fsapi-release-preauth' after we come up with a SQL script to update existing codexes
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new FsapiReleasePreauthWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', FsapiReleasePreauthFormPageComponent );
    pageMap.set ( 'confirmation-page', FsapiReleasePreauthConfirmationPageComponent );
    pageMap.set ( 'result-page', FsapiReleasePreauthResultPageComponent );
  }
}

export class FsapiReleasePreauthWizardModel {
  comment: string;
  reason: ReasonCode;
  selection: Selection<Customer>;
  success: boolean = true;
  transaction: Transaction;
}
