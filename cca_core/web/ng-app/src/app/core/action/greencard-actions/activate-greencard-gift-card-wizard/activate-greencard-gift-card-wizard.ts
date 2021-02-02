import {AbstractWizard} from "../../../wizard/abstract-wizard";
import {WizardPage} from "../../../wizard/wizard-page";
import {Type} from "@angular/core";
import {ActivateGreencardGiftCardFormPageComponent} from "./activate-greencard-gift-card-form-page/activate-greencard-gift-card-form-page.component";
import {Selection} from "../../../session/model/selection";
import {ActivateGreencardGiftCardConfirmPageComponent} from "./activate-greencard-gift-card-confirm-page/activate-greencard-gift-card-confirm-page.component";
import {ActivateGreencardGiftCardSuccessPageComponent} from "./activate-greencard-gift-card-success-page/activate-greencard-gift-card-success-page.component";
import {ActivateGreencardGiftCardFailPageComponent} from "./activate-greencard-gift-card-fail-page/activate-greencard-gift-card-fail-page.component";
import {Observable, of} from "rxjs";

export class ActivateGreencardGiftCardWizard extends AbstractWizard<ActivateGreencardGiftCardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'activate-greencard-gift-card';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new ActivateGreencardGiftCardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ActivateGreencardGiftCardFormPageComponent );
    pageMap.set ( 'confirm-page', ActivateGreencardGiftCardConfirmPageComponent );
    pageMap.set ( 'success-page', ActivateGreencardGiftCardSuccessPageComponent );
    pageMap.set ( 'fail-page', ActivateGreencardGiftCardFailPageComponent );
  }

  preProcess (): Observable<any> {
    this.pages.get( 'fail-page' ).instance.isIgnored = true;
    return of ( null );
  }

}

export class ActivateGreencardGiftCardWizardModel {
  birthYear: string;
  displayExpDate: string;
  expDate: string;
  panLastFour: string;
  selection: Selection<any>;
  serialNumber: string;
}
