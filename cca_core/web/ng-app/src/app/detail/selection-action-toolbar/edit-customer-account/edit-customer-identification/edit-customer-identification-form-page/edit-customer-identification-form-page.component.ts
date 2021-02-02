import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import {
  CanadianIdentificationFormOptions,
  IdentificationFormBuilderService
} from 'src/app/detail/selection-action-toolbar/customer-account-forms/customer-account-identification-form/identification-form-builder/identification-form-builder.service';
import { IdentificationType } from 'src/app/core/customer/identification-type';
import { IdentificationTypeService } from 'src/app/core/customer/identification-type.service';
import { IdentificationTypeType } from 'src/app/core/form/identification-field/identification-type-type.enum';
import { Occupation } from 'src/app/core/customer/occupation';
import { ReasonCode } from 'src/app/core/action/product-action-reason-code';
import { StateProvinceService } from 'src/app/core/form/state-province-field/state-province.service';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import {
  EditCustomerIdentificationPageType,
  EditCustomerIdentificationWizard
} from '../edit-customer-identification-wizard';
import { IdentificationFormSnapshot } from '../../edit-customer-account-snapshot';

@Component ( {
  selector: 'cca-edit-customer-identification-form-page',
  templateUrl: './edit-customer-identification-form-page.component.html',
  styleUrls: [ './edit-customer-identification-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerIdentificationFormPageComponent extends WizardFormPage<EditCustomerIdentificationWizard> {
  key: string = EditCustomerIdentificationPageType.FORM;

  canadianFormOptions: CanadianIdentificationFormOptions;
  wizardForm: FormGroup = new FormGroup ( {} );
  snapshot: IdentificationFormSnapshot;

  private loaded$: Observable<any> = new Observable ();

  constructor (
    private stateProvinceService: StateProvinceService,
    private formBuilderService: IdentificationFormBuilderService,
  ) {
    super ();
    this.isBackable      = true;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.wizardForm = this.initForm ();
    this.snapshot   = this.wizard.model.newSnapshot.getIdentificationFormSnapshot ();
    this.loaded$    = this.loadData ().pipe ( shareReplay () );
  }

  onFormChange () {
    this.wizard.model.isUSFormInvalid = !this.wizard.model.selection.getCustomer ().isCanadian && !this.wizardForm.valid;
    this.addSubscription ( this.runAndApplyCodex ().subscribe () );
  }

  onLoad (): Observable<any> {
    return this.loaded$;
  }

  onNext (): Observable<string> {
    const formValue  = this.wizardForm.getRawValue ();
    const isCanadian = this.wizard.model.selection.getCustomer ().isCanadian;

    const identificationType: IdentificationType | undefined = isCanadian ? formValue.identificationType : this.getIdentificationType ( formValue.identificationType );
    this.wizard.model.newSnapshot.identificationType         = identificationType && identificationType.type;
    this.wizard.model.newSnapshot.identificationNumber       = formValue.identificationNumber;
    this.wizard.model.identificationType                     = identificationType;

    if ( isCanadian ) {
      const noTaxpayerIdReason: ReasonCode | undefined = formValue.noTaxpayerIdReason;
      const occupation: Occupation | undefined         = formValue.occupation;

      this.wizard.model.newSnapshot.occupation                     = occupation && occupation.type;
      this.wizard.model.newSnapshot.identificationProvince         = formValue.identificationProvince;
      this.wizard.model.newSnapshot.identificationExpirationDate   = formValue.expirationDate;
      this.wizard.model.newSnapshot.identificationVerificationDate = formValue.verificationDate;
      this.wizard.model.newSnapshot.taxpayerId                     = formValue.taxpayerId;
      this.wizard.model.newSnapshot.noTaxpayerIdReasonCode         = noTaxpayerIdReason && noTaxpayerIdReason.reasonCode;
      this.wizard.model.newSnapshot.noTaxpayerIdReasonDescription  = formValue.noTaxpayerIdReasonDescription;
      this.wizard.model.newSnapshot.taxJurisdictionResidence       = formValue.residence;

      this.wizard.model.noTaxpayerIdReason = noTaxpayerIdReason;
      this.wizard.model.occupation         = occupation;

      if ( this.wizard.model.newSnapshot.identificationProvince ) {
        this.wizard.model.identificationProvinceDisplayValue = this.stateProvinceService.getDisplayValue ( this.wizard.model.newSnapshot.identificationProvince, 'CA' );
      }
      if ( this.wizard.model.newSnapshot.taxJurisdictionResidence ) {
        this.wizard.model.taxJurisdictionResidenceDisplayValue = this.stateProvinceService.getDisplayValue ( this.wizard.model.newSnapshot.taxJurisdictionResidence, 'CA' );
      }
    }

    return of ( EditCustomerIdentificationPageType.CONFIRMATION );
  }

  private getIdentificationType ( type: string ): IdentificationType {
    if ( this.wizard.model.selection.getCustomer ().isCanadian ) {
      return this.canadianFormOptions.identificationTypes.find ( identificationType => identificationType.type === type );
    } else {
      return IdentificationTypeService.findUSOptionByType ( type as IdentificationTypeType );
    }
  }

  private getNoTaxpayerIdReason ( code: string ): ReasonCode {
    return this.canadianFormOptions.noTaxpayerIdReasons.find ( reason => reason.reasonCode === code );
  }

  private getOccupation ( type: string ): Occupation {
    return this.canadianFormOptions.occupations.find ( occupation => occupation.type === type );
  }

  private loadData (): Observable<any> {
    if ( this.wizard.model.selection.getCustomer ().isCanadian ) {
      return this.formBuilderService
        .loadCanadianFormOptions ( this.wizard.model.selection.platform )
        .pipe (
          tap ( data => {
            this.canadianFormOptions = data;
            this.updateCanadianForm ();
          } )
        );
    } else {
      this.updateUSForm ();
      return of ( null );
    }
  }

  private updateCanadianForm () {
    const identificationType = this.getIdentificationType ( this.snapshot.identificationType );
    const occupation         = this.getOccupation ( this.snapshot.occupation );

    this.wizardForm.get ( 'occupation' ).setValue ( occupation );
    this.wizardForm.get ( 'identificationType' ).setValue ( identificationType );
    this.wizardForm.get ( 'identificationNumber' ).setValue ( this.snapshot.identificationNumber );
    this.wizardForm.get ( 'identificationProvince' ).setValue ( this.snapshot.identificationProvince );
    this.wizardForm.get ( 'expirationDate' ).setValue ( this.snapshot.identificationExpirationDate );
    this.wizardForm.get ( 'verificationDate' ).setValue ( this.snapshot.identificationVerificationDate );
    this.wizardForm.get ( 'taxpayerId' ).setValue ( this.snapshot.taxpayerId );
    this.wizardForm.get ( 'residence' ).setValue ( this.snapshot.taxJurisdictionResidence );

    if ( this.snapshot.taxpayerId ) {
      this.wizardForm.get ( 'noTaxpayerIdReason' ).setValue ( null );
      this.wizardForm.get ( 'noTaxpayerIdReason' ).disable ();
    } else {
      const noTaxpayerIdReason = this.getNoTaxpayerIdReason ( this.snapshot.noTaxpayerIdReasonCode );
      this.wizardForm.get ( 'noTaxpayerIdReason' ).setValue ( noTaxpayerIdReason );
      this.wizardForm.get ( 'noTaxpayerIdReason' ).setValidators ( Validators.required );

      if ( noTaxpayerIdReason && noTaxpayerIdReason.reasonCode === IdentificationFormBuilderService.OTHER_REASON_CODE ) {
        this.wizardForm.get ( 'noTaxpayerIdReasonDescription' ).setValue ( this.snapshot.noTaxpayerIdReasonDescription );
        this.wizardForm.get ( 'noTaxpayerIdReasonDescription' ).setValidators ( Validators.required );
      }
    }
  }

  private updateUSForm () {
    this.wizardForm.get ( 'identificationType' ).setValue ( this.snapshot.identificationType );
    this.wizardForm.get ( 'identificationNumber' ).setValue ( this.snapshot.identificationNumber );
  }

  protected initForm (): FormGroup {
    return IdentificationFormBuilderService.buildForm ( this.wizard.model.selection.getCustomer ().isCanadian );
  }
}
