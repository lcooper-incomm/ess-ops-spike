import {Type} from '@angular/core';
import {
  MaplesAccountBalance,
  MaplesAccountWithdrawRequest,
  MaplesFundingSource,
  MaplesPlatform
} from '@cscore/maples-client-model';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {RefundAccountFormPageComponent} from './refund-account-form-page/refund-account-form-page.component';
import {RefundAccountConfirmationPageComponent} from './refund-account-confirmation-page/refund-account-confirmation-page.component';
import {RefundAccountResultPageComponent} from './refund-account-result-page/refund-account-result-page.component';
import {AuditActivityType} from '../../../core/audit/audit-activity-type.enum';
import {IdentifierType} from '../../../core/session/model/identifier-type.enum';
import {CsCoreAddress} from '@cscore/core-client-model';
import {CsCoreCurrency} from '@cscore/gringotts';

export class RefundAccountWizard extends AbstractWizard<RefundAccountWizardModel> {

  doRefresh: boolean      = true;
  displayStepper: boolean = true;
  key: string             = 'refund-account';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new RefundAccountWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', RefundAccountFormPageComponent);
    pageMap.set('confirmation-page', RefundAccountConfirmationPageComponent);
    pageMap.set('result-page', RefundAccountResultPageComponent);
  }
}

export class RefundAccountWizardModel {
  accountId: string;
  documentId: string;
  balance: CsCoreCurrency;
  address: CsCoreAddress;
  linkedAccounts: MaplesFundingSource[] = [];
  request: MaplesAccountWithdrawRequest = new MaplesAccountWithdrawRequest();
  success: number;
  comment: string;
  auditActivityType: AuditActivityType;
  platform: MaplesPlatform;
  identifierType: IdentifierType;
}
