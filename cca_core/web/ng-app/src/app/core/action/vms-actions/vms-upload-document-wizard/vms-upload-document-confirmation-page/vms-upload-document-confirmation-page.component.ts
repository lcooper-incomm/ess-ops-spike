import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { VmsUploadDocumentWizard } from '../vms-upload-document-wizard';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FileService } from 'src/app/core/file/file.service';
import { mapTo, catchError } from 'rxjs/operators';

@Component ( {
  selector: 'cca-vms-upload-document-confirmation-page',
  templateUrl: './vms-upload-document-confirmation-page.component.html',
  styleUrls: [ './vms-upload-document-confirmation-page.component.scss' ]
} )
export class VmsUploadDocumentConfirmationPageComponent extends WizardPage<VmsUploadDocumentWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private fileService: FileService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.fileService
      .upload ( this.wizard.model.fileUploader )
      .pipe (
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      )
  }

  get filename (): string {
    return this.wizard.model.fileUploader.queue[ 0 ].file.name;
  }
}
