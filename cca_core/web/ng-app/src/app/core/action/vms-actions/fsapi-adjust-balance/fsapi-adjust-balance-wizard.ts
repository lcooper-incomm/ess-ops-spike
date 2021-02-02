import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FsapiAdjustBalanceConfirmationPageComponent } from './fsapi-adjust-balance-confirmation-page/fsapi-adjust-balance-confirmation-page.component';
import { FsapiAdjustBalanceResultPageComponent } from './fsapi-adjust-balance-result-page/fsapi-adjust-balance-result-page.component';
import { FsapiAdjustBalanceFormPageComponent } from "./fsapi-adjust-balance-form-page/fsapi-adjust-balance-form-page.component";
import { Customer } from "src/app/core/customer/customer";
import { TransactionType } from '../../../transaction/transaction-type.enum';
import { ReasonCode } from "../../product-action-reason-code";
import { Selection } from "src/app/core/session/model/selection";

export class FsapiAdjustBalanceWizard extends AbstractWizard<FsapiAdjustBalanceWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'fsapi-adjust-balance';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new FsapiAdjustBalanceWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', FsapiAdjustBalanceFormPageComponent );
    pageMap.set ( 'confirmation-page', FsapiAdjustBalanceConfirmationPageComponent );
    pageMap.set ( 'result-page', FsapiAdjustBalanceResultPageComponent );
  }
}

export class FsapiAdjustBalanceWizardModel {
  adjustmentType: TransactionType;
  amount: number;
  comment: string;
  reason: ReasonCode;
  selection: Selection<Customer>;
  success: boolean = true;
}
