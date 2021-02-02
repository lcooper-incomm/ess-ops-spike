import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ResetPinWizard } from "../reset-pin-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CardService } from "../../../../../card/card.service";
import { prettyPrintCardNumber } from "../../../../../utils/string-utils";

@Component ( {
  selector: 'cca-reset-pin-csr-script-page',
  templateUrl: './reset-pin-csr-instruction-page.component.html',
  styleUrls: [ './reset-pin-csr-instruction-page.component.scss' ]
} )
export class ResetPinCsrInstructionPageComponent extends WizardPage<ResetPinWizard> implements OnInit {

  closeButtonText: string = 'Close';
  isCloseable: boolean    = true;
  isNextable: boolean     = false;
  key: string             = 'csr-instruction-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private cardService: CardService ) {
    super ();
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    return this.cardService.decryptFsapiPan ( this.wizard.model.customerId, this.wizard.model.maskedPan )
      .pipe ( map ( ( formattedPan: string ) => {
          this.wizard.model.cardNumber = prettyPrintCardNumber ( formattedPan );
        } ),
        catchError ( ( error ) => {
          this.wizard.model.cardNumber = null;
          return of ( null );
        } ) );
  }
}
