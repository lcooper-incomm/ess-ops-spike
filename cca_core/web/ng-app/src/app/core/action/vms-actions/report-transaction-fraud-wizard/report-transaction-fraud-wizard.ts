import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Customer } from "src/app/core/customer/customer";
import { Selection } from "src/app/core/session/model/selection";
import { WizardPage } from '../../../wizard/wizard-page';
import { Type } from '@angular/core';
import { ReportTransactionFraudConfirmationPageComponent } from "./report-transaction-fraud-confirmation-page/report-transaction-fraud-confirmation-page.component";
import { ReportTransactionFraudResultPageComponent } from "./report-transaction-fraud-result-page/report-transaction-fraud-result-page.component";
import { Transaction } from "src/app/core/transaction/transaction";

export class ReportTransactionFraudWizard extends AbstractWizard<ReportTransactionFraudWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'report-transaction-fraud';
  startingPageKey: string = 'confirmation-page';

  constructor () {
    super ();
    this.model     = new ReportTransactionFraudWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'confirmation-page', ReportTransactionFraudConfirmationPageComponent );
    pageMap.set ( 'result-page', ReportTransactionFraudResultPageComponent );
  }
}

export class ReportTransactionFraudWizardModel {
  selection: Selection<Customer>;
  transactions: Transaction[];
  success: boolean = true;
}
