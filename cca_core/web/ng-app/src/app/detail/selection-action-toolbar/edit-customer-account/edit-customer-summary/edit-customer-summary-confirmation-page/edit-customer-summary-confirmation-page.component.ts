import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileItem } from 'ng2-file-upload';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, mapTo } from 'rxjs/operators';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { FileService } from 'src/app/core/file/file.service';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { UpdateAccountRequest } from 'src/app/core/customer/update-account-request';
import { WizardConfirmationPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import { CustomerAccountChangeBuilder } from '../../change-builder/customer-account-change-builder.service';
import { EditCustomerAccountChangeItem } from '../../change-builder/edit-customer-account-change-item';
import { EditCustomerAccountFieldType } from '../../change-builder/edit-customer-account-field-type.enum';
import { EditCustomerSummaryPageType, EditCustomerSummaryWizard } from '../edit-customer-summary-wizard';
import { UpdateAccountRequestBuilder } from '../../request-builder/update-account-request-builder.service';

@Component ( {
  selector: 'cca-edit-customer-summary-confirmation-page',
  templateUrl: './edit-customer-summary-confirmation-page.component.html',
  styleUrls: [ './edit-customer-summary-confirmation-page.component.scss' ],
} )
export class EditCustomerSummaryConfirmationPageComponent extends WizardConfirmationPage<EditCustomerSummaryWizard> {
  key: string = EditCustomerSummaryPageType.CONFIRMATION;

  changes: EditCustomerAccountChangeItem[] = [];

  constructor (
    private customerService: CustomerService,
    private fileService: FileService,
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
    return this.uploadDocuments ()
      .pipe (
        flatMap ( () => this.submitChanges () ),
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return of ( null );
        } ),
        mapTo ( EditCustomerSummaryPageType.RESULT ),
      );
  }

  private buildChanges (): EditCustomerAccountChangeItem[] {
    return [
      this.buildChange ( 'dateOfBirth', 'Date of Birth', EditCustomerAccountFieldType.DATE_OF_BIRTH ),
      this.buildChange ( 'firstName', 'First Name', EditCustomerAccountFieldType.FIRST_NAME ),
      this.buildChange ( 'lastName', 'Last Name', EditCustomerAccountFieldType.LAST_NAME ),
      this.buildChange ( 'mothersMaidenName', 'Mother\'s Maiden Name', EditCustomerAccountFieldType.MOTHERS_MAIDEN_NAME ),
    ].filter ( change => !!change );
  }

  private buildChange ( fieldName: string, label: string, fieldType: EditCustomerAccountFieldType ): EditCustomerAccountChangeItem | null {
    return CustomerAccountChangeBuilder.buildChange (
      this.wizard.model.originalSnapshot,
      this.wizard.model.newSnapshot,
      fieldName,
      label,
      fieldType,
      UpdateAccountActionType.UPDATE_NAME
    );
  }

  private buildRequest ( action: UpdateAccountActionType ): UpdateAccountRequest {
    const comment  = this.wizardForm.get ( 'comment' ).value;
    const customer = this.wizard.model.selection.getCustomer ();
    const platform = this.wizard.model.selection.platform;
    const reason   = this.wizardForm.get ( 'reason' ).value;
    const snapshot = this.wizard.model.newSnapshot;
    return this.requestBuilder.buildRequest ( snapshot, action, customer, platform, customer.occupation, comment, reason );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( null, true ),
      reason: new FormControl ( null, [ Validators.required ] )
    } );
  }

  private submitChanges (): Observable<any> {
    const customerId = this.wizard.model.selection.getCustomer ().id;
    return this.customerService.updateAccount ( customerId, this.buildRequest ( UpdateAccountActionType.UPDATE_NAME ) )
  }

  private uploadDocuments (): Observable<FileItem> {
    return this.fileService.upload ( this.wizard.model.fileUploader );
  }
}
