import {Component} from '@angular/core';
import {WizardResultPage} from "../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";
import {ServeUploadDocumentWizard} from "../serve-upload-document-wizard";

@Component({
  selector: 'cca-serve-upload-document-result-page',
  templateUrl: './serve-upload-document-result-page.component.html',
  styleUrls: ['./serve-upload-document-result-page.component.scss']
})
export class ServeUploadDocumentResultPageComponent extends WizardResultPage<ServeUploadDocumentWizard> {

  constructor() {
    super();
  }

  isSuccess(): boolean {
    return this.wizard.model.success;
  }

}
