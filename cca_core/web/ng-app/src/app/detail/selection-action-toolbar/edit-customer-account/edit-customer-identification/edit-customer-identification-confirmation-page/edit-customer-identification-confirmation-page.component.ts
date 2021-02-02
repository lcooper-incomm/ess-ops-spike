import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import * as _ from 'lodash';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { FsapiGenericResponse } from 'src/app/core/model/fsapi-generic-response';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { UpdateAccountRequest } from 'src/app/core/customer/update-account-request';
import { WizardConfirmationPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import { CustomerAccountChangeBuilder } from '../../change-builder/customer-account-change-builder.service';
import { EditCustomerAccountChangeItem } from '../../change-builder/edit-customer-account-change-item';
import { EditCustomerAccountFieldType } from '../../change-builder/edit-customer-account-field-type.enum';
import { EditCustomerContactPageType } from '../../edit-customer-contact/edit-customer-contact-wizard';
import { EditCustomerIdentificationWizard } from '../edit-customer-identification-wizard';
import { UpdateAccountRequestBuilder } from '../../request-builder/update-account-request-builder.service';

@Component ( {
  selector: 'cca-edit-customer-identification-confirmation-page',
  templateUrl: './edit-customer-identification-confirmation-page.component.html',
  styleUrls: [ './edit-customer-identification-confirmation-page.component.scss' ]
} )
export class EditCustomerIdentificationConfirmationPageComponent extends WizardConfirmationPage<EditCustomerIdentificationWizard> {

  changes: EditCustomerAccountChangeItem[] = [];

  constructor (
    private customerService: CustomerService,
    private formBuilder: CcaFormBuilder,
    private requestBuilder: UpdateAccountRequestBuilder,
  ) {
    super ();
  }

  ngOnInit (): void {
    this.initForm ();
  }

  onLoad (): Observable<any> {
    this.changes = this.buildChanges ();

    if ( this.changes.length ) {
      this.isNextable     = true;
      this.backButtonText = 'No';
    } else {
      this.isNextable     = false;
      this.backButtonText = 'Back';
      setTimeout ( () => this.footer = null, 10 );
    }

    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.isFailed = false;
    return this.submitChanges ()
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return of ( null );
        } ),
        mapTo ( EditCustomerContactPageType.RESULT ),
      );
  }

  private buildChanges (): EditCustomerAccountChangeItem[] {
    return [
      this.buildChange ( 'identificationExpirationDate', 'ID Expiration Date', EditCustomerAccountFieldType.IDENTIFICATION_EXPIRATION_DATE, UpdateAccountActionType.UPDATE_IDENTIFICATION ),
      this.buildChange ( 'identificationNumber', 'ID Number', EditCustomerAccountFieldType.IDENTIFICATION_NUMBER, UpdateAccountActionType.UPDATE_IDENTIFICATION ),
      this.buildChange ( 'identificationProvince', 'ID Province', EditCustomerAccountFieldType.IDENTIFICATION_PROVINCE, UpdateAccountActionType.UPDATE_IDENTIFICATION, this.wizard.model.identificationProvinceDisplayValue ),
      this.buildChange ( 'identificationType', 'ID Type', EditCustomerAccountFieldType.IDENTIFICATION_TYPE, UpdateAccountActionType.UPDATE_IDENTIFICATION, this.wizard.model.identificationType && this.wizard.model.identificationType.description ),
      this.buildChange ( 'identificationVerificationDate', 'ID Verification Date', EditCustomerAccountFieldType.IDENTIFICATION_VERIFICATION_DATE, UpdateAccountActionType.UPDATE_IDENTIFICATION ),
      this.buildChange ( 'noTaxpayerIdReasonCode', 'No Taxpayer ID Reason', EditCustomerAccountFieldType.NO_TAXPAYER_ID_REASON_CODE, UpdateAccountActionType.UPDATE_TAX_INFO, this.wizard.model.noTaxpayerIdReason && this.wizard.model.noTaxpayerIdReason.reasonDescription ),
      this.buildChange ( 'noTaxpayerIdReasonDescription', 'No Taxpayer ID Explanation', EditCustomerAccountFieldType.NO_TAXPAYER_ID_REASON_DESCRIPTION, UpdateAccountActionType.UPDATE_IDENTIFICATION ),
      this.buildChange ( 'occupation', 'Occupation', EditCustomerAccountFieldType.OCCUPATION, UpdateAccountActionType.UPDATE_OCCUPATION, this.wizard.model.occupation && this.wizard.model.occupation.name ),
      this.buildChange ( 'taxJurisdictionResidence', 'Tax Residence Jurisdiction', EditCustomerAccountFieldType.TAX_JURISDICTION_RESIDENCE, UpdateAccountActionType.UPDATE_TAX_INFO, this.wizard.model.taxJurisdictionResidenceDisplayValue ),
      this.buildChange ( 'taxpayerId', 'Taxpayer ID', EditCustomerAccountFieldType.TAXPAYER_ID, UpdateAccountActionType.UPDATE_TAX_INFO ),
    ].filter ( change => !!change );
  }

  private buildChange (
    fieldName: string,
    label: string,
    fieldType: EditCustomerAccountFieldType,
    actionType: UpdateAccountActionType,
    displayValue?: string,
  ): EditCustomerAccountChangeItem | null {
    return CustomerAccountChangeBuilder.buildChange (
      this.wizard.model.originalSnapshot,
      this.wizard.model.newSnapshot,
      fieldName,
      label,
      fieldType,
      actionType,
      displayValue,
    );
  }

  private buildRequest ( action: UpdateAccountActionType ): UpdateAccountRequest {
    const comment  = this.wizardForm.get ( 'comment' ).value;
    const customer = this.wizard.model.selection.getCustomer ();
    const platform = this.wizard.model.selection.platform;
    const snapshot = this.wizard.model.newSnapshot;

    return this.requestBuilder.buildRequest ( snapshot, action, customer, platform, customer.occupation, comment, null );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( null, true ),
    } );
  }

  private submitChanges (): Observable<FsapiGenericResponse[]> {
    const customerId                                = this.wizard.model.selection.getCustomer ().id;
    const actions: UpdateAccountActionType[]        = _.uniq ( this.changes.map ( change => change.actionType ) );
    const tasks: Observable<FsapiGenericResponse>[] = actions.map ( action => {
      return this.customerService.updateAccount ( customerId, this.buildRequest ( action ) );
    } );
    return forkJoin ( tasks );
  }
}
