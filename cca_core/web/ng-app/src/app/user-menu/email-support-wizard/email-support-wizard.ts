import { AbstractWizard } from "../../core/wizard/abstract-wizard";
import { WizardPage } from "../../core/wizard/wizard-page";
import { Type } from "@angular/core";
import { EmailSupportFormPageComponent } from "./email-support-form-page/email-support-form-page.component";

export class EmailSupportWizard extends AbstractWizard<EmailSupportWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'email-support';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new EmailSupportWizardModel();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set( 'form-page', EmailSupportFormPageComponent );
  }

}

export class EmailSupportWizardModel {
  emailSubject: string;
  emailMessage: string;
}
