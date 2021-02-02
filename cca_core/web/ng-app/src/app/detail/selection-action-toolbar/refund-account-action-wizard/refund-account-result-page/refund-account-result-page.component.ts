import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {RefundAccountWizard} from '../refund-account-action-wizard';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-refund-account-result-page',
  templateUrl: './refund-account-result-page.component.html'
})
export class RefundAccountResultPageComponent extends WizardResultPage<RefundAccountWizard> implements OnInit {

  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();

    this.title       = 'Account Withdraw';
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
