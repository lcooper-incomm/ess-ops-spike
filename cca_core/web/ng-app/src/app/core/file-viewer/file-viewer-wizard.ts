import {Type} from '@angular/core';
import {AbstractWizard} from 'src/app/core/wizard/abstract-wizard';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {FileViewerPageComponent} from "./file-viewer-page/file-viewer-page.component";

export class FileViewerWizard extends AbstractWizard<FileViewerWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'file-viewer';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new FileViewerWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', FileViewerPageComponent);
  }
}

export class FileViewerWizardModel {
  file: any;
  fileMimeType: string;
}
