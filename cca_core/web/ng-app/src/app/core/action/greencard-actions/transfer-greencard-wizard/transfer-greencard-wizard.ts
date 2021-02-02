import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Card } from 'src/app/core/card/card';
import { TransferGreencardFormPageComponent } from './transfer-greencard-form-page/transfer-greencard-form-page.component';
import { TransferGreencardConfirmationPageComponent } from './transfer-greencard-confirmation-page/transfer-greencard-confirmation-page.component';
import { TransferGreencardResultPageComponent } from './transfer-greencard-result-page/transfer-greencard-result-page.component';
import { Selection } from 'src/app/core/session/model/selection';

export class TransferGreencardWizard extends AbstractWizard<TransferGreencardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'transfer-greencard';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new TransferGreencardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', TransferGreencardFormPageComponent );
    pageMap.set ( 'confirmation-page', TransferGreencardConfirmationPageComponent );
    pageMap.set ( 'result-page', TransferGreencardResultPageComponent );
  }
}

export class TransferGreencardWizardModel {
  comment: string;
  newSerialNumber: string;
  selection: Selection<Card>;
  success: boolean = true;
}
