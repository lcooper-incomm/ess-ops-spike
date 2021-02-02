import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {ServeCancelTransactionWizard} from '../serve-cancel-transaction-wizard';

@Component({
  selector: 'cca-serve-cancel-transaction-result-page',
  templateUrl: './result-page.component.html'
})
export class ServeCancelTransactionResultPageComponent extends WizardResultPage<ServeCancelTransactionWizard> implements OnInit {

  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();
  }

  ngOnInit() {
    this.title           = 'Cancel Transaction';
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
