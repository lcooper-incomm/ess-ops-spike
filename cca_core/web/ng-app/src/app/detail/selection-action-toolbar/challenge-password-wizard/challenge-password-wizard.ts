import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ChallengePasswordComponent } from "./challenge-password/challenge-password.component";

export class ChallengePasswordWizard extends AbstractWizard<ChallengePasswordWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'challenge-password';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new ChallengePasswordWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ChallengePasswordComponent );
  }
}

export class ChallengePasswordWizardModel {
  data: any
}
