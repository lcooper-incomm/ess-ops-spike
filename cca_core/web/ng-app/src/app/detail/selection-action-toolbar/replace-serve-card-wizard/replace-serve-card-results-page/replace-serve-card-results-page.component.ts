import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WizardResultPage} from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {ReplaceServeCardWizard} from '../replace-serve-card-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-replace-serve-card-results-page',
  templateUrl: './replace-serve-card-results-page.component.html',
  styleUrls: ['./replace-serve-card-results-page.component.scss']
})
export class ReplaceServeCardResultsPageComponent extends WizardResultPage<ReplaceServeCardWizard> {

  constructor() {
    super();

    this.title = 'Replace Card';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
