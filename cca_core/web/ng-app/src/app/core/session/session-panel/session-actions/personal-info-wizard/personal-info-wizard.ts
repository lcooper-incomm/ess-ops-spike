import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../wizard/wizard-page";
import { PersonalInfoFormPageComponent, } from "./personal-info-form-page/personal-info-form-page.component";
import { Selection } from "../../../model/selection";
import { Session } from "../../../model/session";
import {
  PersonalInfoConfirmationPageComponent,
  PersonalInfoRequest
} from "./personal-info-confirmation-page/personal-info-confirmation-page.component";
import { PersonalInfoResultsPageComponent } from "./personal-info-results-page/personal-info-results-page.component";

export class PersonalInfoWizard extends AbstractWizard<PersonalInfoWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'personal-info-request';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new PersonalInfoWizardModel ();
    this.doRefresh = false;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', PersonalInfoFormPageComponent );
    pageMap.set ( 'review-page', PersonalInfoConfirmationPageComponent );
    pageMap.set ( 'confirmation-page', PersonalInfoResultsPageComponent );
  }
}

export class PersonalInfoWizardModel {
  success: boolean[] = [true, true];
  request: PersonalInfoRequest;
  selection: Selection<any>;
  session: Session;
  privacyRequestSessionId: number;
}
