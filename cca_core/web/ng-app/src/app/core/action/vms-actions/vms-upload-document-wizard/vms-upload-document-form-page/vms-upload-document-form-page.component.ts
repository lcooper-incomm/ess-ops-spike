import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { VmsUploadDocumentWizard } from '../vms-upload-document-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericOption } from 'src/app/core/model/generic-option';
import { Observable, of } from 'rxjs';
import { VmsFileService } from 'src/app/core/file/vms-file.service';
import { VmsUploadReason } from '../vms-upload-reason';

@Component ( {
  selector: 'cca-vms-upload-document-form-page',
  templateUrl: './vms-upload-document-form-page.component.html',
  styleUrls: [ './vms-upload-document-form-page.component.scss' ]
} )
export class VmsUploadDocumentFormPageComponent extends WizardPage<VmsUploadDocumentWizard> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  reasons: GenericOption<VmsUploadReason>[] = VmsFileService.getReasons ().map ( VmsUploadDocumentFormPageComponent.mapReason );

  constructor (
    private formBuilder: FormBuilder,
    private vmsFileService: VmsFileService,
  ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.initForm ();
  }

  onNext (): Observable<string> {
    this.wizard.model.reason = this.getValueFromForm<GenericOption<VmsUploadReason>> ( 'reason' ).value;
    return of ( 'confirmation-page' );
  }

  onSelectFile () {
    this.wizardForm.get ( 'isFileSelected' ).setValue ( !!this.wizard.model.fileUploader.queue.length );
  }

  private initFileUploader ( reason: VmsUploadReason ): void {
    this.wizard.model.fileUploader = this.vmsFileService.buildUploader (
      this.wizard.model.session,
      this.wizard.model.selection,
      reason.fileType,
      reason.reasonCode,
    );
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'reason': [ null, Validators.required ],
      'isFileSelected': [ false, Validators.requiredTrue ],
    } );

    this.onFormFieldChange ( 'reason', ( reason: GenericOption<VmsUploadReason> ) => {
      this.initFileUploader ( reason.value )
    } )
  }

  private static mapReason ( reason: VmsUploadReason ): GenericOption<VmsUploadReason> {
    return { displayValue: reason.description, value: reason };
  }
}
