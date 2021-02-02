import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WizardResultPage} from '../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {ViewBlockedMerchantsWizard} from '../view-blocked-merchants-wizard';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-view-blocked-merchants-result-page',
  templateUrl: './view-blocked-merchants-result-page.component.html'
})
export class ViewUnblockedMerchantsResultPageComponent extends WizardResultPage<ViewBlockedMerchantsWizard> {

  title: string = 'Unblock Merchants';

  constructor() {
    super();
  }

  isSuccess(): boolean {
    return this.wizard.model.success;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

}
