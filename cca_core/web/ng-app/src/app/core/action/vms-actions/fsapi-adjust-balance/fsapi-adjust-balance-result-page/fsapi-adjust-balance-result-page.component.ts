import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { FsapiAdjustBalanceWizard } from '../fsapi-adjust-balance-wizard';

@Component ( {
  selector: 'cca-fsapi-adjust-balance-result-page',
  templateUrl: './fsapi-adjust-balance-result-page.component.html',
  styleUrls: [ './fsapi-adjust-balance-result-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class FsapiAdjustBalanceResultPageComponent extends WizardResultPage<FsapiAdjustBalanceWizard> {
  width: WizardWidth = WizardWidth.MEDIUM;

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
