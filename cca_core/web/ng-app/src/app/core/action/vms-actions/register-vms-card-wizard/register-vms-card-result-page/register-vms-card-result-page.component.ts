import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RegisterVmsCardPage, RegisterVmsCardWizard } from '../register-vms-card-wizard';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-result-page',
  templateUrl: './register-vms-card-result-page.component.html',
  styleUrls: [ './register-vms-card-result-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class RegisterVmsCardResultPageComponent extends WizardResultPage<RegisterVmsCardWizard> {
  key: string = RegisterVmsCardPage.RESULT;

  constructor () {
    super ();
    this.width = WizardWidth.MEDIUM;
  }

  onLoad(): Observable<any> {
    return super.onLoad()
      .pipe(
        tap(() => {
          if (!this.isSuccess() && this.wizard.model.challengeInfo) {
            // Hide the challenge page and remove it from navigation history
            this.wizard.pages.get ( RegisterVmsCardPage.CHALLENGE ).instance.isIgnored = true;
            this.wizard.removeFromNavigationHistory(RegisterVmsCardPage.CHALLENGE);
            this.wizard.model.challengeInfo = null;
          }
        })
      );
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
