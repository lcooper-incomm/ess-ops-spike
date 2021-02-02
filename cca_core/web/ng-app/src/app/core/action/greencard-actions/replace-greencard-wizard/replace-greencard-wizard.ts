import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { Card } from 'src/app/core/card/card';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ReplaceGreencardConfirmationPageComponent } from './replace-greencard-confirmation-page/replace-greencard-confirmation-page.component';
import { ReplaceGreencardFormPageComponent } from './replace-greencard-form-page/replace-greencard-form-page.component';
import { ReplaceGreencardResultPageComponent } from './replace-greencard-result-page/replace-greencard-result-page.component';
import { GiftCardReplacementResponse } from '../greencard-action-service/greencard-action-response-models';
import { CardHolder } from '../greencard-action-service/greencard-action-request-models';

export class ReplaceGreencardWizard extends AbstractWizard<ReplaceGreencardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'replace-greencard';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new ReplaceGreencardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ReplaceGreencardFormPageComponent );
    pageMap.set ( 'confirmation-page', ReplaceGreencardConfirmationPageComponent );
    pageMap.set ( 'result-page', ReplaceGreencardResultPageComponent );
  }
}

export class ReplaceGreencardWizardModel {
  card: Card;
  cardHolder: CardHolder;
  reorder: boolean = false;
  replacePan: boolean;
  result: GiftCardReplacementResponse;
  success: boolean = true;
}

