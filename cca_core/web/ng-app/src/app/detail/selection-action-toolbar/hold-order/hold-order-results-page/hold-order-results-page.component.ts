import { Component } from '@angular/core';
import { HoldOrderWizard, HoldOrderWizardPageType } from "../hold-order-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-hold-order-results-page',
  templateUrl: './hold-order-results-page.component.html',
  styleUrls: [ './hold-order-results-page.component.scss' ]
} )
export class HoldOrderResultsPageComponent extends WizardResultPage<HoldOrderWizard> {

  key: string           = HoldOrderWizardPageType.RESULTS_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
