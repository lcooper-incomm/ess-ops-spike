import { FormGroup } from '@angular/forms';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';

export abstract class WizardFormPage<T extends AbstractWizard<any>> extends WizardPage<T> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  protected abstract initForm (): FormGroup;

  constructor () {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.wizardForm = this.initForm ();
  }
}
