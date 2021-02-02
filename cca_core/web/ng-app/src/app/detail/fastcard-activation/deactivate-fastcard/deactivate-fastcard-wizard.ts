import { Type } from "@angular/core";

import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import {
  DeactivateFastcardFormPageComponent,
  MerchantId
} from "./deactivate-fastcard-form-page/deactivate-fastcard-form-page.component";
import { DeactivateFastcardConfirmationPageComponent } from "./deactivate-fastcard-confirmation-page/deactivate-fastcard-confirmation-page.component";
import { Selection } from "src/app/core/session/model/selection";
import { Card } from "src/app/core/card/card";
import { DeactivateFastcardRequest } from "../aps/aps-request";
import { DeactivateFastcardResultPageComponent } from "./deactivate-fastcard-result-page/deactivate-fastcard-result-page.component";

export class DeactivateFastcardWizard extends AbstractWizard<DeactivateFastcardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'deactivate-fastcard';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new DeactivateFastcardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', DeactivateFastcardFormPageComponent );
    pageMap.set ( 'confirmation-page', DeactivateFastcardConfirmationPageComponent );
    pageMap.set ( 'result-page', DeactivateFastcardResultPageComponent );
  }
}

export class DeactivateFastcardWizardModel {
  selection: Selection<Card>;
  request: DeactivateFastcardRequest;
  merchantId: MerchantId;
  success: boolean = true;
}
