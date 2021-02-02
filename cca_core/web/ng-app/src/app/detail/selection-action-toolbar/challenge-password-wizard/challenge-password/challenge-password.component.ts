import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ChallengePasswordWizard } from "../challenge-password-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TerminalService } from "../../../../core/node/terminal/terminal.service";
import { CcaValidators } from "../../../../core/validators/cca-validators";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { GenericMessageView } from "../../../../core/generic-message-view";

@Component ( {
  selector: 'cca-challenge-password',
  templateUrl: './challenge-password.component.html',
  styleUrls: [ './challenge-password.component.scss' ]
} )
export class ChallengePasswordComponent extends WizardPage<ChallengePasswordWizard> implements OnInit {
  key: string           = 'form-page';
  newPassword: string;
  tempPassword: string  = "######";
  wizardForm: FormGroup = new FormGroup ( {} );
  @ViewChild ( 'loadingSpinner' )
  loadingSpinner: SpinnerComponent;
  constructor ( private terminalService: TerminalService ) {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = "Close"
  }

  ngOnInit () {
    this.initForms ()
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      terminalId: new FormControl ( [], [ CcaValidators.lengthEquals ( 9 ), Validators.required ] )
    } );
  }

  getChallengePassword () {
    this.loadingSpinner.start ();
    this.terminalService.getChallengePassword ( this.wizardForm.value.terminalId )
      .subscribe ( ( message: GenericMessageView ) => {
        this.newPassword    = message.message;
        this.loadingSpinner.stop ();
      } )
  }
}
