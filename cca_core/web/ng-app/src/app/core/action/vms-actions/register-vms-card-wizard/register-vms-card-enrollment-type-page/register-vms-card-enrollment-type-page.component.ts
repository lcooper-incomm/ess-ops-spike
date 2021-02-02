import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import {
  EnrollmentType,
  EnrollmentTypeCode,
  RegisterVmsCardPage,
  RegisterVmsCardWizard
} from '../register-vms-card-wizard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/core/card/card';
import { SecurityService } from 'src/app/core/security/security.service';
import { Permission } from 'src/app/core/auth/permission';
import { Observable, of } from 'rxjs';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-enrollment-type-page',
  templateUrl: './register-vms-card-enrollment-type-page.component.html',
  styleUrls: [ './register-vms-card-enrollment-type-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class RegisterVmsCardEnrollmentTypePageComponent extends WizardFormPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.ENROLLMENT_TYPE;

  readonly EnrollmentTypeCode = EnrollmentTypeCode;

  enrollmentTypes: EnrollmentType[] = [];

  constructor ( private securityService: SecurityService, private formBuilder: FormBuilder ) {
    super ();
    this.width = WizardWidth.MEDIUM;
    this.initEnrollmentTypes ();
  }

  ngOnInit (): void {
    super.ngOnInit ();
    this.registerFormFieldChanges ();
  }

  onNext (): Observable<string> {

    this.wizard.model.enrollmentType = this.enrollmentType;
    if ( this.enrollmentType.code === EnrollmentTypeCode.PERSONALIZED ) {
      this.wizard.togglePersonalizedPagesVisibility ( true );
      return of ( RegisterVmsCardPage.PERSONAL );
    } else if ( this.enrollmentType.code === EnrollmentTypeCode.SPEND_DOWN ) {
      this.wizard.model.postalCode = this.getValueFromForm<string> ( 'postalCode' );
      this.wizard.togglePersonalizedPagesVisibility ( false );
      return of ( RegisterVmsCardPage.CONFIRMATION );
    }

  }

  get card (): Card {
    return this.wizard.model.card;
  }

  get enrollmentType (): EnrollmentType | null {
    return this.getValueFromForm<EnrollmentType> ( 'enrollmentType' );
  }

  protected initForm (): FormGroup {
    return this.formBuilder.group ( {
      'enrollmentType': [ null, Validators.required ],
      'postalCode': [ null ],
    } );
  }

  private initEnrollmentTypes (): void {
    // Set up enrollment types
    if ( this.securityService.hasPermission ( Permission.VMS_REGISTER_CARD_PERSONALIZED ) ) {
      this.enrollmentTypes.push ( {
        code: EnrollmentTypeCode.PERSONALIZED,
        description: 'Personalized Card',
      } );
    }
    if ( this.securityService.hasPermission ( Permission.VMS_REGISTER_CARD_POSTAL_CODE_ONLY ) ) {
      this.enrollmentTypes.push ( {
        code: EnrollmentTypeCode.SPEND_DOWN,
        description: 'Active - Unregistered',
      } );
    }
  }

  private registerFormFieldChanges (): void {
    this.onFormFieldChange ( 'enrollmentType', ( enrollmentType: EnrollmentType ) => {
      if ( enrollmentType.code === EnrollmentTypeCode.SPEND_DOWN ) {
        this.wizardForm.get ( 'postalCode' ).setValidators ( Validators.required );
      } else {
        this.wizardForm.get ( 'postalCode' ).clearValidators ();
        this.wizardForm.get ( 'postalCode' ).updateValueAndValidity ();
      }
    } );
  }
}
