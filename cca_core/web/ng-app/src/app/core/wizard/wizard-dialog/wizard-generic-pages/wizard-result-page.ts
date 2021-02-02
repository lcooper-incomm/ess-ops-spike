import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { AbstractWizard } from 'src/app/core/wizard/abstract-wizard';

export abstract class WizardResultPage<T extends AbstractWizard<any>> extends WizardPage<T> {
  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  isCloseable: boolean  = true;

  abstract isSuccess (): boolean;

  constructor () {
    super ();
  }

  onLoad (): Observable<any> {
    const success        = this.isSuccess ();
    this.isFailed        = !success;
    this.isBackable      = !success;
    this.closeButtonText = success ? 'Close' : 'Cancel';
    this.wizardForm.updateValueAndValidity ();
    return of ( null );
  }
}
