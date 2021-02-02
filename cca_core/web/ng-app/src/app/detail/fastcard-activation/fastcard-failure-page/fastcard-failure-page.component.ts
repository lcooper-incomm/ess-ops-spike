import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ActivateFastcardWizard } from '../activate-fastcard/activate-fastcard-wizard';

@Component ( {
  selector: 'cca-fastcard-failure-page',
  templateUrl: './fastcard-failure-page.component.html',
  styleUrls: [ './fastcard-failure-page.component.scss' ]
} )
export class FastcardFailurePageComponent extends WizardPage<ActivateFastcardWizard> {

  isBackable: boolean   = true;
  isCloseable: boolean  = true;
  key: string           = 'failure-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
  }

  ngOnInit (): void {
  }

  get message (): string {
    return this.wizard.model.failureMessage;
  }
}
