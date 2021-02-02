import {Type} from '@angular/core';
import {MaplesCancelTransactionRequest, MaplesPlatform, MaplesTransaction} from '@cscore/maples-client-model';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {ServeCancelTransactionFormPageComponent} from './form-page/form-page.component';
import {ServeCancelTransactionConfirmationPageComponent} from './confirmation-page/confirmation-page.component';
import {ServeCancelTransactionResultPageComponent} from './result-page/result-page.component';
import {AuditActivityType} from '../../../core/audit/audit-activity-type.enum';

export class ServeCancelTransactionWizard extends AbstractWizard<ServeCancelTransactionWizardModel> {

  doRefresh: boolean      = true;
  displayStepper: boolean = true;
  key: string             = 'serve-cancel-transaction';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new ServeCancelTransactionWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ServeCancelTransactionFormPageComponent);
    pageMap.set('confirmation-page', ServeCancelTransactionConfirmationPageComponent);
    pageMap.set('result-page', ServeCancelTransactionResultPageComponent);
  }
}

export class ServeCancelTransactionWizardModel {
  accountId: string;
  transaction: MaplesTransaction;
  eventId: string;
  comment: string;
  request: MaplesCancelTransactionRequest = new MaplesCancelTransactionRequest();
  success: number;
  platform: MaplesPlatform;
  isPreauth: boolean = false;

  get auditActivityType(): AuditActivityType {
    return this.isPreauth ? AuditActivityType.CANCEL_PREAUTH_TRANSACTION : AuditActivityType.CANCEL_TRANSACTION;
  }

  get message(): string {
    const type = this.isPreauth ? 'pre-auth' : 'scheduled';
    const date = this.isPreauth ? this.transaction.getDate() : this.transaction.schedule.eventDate;
    return `Cancel ${type} transaction for ${this.transaction.amounts.authorizedAmount.displayValue} on ${date.displayValue}.`;
  }
}
