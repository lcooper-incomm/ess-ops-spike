import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { MergeSelectionPageType, MergeSelectionWizard } from '../merge-selection-wizard';

@Component({
  selector: 'cca-merge-selection-result-page',
  templateUrl: './merge-selection-result-page.component.html',
  styleUrls: ['./merge-selection-result-page.component.scss']
})
export class MergeSelectionResultPageComponent extends WizardResultPage<MergeSelectionWizard> {
  key: string = MergeSelectionPageType.RESULT;

  isSuccess(): boolean {
    return this.wizard.model.success;
  }
}
