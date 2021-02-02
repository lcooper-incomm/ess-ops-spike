import {Type} from '@angular/core';
import {MaplesAccountDocument, MaplesPlatform} from '@cscore/maples-client-model';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {ServeArchiveDocumentFormPageComponent} from './form-page/form-page.component';
import {ServeArchiveDocumentConfirmationPageComponent} from './confirmation-page/confirmation-page.component';
import {ServeArchiveDocumentResultPageComponent} from './result-page/result-page.component';

export class ServeArchiveDocumentWizard extends AbstractWizard<ServeArchiveDocumentWizardModel> {

  doRefresh               = true;
  displayStepper: boolean = true;
  key: string             = 'serve-archive-document';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new ServeArchiveDocumentWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ServeArchiveDocumentFormPageComponent);
    pageMap.set('confirmation-page', ServeArchiveDocumentConfirmationPageComponent);
    pageMap.set('result-page', ServeArchiveDocumentResultPageComponent);
  }
}

export class ServeArchiveDocumentWizardModel {
  accountId: string;
  document: MaplesAccountDocument;
  platform: MaplesPlatform;
  comment: string;
  success: number;
}
