import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { VmsUploadDocumentWizard } from '../vms-upload-document-wizard';

@Component ( {
  selector: 'cca-vms-upload-document-result-page',
  templateUrl: './vms-upload-document-result-page.component.html',
  styleUrls: [ './vms-upload-document-result-page.component.scss' ]
} )
export class VmsUploadDocumentResultPageComponent extends WizardResultPage<VmsUploadDocumentWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
