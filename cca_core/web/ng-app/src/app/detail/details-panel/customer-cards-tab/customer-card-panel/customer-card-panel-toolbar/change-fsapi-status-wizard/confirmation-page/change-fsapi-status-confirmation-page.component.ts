import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../../core/wizard/wizard-page";
import { ChangeFsapiStatusPageType, ChangeFsapiStatusWizard } from "../change-fsapi-status-wizard";
import { Observable, of } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Selection } from "../../../../../../../core/session/model/selection";
import { CustomerService } from "../../../../../../../core/customer/customer.service";
import { catchError, map } from "rxjs/operators";
import { FsapiGenericResponse } from "../../../../../../../core/model/fsapi-generic-response";

@Component ( {
  selector: 'cca-change-fsapi-status-review',
  templateUrl: '../form-page/change-fsapi-status-form-page.component.html',
  styleUrls: [ './change-fsapi-status-confirmation-page.component.scss' ]
} )
export class ChangeFsapiStatusConfirmationPageComponent extends WizardPage<ChangeFsapiStatusWizard> implements OnInit {
  allowedResults: any[] = [];
  customerId: string;
  selection: Selection<any>;
  wizardForm: FormGroup = new FormGroup ( {} );
  key: string           = ChangeFsapiStatusPageType.CONFIRM_PAGE;

  constructor ( private customerService: CustomerService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit () {
    this.initForms ();
  }

  onLoad (): Observable<string> {
    this.wizardForm.get ( 'comment' ).setValue ( this.wizard.model.comment );
    this.wizardForm.get ( 'comment' ).disable ();
    this.wizardForm.get ( 'value' ).setValue ( this.wizard.model.value );
    this.wizardForm.get ( 'value' ).disable ();
    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.isFailed = false;
    return this.customerService.changeCardStatus ( this.wizard.model.customerId, this.wizardForm.getRawValue () )
      .pipe (
        catchError ( ( err, caught ) => {
          this.wizard.model.isFailed = true;
          return of ( ChangeFsapiStatusPageType.RESULTS_PAGE );
        } ),
        map ( ( value: FsapiGenericResponse ) => {
          if ( !this.wizard.model.isFailed ) {
            this.wizard.model.newStatus = this.wizardForm.get ( 'value' ).value;
          }
          return ChangeFsapiStatusPageType.RESULTS_PAGE;
        } )
      )
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      comment: new FormControl ( '', [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ),
      currentStatus: new FormControl ( this.wizard.model.card.getFsapiStatus () ),
      isVmsGiftCard: new FormControl ( this.wizard.model.card.isVmsGiftCard ),
      panLastFour: new FormControl ( this.wizard.model.card.identifiers.panLastFour ),
      value: new FormControl ( '', [ Validators.required ] )
    } );
  }
}
