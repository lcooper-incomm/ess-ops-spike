import { Component } from '@angular/core';
import { ServeAdjustTransactionWizard } from '../serve-adjust-transaction-wizard';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceholderDictionary } from '../../../../core/wizard/placeholders/placeholder-dictionary';
import { WizardResultPage } from '../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';

@Component({
  templateUrl: './serve-adjust-transaction-result-page.component.html',
})
export class ServeAdjustTransactionResultPageComponent extends WizardResultPage<ServeAdjustTransactionWizard> {
  title: string = 'Adjust Transaction';
  navigationTitle: string = 'Success';

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