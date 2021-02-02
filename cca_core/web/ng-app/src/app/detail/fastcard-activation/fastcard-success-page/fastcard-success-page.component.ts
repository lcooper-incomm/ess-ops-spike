import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ActivateFastcardWizard } from '../activate-fastcard/activate-fastcard-wizard';

@Component ( {
  selector: 'cca-fastcard-success-page',
  templateUrl: './fastcard-success-page.component.html',
  styleUrls: [ './fastcard-success-page.component.scss' ]
} )
export class FastcardSuccessPageComponent extends WizardPage<ActivateFastcardWizard> {

  isCloseable: boolean  = true;
  key: string           = 'success-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
  }

  ngOnInit (): void {
  }

  get message (): string {
    return this.wizard.model.successMessage;
  }
}
