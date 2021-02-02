import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {WizardResultPage} from '../../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {UpdateDocumentWizard} from '../update-document-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';

@Component({
  selector: 'cca-update-document-result-page',
  templateUrl: './update-document-result-page.component.html'
})
export class UpdateDocumentResultPageComponent extends WizardResultPage<UpdateDocumentWizard> implements OnInit {

  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();

    this.title       = 'Update Document';
    this.isCloseable = true;
    this.width       = WizardWidth.LARGE;
  }

  ngOnInit() {
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
