import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { ReportTransactionFraudWizard } from '../report-transaction-fraud-wizard';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-report-transaction-fraud-result-page',
  templateUrl: './report-transaction-fraud-result-page.component.html',
  styleUrls: [ './report-transaction-fraud-result-page.component.scss' ]
} )
export class ReportTransactionFraudResultPageComponent extends WizardResultPage<ReportTransactionFraudWizard> {

  constructor () {
    super ();
    this.width = WizardWidth.LARGE;
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
