import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {ServeArchiveDocumentWizard} from '../serve-archive-document-wizard';

@Component({
  selector: 'cca-serve-archive-document-result-page',
  templateUrl: './result-page.component.html'
})
export class ServeArchiveDocumentResultPageComponent extends WizardResultPage<ServeArchiveDocumentWizard> {

  constructor() {
    super();

    this.title           = 'Archive Document';
    this.navigationTitle = 'Result';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
