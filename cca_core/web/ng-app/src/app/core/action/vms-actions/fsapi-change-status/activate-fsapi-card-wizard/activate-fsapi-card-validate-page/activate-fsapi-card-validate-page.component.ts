import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ActivateFsapiCardWizard } from "../activate-fsapi-card-wizard";
import { Observable, of } from "rxjs";
import { ActivateFsapiCardService } from "../activate-fsapi-card.service";
import { CardService } from "../../../../../card/card.service";
import { catchError, finalize, map } from "rxjs/operators";
import { SpinnerSize } from "../../../../../spinner/spinner-size.enum";
import { prettyPrintCardNumber } from "../../../../../utils/string-utils";
import { TogglzService } from "../../../../../config/togglz.service";
import { TogglzType } from "../../../../../config/togglz-type.enum";

@Component ( {
  selector: 'cca-activate-fsapi-card-validate-page',
  templateUrl: './activate-fsapi-card-validate-page.component.html',
  styleUrls: [ './activate-fsapi-card-validate-page.component.scss' ]
} )
export class ActivateFsapiCardValidatePageComponent extends WizardPage<ActivateFsapiCardWizard> implements OnInit {

  closeButtonText: string = 'Cancel';
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  key: string             = 'validate-page';
  nextButtonText: string  = 'Next';
  SpinnerSize             = SpinnerSize;
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private activateFsapiCardService: ActivateFsapiCardService,
                private cardService: CardService,
                private togglzService: TogglzService ) {
    super ();
  }

  ngOnInit () {
    this.wizardForm = new FormGroup ( {
      isPinSet: new FormControl ( this.wizard.model.selection.selectedCard.alerts.isPinSet, [ Validators.requiredTrue ] )
    } );
  }

  onLoad (): Observable<any> {
    this.validate ();
    return this.cardService.decryptFsapiPan ( this.wizard.model.customerId, this.wizard.model.maskedPan )
      .pipe ( map ( ( formattedPan: string ) => {
          this.wizard.model.cardNumber = prettyPrintCardNumber ( formattedPan );
        } ),
        catchError ( ( error ) => {
          this.wizard.model.cardNumber = null;
          return of ( null );
        } ) );
  }

  onNext (): Observable<any> {
    return of ( 'confirm-page' );
  }

  public validate (): void {
    this.wizard.model.validating = true;
    this.activateFsapiCardService.validate ( this.wizard.model.customerId, this.wizard.model.selection )
      .pipe ( finalize ( () => {
        this.wizard.model.validating = false;
        this.wizardForm.get ( 'isPinSet' ).setValue ( !this.togglzService.isActive ( TogglzType.BYPASS_PIN_CHECK_ON_ACTIVATE_CARD ) && this.wizard.model.selection.selectedCard.alerts.isPinSet );
      } ) )
      .subscribe ();
  }

}
