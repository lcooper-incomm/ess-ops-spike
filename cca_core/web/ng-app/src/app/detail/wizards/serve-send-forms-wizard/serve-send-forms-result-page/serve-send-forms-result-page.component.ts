import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {ServeSendFormsWizard} from '../serve-send-forms-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'cca-serve-send-forms-result-page',
  templateUrl: './serve-send-forms-result-page.component.html',
  styleUrls: ['./serve-send-forms-result-page.component.scss']
})
export class ServeSendFormsResultPageComponent extends WizardResultPage<ServeSendFormsWizard> implements OnInit {

  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();
  }

  ngOnInit() {
    this.title           = 'Send Forms';
    this.navigationTitle = 'Success';
    this.width           = WizardWidth.LARGE;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onLoad(): Observable<any> {
    if (this.isSuccess()) {
      this.navigationTitle = 'Success';
    } else {
      this.navigationTitle = 'Failed';
    }

    return super.onLoad();
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
