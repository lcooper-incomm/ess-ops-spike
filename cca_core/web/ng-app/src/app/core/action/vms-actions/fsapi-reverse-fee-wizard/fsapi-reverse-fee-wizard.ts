import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Customer } from 'src/app/core/customer/customer';
import { ReasonCode } from '../../product-action-reason-code';
import { Selection } from 'src/app/core/session/model/selection';
import { FsapiReverseFeeFormPageComponent } from './fsapi-reverse-fee-form-page/fsapi-reverse-fee-form-page.component';
import { FsapiReverseFeeConfirmationPageComponent } from './fsapi-reverse-fee-confirmation-page/fsapi-reverse-fee-confirmation-page.component';
import { FsapiReverseFeeResultPageComponent } from './fsapi-reverse-fee-result-page/fsapi-reverse-fee-result-page.component';
import { Transaction } from 'src/app/core/transaction/transaction';

export class FsapiReverseFeeWizard extends AbstractWizard<FsapiReverseFeeWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'vms-reverse-fee';  //  todo rename this to 'activate-fsapi-card' after we come up with a SQL script to update existing codexes
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new FsapiReverseFeeWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', FsapiReverseFeeFormPageComponent );
    pageMap.set ( 'confirmation-page', FsapiReverseFeeConfirmationPageComponent );
    pageMap.set ( 'result-page', FsapiReverseFeeResultPageComponent );
  }
}

export class FsapiReverseFeeWizardModel {
  comment: string;
  reason: ReasonCode;
  selection: Selection<Customer>;
  success: boolean = true;
  transaction: Transaction;
}
