import {Type} from '@angular/core';
import {MaplesAddDocumentAction, MaplesPlatform} from '@cscore/maples-client-model';
import {AbstractWizard} from '../../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AddDocumentActionFormPageComponent} from './add-document-action-form-page/add-document-action-form-page.component';
import {AddDocumentActionConfirmationPageComponent} from './add-document-action-confirmation-page/add-document-action-confirmation-page.component';
import {AddDocumentActionResultPageComponent} from './add-document-action-result-page/add-document-action-result-page.component';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {IdentifierType} from '../../../../core/session/model/identifier-type.enum';

export class AddDocumentActionWizard extends AbstractWizard<AddDocumentActionWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'add-document-action';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new AddDocumentActionWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AddDocumentActionFormPageComponent);
    pageMap.set('confirmation-page', AddDocumentActionConfirmationPageComponent);
    pageMap.set('result-page', AddDocumentActionResultPageComponent);
  }
}

export class AddDocumentActionWizardModel {
  accountId: string;
  documentId: string;
  request: MaplesAddDocumentAction = new MaplesAddDocumentAction({
    outcome: 'Approved',
    type: 'Document Approved'
  });
  success: number;
  auditActivityType: AuditActivityType;
  platform: MaplesPlatform;
  identifierType: IdentifierType;
  identifier: string;
}
