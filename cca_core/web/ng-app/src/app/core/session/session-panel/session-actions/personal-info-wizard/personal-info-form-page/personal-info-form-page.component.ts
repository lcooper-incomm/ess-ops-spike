import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { PersonalInfoWizard } from "../personal-info-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardWidth } from "../../../../../wizard/wizard-width.enum";
import { CcaFormBuilder } from "../../../../../form/cca-form-builder.service";
import { Observable, of } from "rxjs";
import { PersonalInfoRequest } from "../personal-info-confirmation-page/personal-info-confirmation-page.component";

@Component ( {
  selector: 'cca-personal-info-form-page',
  templateUrl: './personal-info-form-page.component.html',
  styleUrls: [ './personal-info-form-page.component.scss' ]
} )
export class PersonalInfoFormPageComponent extends WizardPage<PersonalInfoWizard> implements OnInit {
  addressForm: FormGroup = new FormGroup ( {} );
  key: string            = 'form-page';
  wizardForm: FormGroup  = new FormGroup ( {} );

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<any> {
    this.wizard.model.request = this.buildRequest ();
    return of ( 'review-page' );
  }

  private buildRequest (): PersonalInfoRequest {
    let request   = new PersonalInfoRequest ();
    let formValue = this.wizardForm.getRawValue ();

    request.account     = formValue.account;
    request.address     = formValue.address;
    request.comment     = formValue.comment;
    request.email       = formValue.email;
    request.firstName   = formValue.firstName;
    request.jobTitle    = formValue.jobTitle;
    request.lastName    = formValue.lastName;
    request.phoneNumber = formValue.phoneNumber;
    request.productId   = formValue.productId;

    return request;
  }

  private initForm (): void {
    this.addressForm = this.formBuilder.address ( null, true );

    this.wizardForm = new FormGroup ( {
        address: this.addressForm,
      productId: new FormControl ( null, [ Validators.required ] ),
      firstName: new FormControl ( null, [ Validators.required ] ),
      lastName: new FormControl ( null, [ Validators.required ] ),
      comment: new FormControl ( null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ),
      phoneNumber: new FormControl ( null, [ Validators.required ] ),
      jobTitle: new FormControl ( null ),
      account: new FormControl ( null ),
      email: new FormControl ( null )
      }
    );
  }
}
