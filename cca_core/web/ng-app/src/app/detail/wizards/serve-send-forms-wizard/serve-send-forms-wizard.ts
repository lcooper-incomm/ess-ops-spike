import {Type} from '@angular/core';
import {MaplesEmailTemplate, MaplesPlatform} from '@cscore/maples-client-model';
import {ServeSendFormsConfirmationPageComponent} from './serve-send-forms-confirmation-page/serve-send-forms-confirmation-page.component';
import {ServeSendFormsFormPageComponent} from './serve-send-forms-form-page/serve-send-forms-form-page.component';
import {ServeSendFormsPreviewPageComponent} from './serve-send-forms-preview-page/serve-send-forms-preview-page.component';
import {ServeSendFormsResultPageComponent} from './serve-send-forms-result-page/serve-send-forms-result-page.component';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../core/wizard/wizard-page';

export class ServeSendFormsWizard extends AbstractWizard<ServeSendFormsWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'serve-send-forms';
  startingPageKey: string = 'preview-page';

  constructor() {
    super();
    this.model = new ServeSendFormsWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('preview-page', ServeSendFormsPreviewPageComponent);
    pageMap.set('form-page', ServeSendFormsFormPageComponent);
    pageMap.set('confirmation-page', ServeSendFormsConfirmationPageComponent);
    pageMap.set('result-page', ServeSendFormsResultPageComponent);
  }
}

export class ServeSendFormsWizardModel {
  accountId: string;
  request: MaplesEmailTemplate = new MaplesEmailTemplate();
  success: number;
  platform: MaplesPlatform;
}
