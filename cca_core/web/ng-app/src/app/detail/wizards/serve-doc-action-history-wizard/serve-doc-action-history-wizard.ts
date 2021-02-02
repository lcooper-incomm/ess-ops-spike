import {Type} from '@angular/core';
import {MaplesPlatform} from '@cscore/maples-client-model';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {ServeDocActionHistoryFormPageComponent} from './serve-doc-action-history-form-page/serve-doc-action-history-form-page.component';

export class ServeDocActionHistoryWizard extends AbstractWizard<ServeDocActionHistoryWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'serve-doc-action-history';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new ServeDocActionHistoryWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ServeDocActionHistoryFormPageComponent);
  }
}

export class ServeDocActionHistoryWizardModel {
  accountId: string;
  documentId: string;
  platform: MaplesPlatform;
}
