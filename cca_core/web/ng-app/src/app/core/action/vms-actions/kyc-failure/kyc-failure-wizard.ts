import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { KycFailurePageComponent } from './kyc-failure-page/kyc-failure-page.component';
import { Customer } from 'src/app/core/customer/customer';
import { Selection } from 'src/app/core/session/model/selection';
import { User } from '../../../user/user';

export class KycFailureWizard extends AbstractWizard<KycFailureWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'kyc-failure';
  startingPageKey: string = 'page';

  constructor () {
    super ();
    this.model     = new KycFailureWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'cardNumber': this.model.selection.selectedCard && this.model.selection.selectedCard.identifiers.pan,
    };
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    const numberToUse = selection.selectedCard.identifiers.panMasked;
    this.placeholderDictionary.addPlaceholder ( 'CARD_NUMBER', numberToUse );
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'page', KycFailurePageComponent );
  }
}

export class KycFailureWizardModel {
  selection: Selection<Customer>;
}
