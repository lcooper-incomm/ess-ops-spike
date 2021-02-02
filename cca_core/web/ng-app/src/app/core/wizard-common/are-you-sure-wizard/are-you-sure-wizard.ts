import {Type} from '@angular/core';
import {AreYouSurePageComponent} from './are-you-sure-page/are-you-sure-page.component';
import {AbstractWizard} from '../../wizard/abstract-wizard';
import {WizardPage} from '../../wizard/wizard-page';

/**
 * A generic wizard to ask an are you sure question.  The model defaults to an onAction
 * of false.  If you say no, it cancels the wizard.  The yes action button updates the
 * onAction to true.
 */
export class AreYouSureWizard extends AbstractWizard<AreYouSureWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'are-you-sure';
  startingPageKey: string = 'page';

  constructor() {
    super();
    this.model     = new AreYouSureWizardModel();
    this.doRefresh = false;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('page', AreYouSurePageComponent);
  }
}

export class AreYouSureWizardModel {
  doAction: boolean = false;
  message: string;
}
