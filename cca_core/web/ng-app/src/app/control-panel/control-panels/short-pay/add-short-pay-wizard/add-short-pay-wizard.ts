import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AddShortPayFormPageComponent} from './add-short-pay-form-page/add-short-pay-form-page.component';
import {ShortPay} from '../../../../core/short-pay/short-pay';

/**
 * Single page wizard to update the OpCode.
 */
export class AddShortPayWizard extends AbstractWizard<AddShortPayWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'add-short-pay';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddShortPayWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddShortPayFormPageComponent);
  }
}

export class AddShortPayWizardModel {
  shortPay: ShortPay;
  merchantIds: string[] = [];
  locationIds: string[] = [];
  terminalIds: string[] = [];
}
