import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { FullTransactionHistoryDetailsComponent } from "./full-transaction-history-details/full-transaction-history-details.component";
import { Transaction } from "../../../../core/transaction/transaction";

export class FullTransactionHistoryDetailsWizard extends AbstractWizard<FullTransactionHistoryDetailsWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'full-transaction-history-detail';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new FullTransactionHistoryDetailsWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', FullTransactionHistoryDetailsComponent );
  }
}

export class FullTransactionHistoryDetailsWizardModel {
  transaction: Transaction;
}
