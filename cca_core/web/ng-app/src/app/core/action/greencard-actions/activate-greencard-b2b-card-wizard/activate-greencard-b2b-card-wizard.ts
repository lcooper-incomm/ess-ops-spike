import { AbstractWizard } from "../../../wizard/abstract-wizard";
import { Selection } from "../../../session/model/selection";
import { WizardPage } from "../../../wizard/wizard-page";
import { Type } from "@angular/core";
import { ActivateGreencardB2bCardFormPageComponent } from "./activate-greencard-b2b-card-form-page/activate-greencard-b2b-card-form-page.component";
import { ActivateGreencardB2bCardConfirmPageComponent } from "./activate-greencard-b2b-card-confirm-page/activate-greencard-b2b-card-confirm-page.component";
import { ActivateGreencardB2bCardSuccessPageComponent } from "./activate-greencard-b2b-card-success-page/activate-greencard-b2b-card-success-page.component";
import { ActivateGreencardB2bCardFailPageComponent } from "./activate-greencard-b2b-card-fail-page/activate-greencard-b2b-card-fail-page.component";
import { Observable, of } from "rxjs";

export class ActivateGreencardB2bCardWizard extends AbstractWizard<ActivateGreencardB2bCardWizardModel> {

  displayStepper: boolean       = true;
  key: string                   = 'activate-greencard-b2b-card';
  startingPageKey: string       = 'form-page';

  constructor () {
    super();
    this.model     = new ActivateGreencardB2bCardWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set( 'form-page', ActivateGreencardB2bCardFormPageComponent );
    pageMap.set( 'confirm-page', ActivateGreencardB2bCardConfirmPageComponent );
    pageMap.set( 'success-page', ActivateGreencardB2bCardSuccessPageComponent );
    pageMap.set( 'fail-page', ActivateGreencardB2bCardFailPageComponent );
  }

  preProcess (): Observable<any> {
    this.pages.get( 'fail-page' ).instance.isIgnored = true;
    return of ( null );
  }

}

export class ActivateGreencardB2bCardWizardModel {
  panLastFour: string;
  pin: string;
  selection: Selection<any>;
  serialNumber: string;
}
