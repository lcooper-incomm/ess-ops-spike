import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { OrderNewCardFormPageComponent } from "./order-new-card-form-page/order-new-card-form-page.component";
import { OrderNewCardConfirmationPageComponent } from "./order-new-card-confirmation-page/order-new-card-confirmation-page.component";
import { OrderNewCardResultsPageComponent } from "./order-new-card-results-page/order-new-card-results-page.component";
import { OrderNewCardChallengePageComponent } from "./order-new-card-challenge-page/order-new-card-challenge-page.component";
import { ChallengeInfo } from "../../../../core/action/vms-actions/models/vms-request-models";
import { Observable, of } from "rxjs";
import { OrderCardRequest } from "../order-card-request-models";

export class OrderNewCardWizard extends AbstractWizard<OrderNewCardWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'order-new-card';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new OrderNewCardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', OrderNewCardFormPageComponent );
    pageMap.set ( 'confirmation-page', OrderNewCardConfirmationPageComponent );
    pageMap.set ( 'result-page', OrderNewCardResultsPageComponent );
    pageMap.set ( 'challenge-page', OrderNewCardChallengePageComponent );

  }

  preProcess (): Observable<any> {
    // Initially hide challenge page
    this.pages.get ( 'challenge-page' ).instance.isIgnored = true;

    return of ( null );
  }


}

export class OrderNewCardWizardModel {
  isFailed: boolean;
  request: OrderCardRequest;
  success: boolean = true;
  challengeInfo: ChallengeInfo;
}
