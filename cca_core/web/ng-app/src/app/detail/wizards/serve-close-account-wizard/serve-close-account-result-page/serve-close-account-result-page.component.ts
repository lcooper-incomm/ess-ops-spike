import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';
import {Observable, of} from 'rxjs';
import {delay, flatMap} from 'rxjs/operators';
import {ServeCloseAccountWizard} from '../serve-close-account-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {MaplesSimpleAccountInfo} from '../../../../core/session/model/maples-simple-account-info';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';

/**
 * When this page loads, refresh the account to get the current state of all statues.  Make sure that the
 * statuses are indeed closed.
 * Success of 0 indicates success.  1 indicates the close request failed.  2 indicates that audit/comment failed.
 */
@Component({
  selector: 'cca-serve-close-account-result-page',
  templateUrl: './serve-close-account-result-page.component.html'
})
export class ServeCloseAccountResultPageComponent extends WizardResultPage<ServeCloseAccountWizard> implements OnInit {

  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup({});

  @ViewChild(SpinnerComponent) loadingSpinner: SpinnerComponent;

  constructor(private customerAccountService: CustomerAccountService) {
    super();
  }

  ngOnInit() {
    this.title           = 'Close Account';
    this.navigationTitle = 'Success';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.closeButtonText = 'Close';
    this.width           = WizardWidth.MEDIUM;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }
  onLoad(): Observable<any> {
    // Get the primary account.  Since we don't need balances, just check the sub account status returned on
    // the primary.  No need for separate sub account requests.
    return this.customerAccountService.getCombinedAccountInfo(this.wizard.model.account, false, true)
      .pipe(
        flatMap((accountInfos: MaplesSimpleAccountInfo[]) => {
          console.log(accountInfos);

          // Associate the updated accounts with the original list.  Map over the new status.
          for (let accountInfo of this.wizard.model.accountInfos) {
            let updatedAccountInfo: MaplesSimpleAccountInfo = _.find(accountInfos, {id: accountInfo.id});
            accountInfo.status = updatedAccountInfo.status;

            // If any state is not closed, then flag the overall wizard as having an error.
            if (accountInfo.status !== 'CLOSED') {
              this.wizard.model.success = 1;
            }
          }

          return of(null);
        })
      );
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
