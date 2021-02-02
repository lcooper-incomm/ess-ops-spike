import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Customer } from "src/app/core/customer/customer";
import { Selection } from "src/app/core/session/model/selection";
import { VmsUploadDocumentFormPageComponent } from "./vms-upload-document-form-page/vms-upload-document-form-page.component";
import { VmsUploadDocumentConfirmationPageComponent } from "./vms-upload-document-confirmation-page/vms-upload-document-confirmation-page.component";
import { VmsUploadDocumentResultPageComponent } from "./vms-upload-document-result-page/vms-upload-document-result-page.component";
import { FileUploader } from 'ng2-file-upload';
import { Session } from "src/app/core/session/model/session";
import { VmsUploadReason } from "./vms-upload-reason";

export class VmsUploadDocumentWizard extends AbstractWizard<VmsUploadDocumentWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'vms-upload-document';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new VmsUploadDocumentWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', VmsUploadDocumentFormPageComponent );
    pageMap.set ( 'confirmation-page', VmsUploadDocumentConfirmationPageComponent );
    pageMap.set ( 'result-page', VmsUploadDocumentResultPageComponent );
  }
}

export class VmsUploadDocumentWizardModel {
  fileUploader: FileUploader;
  reason: VmsUploadReason;
  selection: Selection<Customer>;
  session: Session;
  success: boolean = true;
}
