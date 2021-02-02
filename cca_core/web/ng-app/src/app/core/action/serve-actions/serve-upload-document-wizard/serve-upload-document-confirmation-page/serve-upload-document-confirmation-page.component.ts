import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../wizard/wizard-page";
import {ServeUploadDocumentWizard} from "../serve-upload-document-wizard";
import {FormGroup} from "@angular/forms";
import {FileService} from "../../../../file/file.service";
import {Observable, of} from "rxjs";
import {catchError, mapTo} from "rxjs/operators";

@Component({
  selector: 'cca-serve-upload-document-confirmation-page',
  templateUrl: './serve-upload-document-confirmation-page.component.html',
  styleUrls: ['./serve-upload-document-confirmation-page.component.scss']
})
export class ServeUploadDocumentConfirmationPageComponent extends WizardPage<ServeUploadDocumentWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private fileService: FileService) {
    super();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  onNext(): Observable<string> {
    this.wizard.model.success = true;
    return this.fileService
      .upload(this.wizard.model.fileUploader)
      .pipe(
        catchError(() => {
          this.wizard.model.success = false;
          return of(null);
        }),
        mapTo('result-page'),
      )
  }

  get filename(): string {
    return this.wizard.model.fileUploader.queue[0].file.name;
  }


}
