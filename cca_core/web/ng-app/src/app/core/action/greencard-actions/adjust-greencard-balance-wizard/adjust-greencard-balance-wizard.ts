import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { AdjustGreencardBalanceFormPageComponent } from "./adjust-greencard-balance-form-page/adjust-greencard-balance-form-page.component";
import { Type } from "@angular/core";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import { AdjustGreencardBalanceConfirmationPageComponent } from "./adjust-greencard-balance-confirmation-page/adjust-greencard-balance-confirmation-page.component";
import { AdjustGreencardBalanceSuccessPageComponent } from "./adjust-greencard-balance-success-page/adjust-greencard-balance-success-page.component";
import { AdjustGreencardBalanceFailurePageComponent } from "./adjust-greencard-balance-failure-page/adjust-greencard-balance-failure-page.component";
import { Card } from "src/app/core/card/card";
import { Observable, of } from "rxjs";
import { ReasonCode } from '../../product-action-reason-code';

export class AdjustGreencardBalanceWizard extends AbstractWizard<AdjustGreencardBalanceWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'adjust-greencard-balance';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new AdjustGreencardBalanceWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', AdjustGreencardBalanceFormPageComponent );
    pageMap.set ( 'confirmation-page', AdjustGreencardBalanceConfirmationPageComponent );
    pageMap.set ( 'success-page', AdjustGreencardBalanceSuccessPageComponent );
    pageMap.set ( 'failure-page', AdjustGreencardBalanceFailurePageComponent );
  }

  preProcess (): Observable<any> {
    this.pages.get ( 'failure-page' ).instance.isIgnored = true;
    return of ( null );
  }
}

export class AdjustGreencardBalanceWizardModel {
  card: Card;
  comment: string;
  reason: ReasonCode;
  amount: number;
}
