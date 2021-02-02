import { Component } from '@angular/core';
import { ResumeOrderWizard, ResumeOrderWizardPageType } from "../resume-order-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-resume-order-results-page',
  templateUrl: './resume-order-results-page.component.html',
  styleUrls: [ './resume-order-results-page.component.scss' ]
} )
export class ResumeOrderResultsPageComponent extends WizardResultPage<ResumeOrderWizard> {

  key: string           = ResumeOrderWizardPageType.RESULTS_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
