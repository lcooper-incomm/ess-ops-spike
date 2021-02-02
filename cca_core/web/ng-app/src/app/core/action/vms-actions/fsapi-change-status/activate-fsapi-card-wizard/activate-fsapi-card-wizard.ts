import {AbstractWizard} from '../../../../wizard/abstract-wizard';
import {WizardPage} from '../../../../wizard/wizard-page';
import {Type} from '@angular/core';
import {Selection} from '../../../../session/model/selection';
import {ActivateFsapiCardValidatePageComponent} from './activate-fsapi-card-validate-page/activate-fsapi-card-validate-page.component';
import {User} from '../../../../user/user';
import {ActivateFsapiCardConfirmPageComponent} from './activate-fsapi-card-confirm-page/activate-fsapi-card-confirm-page.component';
import {Observable, of} from 'rxjs';
import {ActivateFsapiCardResultsPageComponent} from './activate-fsapi-card-results-page/activate-fsapi-card-results-page.component';
import {PlatformType} from '../../../../platform/platform-type.enum';
import {Customer} from 'src/app/core/customer/customer';

export class ActivateFsapiCardWizard extends AbstractWizard<ActivateFsapiCardWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'activate-vms-card';  // todo rename this to 'activate-fsapi-card' after we come up with a SQL script to update existing codexes
  startingPageKey: string = 'validate-page';

  constructor() {
    super();
    this.model     = new ActivateFsapiCardWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key,
      actionFailed: this.model.actionFailed
    };
  }

  buildPlaceholders(user: User, selection: Selection<any>): void {
    super.buildPlaceholders(user, selection);
    let numberToUse = this.model.cardNumber ? this.model.cardNumber : this.model.maskedPan;
    this.placeholderDictionary.addPlaceholder('CARD_NUMBER', numberToUse);
    this.placeholderDictionary.addPlaceholder('CALL_LOG_ID', this.model.sessionId);
    this.placeholderDictionary.addPlaceholder('MASKED_PAN', this.model.maskedPan);
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('validate-page', ActivateFsapiCardValidatePageComponent);
    pageMap.set('confirm-page', ActivateFsapiCardConfirmPageComponent);
    pageMap.set('results-page', ActivateFsapiCardResultsPageComponent);
  }

  preProcess(): Observable<any> {
    if (this.model.selection.platform === PlatformType.CCL
      || this.model.selection.getCustomer().isVmsGiftCard
      || this.model.selection.selectedCard.alerts.isPinSet) {
      this.pages.get('validate-page').instance.isIgnored = true;
      this.startingPageKey                               = 'confirm-page';
    } else {
      this.startingPageKey = 'validate-page';
    }
    return of('null');
  }

}

export class ActivateFsapiCardWizardModel {
  actionFailed: boolean = true;
  cardNumber: string;
  customerId: string;
  maskedPan: string;
  selection: Selection<Customer>;
  sessionId: string;
  validating: boolean;
}
