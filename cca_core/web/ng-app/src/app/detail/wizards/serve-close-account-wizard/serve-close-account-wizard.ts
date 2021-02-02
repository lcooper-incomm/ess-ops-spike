import {Type} from '@angular/core';
import {MaplesAccount, MaplesPlatform} from '@cscore/maples-client-model';
import {AbstractWizard} from '../../../core/wizard/abstract-wizard';
import {WizardPage} from '../../../core/wizard/wizard-page';
import {ServeCloseAccountFormPageComponent} from './serve-close-account-form-page/serve-close-account-form-page.component';
import {ServeCloseAccountProgressPageComponent} from './serve-close-account-progress-page/serve-close-account-progress-page.component';
import {MaplesSimpleAccountInfo} from '../../../core/session/model/maples-simple-account-info';
import {ServeCloseAccountResultPageComponent} from './serve-close-account-result-page/serve-close-account-result-page.component';
import {ServeCloseAccountConfirmationPageComponent} from './serve-close-account-confirmation-page/serve-close-account-confirmation-page.component';

/**
 * Wizard to close an account.  This will use the change account status call to close all subaccounts and the primary
 * account.  It will iterate over all these accounts that are in a non-closed state.
 * Iterate over them one at a time starting with sub-accounts and if all requests are successful, then close the primary
 * account.
 * When going to the result page, refresh all accounts to confirm that the status has been closed.
 */
export class ServeCloseAccountWizard extends AbstractWizard<ServeCloseAccountWizardModel> {

  doRefresh               = true;
  displayStepper: boolean = true;
  key: string             = 'serve-close-account';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model = new ServeCloseAccountWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ServeCloseAccountFormPageComponent);
    pageMap.set('confirmation-page', ServeCloseAccountConfirmationPageComponent);
    pageMap.set('progress-page', ServeCloseAccountProgressPageComponent);
    pageMap.set('result-page', ServeCloseAccountResultPageComponent);
  }
}

export class ServeCloseAccountWizardModel {
  account: MaplesAccount;
  platform: MaplesPlatform;
  accountInfos: MaplesSimpleAccountInfo[] = [];
  reason: string;
  comment: string;
  success: number;
}
