import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {AddDocumentActionWizard} from '../add-document-action-wizard';
import {WizardResultPage} from '../../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-add-document-action-result-page',
  templateUrl: './add-document-action-result-page.component.html',
  styleUrls: ['./add-document-action-result-page.component.scss']
})
export class AddDocumentActionResultPageComponent extends WizardResultPage<AddDocumentActionWizard> implements OnInit {

  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();

    this.title           = 'Document Change Status';
    this.isCloseable = true;
  }

  ngOnInit() {
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
