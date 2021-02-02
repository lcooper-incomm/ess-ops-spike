import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { VmsFileService } from 'src/app/core/file/vms-file.service';
import { VmsUploadReasonFileType } from 'src/app/core/action/vms-actions/vms-upload-document-wizard/vms-upload-reason';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { EditCustomerSummaryPageType, EditCustomerSummaryWizard } from '../edit-customer-summary-wizard';

@Component ( {
  selector: 'cca-documents-page',
  templateUrl: './edit-customer-summary-documents-page.component.html',
  styleUrls: [ './edit-customer-summary-documents-page.component.scss' ]
} )
export class EditCustomerSummaryDocumentsPageComponent extends WizardPage<EditCustomerSummaryWizard> {
  key: string           = EditCustomerSummaryPageType.DOCUMENTS;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private vmsFileService: VmsFileService ) {
    super ();
    this.isBackable      = true;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initFileUploader ();
  }

  handleFileSelected (): void {
    this.wizardForm.get ( 'isFileSelected' ).setValue ( !!this.wizard.model.fileUploader.queue.length );
  }

  onLoad (): Observable<any> {
    this.initForm ();
    return of ( null );
  }

  onNext (): Observable<string> {
    return of ( EditCustomerSummaryPageType.CONFIRMATION );
  }

  private initFileUploader (): void {
    this.wizard.model.fileUploader = this.vmsFileService.buildUploader (
      this.wizard.model.session,
      this.wizard.model.selection,
      VmsUploadReasonFileType.PROOF_OF_ID,
      37,
    );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      isFileSelected: new FormControl ( this.wizard.model.fileUploader.queue.length, [ Validators.requiredTrue ] )
    } );
  }
}
