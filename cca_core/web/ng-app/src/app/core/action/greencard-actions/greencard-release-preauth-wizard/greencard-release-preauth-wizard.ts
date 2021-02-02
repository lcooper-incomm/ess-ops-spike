import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { Card } from 'src/app/core/card/card';
import { Selection } from 'src/app/core/session/model/selection';
import { Transaction } from 'src/app/core/transaction/transaction';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ReleasePreAuthResponse } from '../greencard-action-service/greencard-action-response-models';
import { GreencardReleasePreauthConfirmationPageComponent } from './greencard-release-preauth-confirmation-page/greencard-release-preauth-confirmation-page.component';
import { GreencardReleasePreauthResultPageComponent } from './greencard-release-preauth-result-page/greencard-release-preauth-result-page.component';

export class GreencardReleasePreAuthWizard extends AbstractWizard<GreencardReleasePreAuthWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'greencard-release-preauth';
  startingPageKey: string = 'confirmation-page';

  constructor () {
    super ();
    this.model     = new GreencardReleasePreAuthWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'confirmation-page', GreencardReleasePreauthConfirmationPageComponent );
    pageMap.set ( 'result-page', GreencardReleasePreauthResultPageComponent );
  }
}

export class GreencardReleasePreAuthWizardModel {
  result: ReleasePreAuthResponse;
  selection: Selection<Card>;
  success: boolean = true;
  transaction: Transaction;
}
