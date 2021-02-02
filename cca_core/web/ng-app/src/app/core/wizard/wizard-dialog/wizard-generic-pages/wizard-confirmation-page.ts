import { FormGroup } from '@angular/forms';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';

export abstract class WizardConfirmationPage<T extends AbstractWizard<any>> extends WizardPage<T> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }
}
