import { AbstractWizard } from "src/app/core/wizard/abstract-wizard";
import { Type } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Selection } from "src/app/core/session/model/selection";
import { FileUploader } from 'ng2-file-upload';
import { Session } from "src/app/core/session/model/session";
import { ServeUploadReason } from "./serve-upload-reason";
import {ServeUploadDocumentFormPageComponent} from "./serve-upload-document-form-page/serve-upload-document-form-page.component";
import {ServeUploadDocumentConfirmationPageComponent} from "./serve-upload-document-confirmation-page/serve-upload-document-confirmation-page.component";
import {ServeUploadDocumentResultPageComponent} from "./serve-upload-document-result-page/serve-upload-document-result-page.component";

export class ServeUploadDocumentWizard extends AbstractWizard<ServeUploadDocumentWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'serve-upload-document';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new ServeUploadDocumentWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ServeUploadDocumentFormPageComponent );
    pageMap.set ( 'confirmation-page', ServeUploadDocumentConfirmationPageComponent );
    pageMap.set ( 'result-page', ServeUploadDocumentResultPageComponent );
  }
}

export class ServeUploadDocumentWizardModel {
  fileUploader: FileUploader;
  reason: ServeUploadReason;
  selection: Selection<any>;
  session: Session;
  success: boolean = true;
}
