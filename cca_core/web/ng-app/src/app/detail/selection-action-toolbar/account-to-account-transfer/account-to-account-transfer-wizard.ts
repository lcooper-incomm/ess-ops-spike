import {Type} from '@angular/core';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {Selection} from '../../../core/session/model/selection';
import {AccountToAccountTransferFormPageComponent} from './account-to-account-transfer-form-page/account-to-account-transfer-form-page.component';
import {AccountToAccountTransferReviewPageComponent} from './account-to-account-transfer-review-page/account-to-account-transfer-review-page.component';
import {AccountToAccountTransferConfirmationPageComponent} from './account-to-account-transfer-confirmation-page/account-to-account-transfer-confirmation-page.component';
import {AccountToAccountAddAccountPageComponent} from './account-to-account-add-account-page/account-to-account-add-account-page.component';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {CustomerAccountService} from '../../../core/customer-account/customer-account.service';
import {MaplesSimpleAccountInfo} from '../../../core/session/model/maples-simple-account-info';
import {SecurityService} from '../../../core/security/security.service';
import {Permission} from '../../../core/auth/permission';

export class AccountToAccountTransferWizard extends AbstractWizard<AccountToAccountTransferWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'account-to-account-transfer';
  startingPageKey: string = 'form-page';

  constructor(private customerAccountService: CustomerAccountService,
              private securityService: SecurityService) {
    super();
    this.model     = new AccountToAccountTransferWizardModel();
    this.doRefresh = true;
  }

  preProcess(): Observable<any> {
    return this.customerAccountService.getCombinedAccountInfo(this.model.selection.getCustomerAccount())
      .pipe(
        switchMap((accounts: MaplesSimpleAccountInfo[]) => {
          // Only show open accounts
          this.model.accounts = accounts.filter((account: MaplesSimpleAccountInfo) => {
            // TODO: After SERVE fix, change to type === reserve account OR stauts === open.
            return account.accountType !== 'Reserve Account' && account.status === 'OPEN';
          });
          // Remove sub accounts if no permission
          if (!this.securityService.hasPermission(Permission.SERVE_TRANSFER_FUNDS_SUB_ACCOUNTS)) {
            this.model.accounts = this.model.accounts.filter((account: MaplesSimpleAccountInfo) => {
              return account.status !== 'SubAccount';
            });
          }
          return of(null);
        })
      );
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', AccountToAccountTransferFormPageComponent);
    pageMap.set('review-page', AccountToAccountTransferReviewPageComponent);
    pageMap.set('confirmation-page', AccountToAccountTransferConfirmationPageComponent);
    pageMap.set('add-account-page', AccountToAccountAddAccountPageComponent);
  }
}

export class AccountToAccountTransferWizardModel {
  selection: Selection<any>;
  accounts: MaplesSimpleAccountInfo[];
  toAccount: any;
  fromAccount: any;
  amount: string;
  success: boolean[] = [true, true];
}
