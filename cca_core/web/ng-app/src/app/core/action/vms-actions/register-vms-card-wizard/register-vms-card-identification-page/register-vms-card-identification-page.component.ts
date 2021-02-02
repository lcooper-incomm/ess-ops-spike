import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import {
  RegisterVmsCardWizard,
  RegisterVmsCardPage,
  IdentificationData,
  CanadianIdentificationData
} from '../register-vms-card-wizard';
import { FormGroup } from '@angular/forms';
import { of, Observable } from 'rxjs';
import {
  IdentificationFormBuilderService,
  CanadianIdentificationFormOptions
} from 'src/app/detail/selection-action-toolbar/customer-account-forms/customer-account-identification-form/identification-form-builder/identification-form-builder.service';
import { tap, shareReplay } from 'rxjs/operators';
import { IdentificationTypeType } from 'src/app/core/form/identification-field/identification-type-type.enum';
import { IdentificationType } from 'src/app/core/customer/identification-type';
import { Occupation } from 'src/app/core/customer/occupation';
import { ReasonCode } from '../../../product-action-reason-code';
import { IdentificationTypeService } from 'src/app/core/customer/identification-type.service';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-identification-page',
  templateUrl: './register-vms-card-identification-page.component.html',
  styleUrls: [ './register-vms-card-identification-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RegisterVmsCardIdentificationPageComponent extends WizardFormPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.IDENTIFICATION;

  canadianFormOptions: CanadianIdentificationFormOptions;

  private loaded$: Observable<any>;

  constructor ( private formBuilderService: IdentificationFormBuilderService ) {
    super ();
    this.isBackable = true;
    this.width      = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    super.ngOnInit ();
    this.loaded$    = this.loadData ().pipe ( shareReplay () );
  }

  onLoad (): Observable<any> {
    return this.loaded$;
  }

  onNext (): Observable<string> {
    this.wizard.model.identification = this.buildData ();
    return of ( RegisterVmsCardPage.CONFIRMATION );
  }

  protected initForm (): FormGroup {
    return IdentificationFormBuilderService.buildForm ( this.wizard.model.customer.isCanadian );
  }

  private loadData (): Observable<CanadianIdentificationFormOptions | null> {
    if ( this.wizard.model.customer.isCanadian ) {
      return this.formBuilderService
        .loadCanadianFormOptions ( this.wizard.model.platform )
        .pipe ( tap ( data => this.canadianFormOptions = data ) );
    } else {
      this.wizardForm.get ( 'identificationType' ).setValue ( IdentificationTypeType.SOCIAL_SECURITY_NUMBER );
      return of ( null );
    }
  }

  private buildData (): IdentificationData {
    if ( this.wizard.model.customer.isCanadian ) {
      return {
        number: this.getValueFromForm<string> ( 'identificationNumber' ),
        type: this.getValueFromForm<IdentificationType> ( 'identificationType' ),
        occupation: this.getValueFromForm<Occupation> ( 'occupation' ),
        country: this.getValueFromForm<string> ( 'identificationCountry' ),
        stateProvince: this.getValueFromForm<string> ( 'identificationProvince' ),
        expirationDate: this.getValueFromForm<string> ( 'expirationDate' ),
        verificationDate: this.getValueFromForm<string> ( 'verificationDate' ),
        taxpayerId: this.getValueFromForm<string> ( 'taxpayerId' ),
        noTaxpayerIdReason: this.getValueFromForm<ReasonCode> ( 'noTaxpayerIdReason' ),
        residence: this.getValueFromForm<string> ( 'residence' ),
        noTaxpayerIdReasonDescription: this.getValueFromForm<string> ( 'noTaxpayerIdReasonDescription' ),
      } as CanadianIdentificationData;
    } else {
      return {
        number: this.getValueFromForm<string> ( 'identificationNumber' ),
        type: IdentificationTypeService.findUSOptionByType ( this.getValueFromForm<IdentificationTypeType> ( 'identificationType' ) ),
      };
    }
  }
}
