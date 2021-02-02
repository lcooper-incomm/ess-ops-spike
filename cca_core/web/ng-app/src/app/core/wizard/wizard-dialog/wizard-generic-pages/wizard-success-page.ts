import { WizardPage } from "src/app/core/wizard/wizard-page";
import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { FormGroup } from "@angular/forms";

export abstract class WizardSuccessPage<T extends AbstractWizard<any>> extends WizardPage<T> {
  key: string           = 'success-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  isCloseable: boolean  = true;

  abstract get message (): string;

  static template = '<div><span>{{message}}</span></div>';
}
