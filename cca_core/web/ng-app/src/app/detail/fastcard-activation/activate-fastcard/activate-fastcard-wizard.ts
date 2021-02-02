import { Type } from "@angular/core";

import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import {
  ActivateFastcardFormPageComponent,
  MerchantId
} from "./activate-fastcard-form-page/activate-fastcard-form-page.component";
import { ActivateFastcardConfirmationPageComponent } from "./activate-fastcard-confirmation-page/activate-fastcard-confirmation-page.component";
import { Selection } from "src/app/core/session/model/selection";
import { Location } from "src/app/core/node/location/location";
import { FastcardSuccessPageComponent } from "../fastcard-success-page/fastcard-success-page.component";
import { ActivateFastcardRequest } from "../aps/aps-request";
import { FastcardFailurePageComponent } from "../fastcard-failure-page/fastcard-failure-page.component";

export class ActivateFastcardWizard extends AbstractWizard<ActivateFastcardWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'activate-fastcard';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new ActivateFastcardWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key,
      'billable': this.model.billable,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ActivateFastcardFormPageComponent );
    pageMap.set ( 'confirmation-page', ActivateFastcardConfirmationPageComponent );
    pageMap.set ( 'success-page', FastcardSuccessPageComponent );
    pageMap.set ( 'failure-page', FastcardFailurePageComponent );
  }
}

export class ActivateFastcardWizardModel {
  selection: Selection<Location>;
  request: ActivateFastcardRequest;
  merchantId: MerchantId;
  billable: boolean = true;
  successMessage: string | null;
  failureMessage: string | null;
}
