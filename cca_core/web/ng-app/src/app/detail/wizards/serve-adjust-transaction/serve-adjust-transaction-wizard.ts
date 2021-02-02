import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ServeAdjustTransactionFormPageComponent } from './serve-adjust-transaction-form-page/serve-adjust-transaction-form-page.component';
import { ServeAdjustTransactionConfirmationPageComponent } from './serve-adjust-transaction-confirmation-page/serve-adjust-transaction-confirmation-page.component';
import { ServeAdjustTransactionResultPageComponent } from './serve-adjust-transaction-result-page/serve-adjust-transaction-result-page.component';
import { MaplesPlatform, MaplesTransaction } from '@cscore/maples-client-model';
import { CsCoreCurrency } from '@cscore/gringotts';

export class ServeAdjustTransactionWizard extends AbstractWizard<ServeAdjustTransactionWizardModel> {
  doRefresh: boolean = true;
  displayStepper: boolean = true;
  key: string = 'serve-adjust-transaction';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new ServeAdjustTransactionWizardModel();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ServeAdjustTransactionFormPageComponent );
    pageMap.set ( 'confirmation-page', ServeAdjustTransactionConfirmationPageComponent );
    pageMap.set ( 'result-page', ServeAdjustTransactionResultPageComponent );
  }
}

export class ServeAdjustTransactionWizardModel {
  accountId: string;
  transaction: MaplesTransaction;
  cardId: string;
  amount: CsCoreCurrency;
  platform: MaplesPlatform;
  comment: string;
  success: number;
}