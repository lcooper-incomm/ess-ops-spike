import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {forkJoin, Observable, of} from 'rxjs';
import {MaplesUpdateMerchantBlockRequest} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../wizard/wizard-page';
import {ViewBlockedMerchantsWizard} from '../view-blocked-merchants-wizard';
import {WizardWidth} from '../../../../wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';
import {catchError, mapTo} from 'rxjs/operators';

@Component({
  selector: 'cca-view-blocked-merchants-confirmation-page',
  templateUrl: './view-blocked-merchants-confirmation-page.component.html'
})
export class ViewBlockedMerchantsConfirmationPageComponent extends WizardPage<ViewBlockedMerchantsWizard> {

  key: string             = 'confirmation-page';
  title: string           = 'Unblock Merchants';
  wizardForm: FormGroup   = new FormGroup({});
  footer: string          = 'Are you sure you want to unblock these merchants?';
  isNextable: boolean     = true;
  nextButtonText: string  = 'Yes';
  isBackable: boolean     = true;
  backButtonText: string  = 'No';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';

  constructor(private customerAccountService: CustomerAccountService) {
    super();
    this.isCloseable = true;
    this.width       = WizardWidth.LARGE;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    this.wizard.model.success = true;
    let calls: Observable<any>[] = [];
    for (let merchant of this.wizard.model.unblockMerchants) {
      calls.push(
        this.customerAccountService.updateMerchantBlock(
          this.wizard.model.selection.getCustomerAccount().id,
          new MaplesUpdateMerchantBlockRequest({
            ruleId: merchant.id,
            status: 'INACTIVE'
          }),
          this.wizard.model.selection.getMaplesPlatform()
        ).pipe(
          catchError(() => {
            this.wizard.model.success = false;
            this.wizard.model.failedMerchants.push(merchant);
            return of(null);
          })
        )
      );
    }

    return forkJoin(calls)
      .pipe(
        mapTo('result-page')
      );
  }
}
