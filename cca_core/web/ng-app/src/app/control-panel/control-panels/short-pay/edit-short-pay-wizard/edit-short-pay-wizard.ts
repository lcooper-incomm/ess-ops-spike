import {Type} from '@angular/core';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {ShortPay} from '../../../../core/short-pay/short-pay';
import {EditShortPayFormPageComponent} from './edit-short-pay-form-page/edit-short-pay-form-page.component';

/**
 * Single page wizard to update the OpCode.
 */
export class EditShortPayWizard extends AbstractWizard<EditShortPayWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'edit-short-pay';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new EditShortPayWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', EditShortPayFormPageComponent);
  }
}

export class EditShortPayWizardModel {
  shortPay: ShortPay;
}
