import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import * as _ from 'lodash';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { UpdateAccountRequest } from 'src/app/core/customer/update-account-request';
import { WizardConfirmationPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import { CustomerAccountChangeBuilder } from '../../change-builder/customer-account-change-builder.service';
import { EditCustomerAccountChangeItem } from '../../change-builder/edit-customer-account-change-item';
import { EditCustomerAccountFieldType } from '../../change-builder/edit-customer-account-field-type.enum';
import { EditCustomerContactPageType, EditCustomerContactWizard } from '../edit-customer-contact-wizard';
import { UpdateAccountRequestBuilder } from '../../request-builder/update-account-request-builder.service';
import { FsapiGenericResponse } from 'src/app/core/model/fsapi-generic-response';

@Component ( {
  selector: 'cca-edit-customer-contact-confirmation-page',
  templateUrl: './edit-customer-contact-confirmation-page.component.html',
  styleUrls: [ './edit-customer-contact-confirmation-page.component.scss' ],
} )
export class EditCustomerContactConfirmationPageComponent extends WizardConfirmationPage<EditCustomerContactWizard> {

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

    if ( this.wizard.model.selection.getCustomer ().isActiveUnregistered ) {
      return [
        this.buildChange ( 'physicalAddressPostalCode', 'Postal Code', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_POSTAL_CODE, UpdateAccountActionType.UPDATE_ADDRESS )
      ].filter ( change => !!change );
    } else {
      return [
        this.buildChange ( 'emailAddress', 'Email Address', EditCustomerAccountFieldType.EMAIL_ADDRESS, UpdateAccountActionType.UPDATE_EMAIL ),
        this.buildChange ( 'homePhone', 'Home Phone', EditCustomerAccountFieldType.HOME_PHONE, UpdateAccountActionType.UPDATE_PHONE ),
        this.buildChange ( 'mobilePhone', 'Mobile Phone', EditCustomerAccountFieldType.MOBILE_PHONE, UpdateAccountActionType.UPDATE_PHONE ),
        this.buildChange ( 'mailingAddressCity', 'Mailing City', EditCustomerAccountFieldType.MAILING_ADDRESS_CITY, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'mailingAddressCountry', 'Mailing Country', EditCustomerAccountFieldType.MAILING_ADDRESS_COUNTRY, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'mailingAddressLine1', 'Mailing Line 1', EditCustomerAccountFieldType.MAILING_ADDRESS_LINE_1, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'mailingAddressLine2', 'Mailing Line 2', EditCustomerAccountFieldType.MAILING_ADDRESS_LINE_2, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'mailingAddressPostalCode', 'Mailing Postal Code', EditCustomerAccountFieldType.MAILING_ADDRESS_POSTAL_CODE, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'mailingAddressState', 'Mailing State', EditCustomerAccountFieldType.MAILING_ADDRESS_STATE, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'physicalAddressCity', 'Physical City', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_CITY, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'physicalAddressCountry', 'Physical Country', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_COUNTRY, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'physicalAddressLine1', 'Physical Line 1', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_LINE_1, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'physicalAddressLine2', 'Physical Line 2', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_LINE_2, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'physicalAddressPostalCode', 'Physical Postal Code', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_POSTAL_CODE, UpdateAccountActionType.UPDATE_ADDRESS ),
        this.buildChange ( 'physicalAddressState', 'Physical State', EditCustomerAccountFieldType.PHYSICAL_ADDRESS_STATE, UpdateAccountActionType.UPDATE_ADDRESS ),
      ].filter ( change => !!change );
    }
  }

  private buildChange ( fieldName: string, label: string, fieldType: EditCustomerAccountFieldType, actionType: UpdateAccountActionType ): EditCustomerAccountChangeItem | null {
    return CustomerAccountChangeBuilder.buildChange (
      this.wizard.model.originalSnapshot,
      this.wizard.model.newSnapshot,
      fieldName,
      label,
      fieldType,
      actionType
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
