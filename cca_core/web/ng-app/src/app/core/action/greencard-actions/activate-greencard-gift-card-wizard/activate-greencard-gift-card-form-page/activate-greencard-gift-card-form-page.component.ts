import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../wizard/wizard-page";
import {ActivateGreencardGiftCardWizard} from "../activate-greencard-gift-card-wizard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";

@Component({
  selector: 'cca-activate-greencard-gift-card',
  templateUrl: './activate-greencard-gift-card-form-page.component.html',
  styleUrls: [ './activate-greencard-gift-card-form-page.component.scss']
})
export class ActivateGreencardGiftCardFormPageComponent extends WizardPage< ActivateGreencardGiftCardWizard > implements OnInit {

  closeButtonText: string        = 'Cancel';
  isCloseable: boolean           = true;
  isNextable: boolean            = true;
  key: string                    = 'form-page';
  nextButtonText: string         = 'Submit';
  wizardForm: FormGroup          = new FormGroup( {} );

  constructor() {
    super ();
  }

  ngOnInit() {
    this.initForm();
  }

  onNext (): Observable<any> {
    this.wizard.model.birthYear      = this.wizardForm.value.birthYear;
    this.wizard.model.displayExpDate = this.wizardForm.value.expDate;
    this.wizard.model.expDate        = this.formatDateForApls(this.wizardForm.value.expDate);
    this.wizard.model.panLastFour    = this.wizard.model.selection.getCard().identifiers.panLastFour;
    this.wizard.model.serialNumber   = this.wizard.model.selection.getCard().identifiers.serialNumber;
    return of( 'confirm-page' );
  }

  private initForm () : void {
    this.wizardForm = new FormGroup( {
      birthYear: new FormControl( this.wizard.model.birthYear,
        [Validators.required]),
      expDate: new FormControl( this.wizard.model.expDate,
        [Validators.required])
    } );
  }

  formatDateForApls(str: string): string {
    return str.split('/').reverse().join('')
  }
}
