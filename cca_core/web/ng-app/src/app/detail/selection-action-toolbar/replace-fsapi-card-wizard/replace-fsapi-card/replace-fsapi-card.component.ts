import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {Observable, of} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReplaceFsapiCardWizard} from "../replace-fsapi-card-wizard";
import {CcaFormBuilder} from "../../../../core/form/cca-form-builder.service";
import {FsapiReplaceCardCardHolder, FsapiReplaceCardRequest} from "../fsapi-replace-card-request";
import {CsCoreAddress} from "@cscore/core-client-model";
import {WizardWidth} from "../../../../core/wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-replace-fsapi-card',
  templateUrl: './replace-fsapi-card.component.html',
  styleUrls: [ './replace-fsapi-card.component.scss' ]
} )
export class ReplaceFsapiCardComponent extends WizardPage<ReplaceFsapiCardWizard> implements OnInit {

  addressForm: FormGroup = new FormGroup ( {} );
  key: string            = 'form-page';
  wizardForm: FormGroup  = new FormGroup ( {} );

  deliveryChoices: any = [
    {
      value: false,
      displayName: 'USPS | Standard Shipping 7-10 Business Days'

    },
    {
      value: true,
      displayName: 'FedEx | Expedite Shipping 3-5 Business Days'
    }
  ];

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForms ();
    this.setNameState();
  }

  onNext (): Observable<any> {
    this.wizard.model.request = this.buildRequest ();
    return of ( 'review-page' );
  }

  private buildRequest (): FsapiReplaceCardRequest {
    let formValue    = this.wizardForm.getRawValue ();
    let addressValue = this.addressForm.getRawValue ();

    this.wizard.model.address = new CsCoreAddress ( addressValue );

    let cardHolder          = new FsapiReplaceCardCardHolder ();
    cardHolder.firstName    = formValue.firstName;
    cardHolder.lastName     = formValue.lastName;
    cardHolder.addressLine1 = addressValue.line1;
    cardHolder.addressLine2 = addressValue.line2;
    cardHolder.city         = addressValue.city;
    cardHolder.state        = addressValue.state;
    cardHolder.postalCode   = addressValue.postalCode;
    cardHolder.countryCode  = addressValue.country;

    let request           = new FsapiReplaceCardRequest ();
    request.comment       = formValue.comment;
    request.createNewCard = formValue.createNewCard;
    request.isExpedited   = formValue.isExpedited;
    request.isFeeWaived   = !!formValue.isFeeWaived;
    request.cardHolder    = cardHolder;

    return request;
  }

  private initForms (): void {
    this.addressForm = this.formBuilder.address ( this.wizard.model.selection.getCustomer ().getPreferredAddress (), true );

    this.wizardForm = new FormGroup ( {
      address: this.addressForm,
      firstName: new FormControl ( this.wizard.model.firstName, [ Validators.required ] ),
      lastName: new FormControl ( this.wizard.model.lastName, [ Validators.required ] ),
      comment: new FormControl ( '', [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ),
      createNewCard: new FormControl ( false ),
      customerId: new FormControl ( this.wizard.model.customerId ),
      isExpedited: new FormControl ( false ),
      isFeeWaived: new FormControl ()
    } );
  }

  private setNameState () {
    // By default, disable firstName/lastName if a value exists.
    this.setFormFieldDisabledIfValue( 'firstName' );
    this.setFormFieldDisabledIfValue( 'lastName' );

    // Re-enable if isVmsGiftCard
    if ( this.wizard.model.selection
        && this.wizard.model.selection.selectedCard
        && this.wizard.model.selection.selectedCard.isVmsGiftCard ) {
      this.setFormFieldDisabledIfValue( 'firstName', true );
      this.setFormFieldDisabledIfValue( 'lastName', true );
    }
  }

  /**
   * Enable or disable a form field if a value exists on it.
   *
   * @param fieldName The name of the form field.
   * @param disable True to disable the field, false to enable.  Default = true.
   */
  private setFormFieldDisabledIfValue( fieldName: string, enable: boolean = false ): void {
    if ( this.wizardForm.get( fieldName ).value ) {
      if ( enable ) {
        this.wizardForm.get ( fieldName ).enable();
      } else {
        this.wizardForm.get ( fieldName ).disable();
      }
    }
  }
}

