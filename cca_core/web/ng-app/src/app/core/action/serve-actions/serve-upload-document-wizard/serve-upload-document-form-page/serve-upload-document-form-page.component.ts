import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GenericOption} from "../../../../model/generic-option";
import {Observable, of} from "rxjs";
import {WizardPage} from "../../../../wizard/wizard-page";
import {ServeUploadDocumentWizard} from "../serve-upload-document-wizard";
import {ServeUploadReason} from "../serve-upload-reason";
import {ServeFileService} from "../../../../file/serve-file.service";

@Component({
  selector: 'cca-serve-upload-document-form-page',
  templateUrl: './serve-upload-document-form-page.component.html',
  styleUrls: ['./serve-upload-document-form-page.component.scss']
})
export class ServeUploadDocumentFormPageComponent extends WizardPage<ServeUploadDocumentWizard> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  reasons: GenericOption<ServeUploadReason>[] = ServeFileService.getReasons().map(ServeUploadDocumentFormPageComponent.mapReason);

  constructor(
    private formBuilder: FormBuilder,
    private serveFileService: ServeFileService,
  ) {
    super();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.initForm();
  }

  onNext(): Observable<string> {
    this.wizard.model.reason = this.getValueFromForm<GenericOption<ServeUploadReason>>('reason').value;
    return of('confirmation-page');
  }

  onSelectFile() {
    this.wizardForm.get('isFileSelected').setValue(!!this.wizard.model.fileUploader.queue.length);
  }

  private initFileUploader(reason: ServeUploadReason): void {
    this.wizard.model.fileUploader = this.serveFileService.buildUploader(
      this.wizard.model.session,
      this.wizard.model.selection,
      reason.fileType,
      reason.reasonCode,
      reason.description
    );
  }

  private initForm() {
    this.wizardForm = this.formBuilder.group({
      'reason': [null, Validators.required],
      'isFileSelected': [false, Validators.requiredTrue],
    });

    this.onFormFieldChange('reason', (reason: GenericOption<ServeUploadReason>) => {
      this.initFileUploader(reason.value)
    })
  }

  private static mapReason(reason: ServeUploadReason): GenericOption<ServeUploadReason> {
    return {displayValue: reason.description, value: reason};
  }

}
