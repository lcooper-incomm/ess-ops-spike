import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../wizard/wizard-page";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ActivateGreencardB2bCardWizard } from "../activate-greencard-b2b-card-wizard";

@Component({
  selector: 'cca-activate-greencard-b2b-card-form-page',
  templateUrl: './activate-greencard-b2b-card-form-page.component.html',
  styleUrls: ['./activate-greencard-b2b-card-form-page.component.scss']
})
export class ActivateGreencardB2bCardFormPageComponent extends WizardPage< ActivateGreencardB2bCardWizard > implements OnInit {

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
    this.wizard.model.panLastFour = this.wizard.model.selection.getCard().identifiers.panLastFour;
    this.wizard.model.pin = this.wizardForm.value.pin;
    this.wizard.model.serialNumber = this.wizard.model.selection.getCard().identifiers.serialNumber;
    return of( 'confirm-page' );
  }

  private initForm () : void {
    this.wizardForm = new FormGroup( {
      pin: new FormControl( this.wizard.model.pin,
        [ Validators.required, Validators.minLength(4), Validators.maxLength(4) ] )
    } );
  }

}
