import { Type } from '@angular/core';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';
import { Card } from 'src/app/core/card/card';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { GreencardReleaseMerchandiseFormPageComponent } from './greencard-release-merchandise-form-page/greencard-release-merchandise-form-page.component';
import { GreencardReleaseMerchandiseResultPageComponent } from './greencard-release-merchandise-result-page/greencard-release-merchandise-result-page.component';
import { GreencardReleaseMerchandiseConfirmationPageComponent } from './greencard-release-merchandise-confirmation-page/greencard-release-merchandise-confirmation-page.component';
import { ProgramLimits } from '../greencard-action-service/greencard-action-response-models';

export class GreencardReleaseMerchandiseWizard extends AbstractWizard<GreencardReleaseMerchandiseWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'greencard-release-merchandise';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new GreencardReleaseMerchandiseWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', GreencardReleaseMerchandiseFormPageComponent );
    pageMap.set ( 'confirmation-page', GreencardReleaseMerchandiseConfirmationPageComponent );
    pageMap.set ( 'result-page', GreencardReleaseMerchandiseResultPageComponent );
  }
}

export class GreencardReleaseMerchandiseWizardModel {
  card: Card;
  comment: string;
  decision: MerchandiseReleaseDecision;
  success: boolean = true;
  reason: string;
  result: ProgramLimits;
}

export enum MerchandiseReleaseDecision {
  APPROVED = 'APPROVED',
  DENIED   = 'DENIED',
}
