import {Component, OnInit} from '@angular/core';
import {AlderResendEmailWizard} from '../alder-resend-email-wizard';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cca-alder-resend-email-result',
  templateUrl: './result-page.html'
})
export class AlderResendEmailResultComponent extends WizardResultPage<AlderResendEmailWizard> {

  title: string           = 'Resend Email';
  navigationTitle: string = 'Result';

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }
}
