import { WizardPage } from "src/app/core/wizard/wizard-page";
import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { FormGroup } from "@angular/forms";

export abstract class WizardFailurePage<T extends AbstractWizard<any>> extends WizardPage<T> {
  key: string           = 'failure-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  isCloseable: boolean  = true;
  isFailed: boolean     = true;

  get message (): string {
    return 'An error occurred while completing the action.';
  }

  static template = '<div><span>{{message}}</span></div>';
}
