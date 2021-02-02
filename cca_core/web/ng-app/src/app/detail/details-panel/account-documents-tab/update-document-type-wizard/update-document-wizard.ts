import {Type} from '@angular/core';
import {MaplesAccountDocument, MaplesPlatform, UpdateDocumentRequest} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {IdentifierType} from '../../../../core/session/model/identifier-type.enum';
import {UpdateDocumentFormPageComponent} from './update-document-form-page/update-document-form-page.component';
import {UpdateDocumentConfirmationPageComponent} from './update-document-confirmation-page/update-document-confirmation-page.component';
import {UpdateDocumentResultPageComponent} from './update-document-result-page/update-document-result-page.component';

export class UpdateDocumentWizard extends AbstractWizard<UpdateDocumentWizardModel> {

  doRefresh: boolean      = true;
  displayStepper: boolean = true;
  key: string             = 'update-document';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new UpdateDocumentWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', UpdateDocumentFormPageComponent);
    pageMap.set('confirmation-page', UpdateDocumentConfirmationPageComponent);
    pageMap.set('result-page', UpdateDocumentResultPageComponent);
  }
}

export class UpdateDocumentWizardModel {
  accountId: string;
  document: MaplesAccountDocument;
  request: UpdateDocumentRequest = new UpdateDocumentRequest();
  success: number;
  comment: string;
  auditActivityType: AuditActivityType;
  platform: MaplesPlatform;
  identifierType: IdentifierType;
  identifier: string;
}
