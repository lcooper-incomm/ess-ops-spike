import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { GreencardReleasePreAuthWizard } from '../greencard-release-preauth-wizard';
import { Observable, of } from 'rxjs';
import { GreencardActionService } from '../../greencard-action-service/greencard-action.service';
import { catchError, map } from 'rxjs/operators';
import { GreencardReleasePreAuthRequest } from '../../greencard-action-service/greencard-action-request-models';
import { Transaction } from 'src/app/core/transaction/transaction';

@Component ( {
  selector: 'cca-greencard-release-preauth-confirmation-page',
  templateUrl: './greencard-release-preauth-confirmation-page.component.html',
  styleUrls: [ './greencard-release-preauth-confirmation-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class GreencardReleasePreauthConfirmationPageComponent extends WizardPage<GreencardReleasePreAuthWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private actionService: GreencardActionService ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'No';
    this.nextButtonText  = 'Yes';
  }

  get transaction (): Transaction {
    return this.wizard.model.transaction;
  }

  onNext (): Observable<string> {
    return this.actionService
      .releasePreAuth ( this.buildRequest () )
      .pipe (
        map ( response => {
          this.wizard.model.result  = response;
          this.wizard.model.success = true;
          return 'result-page';
        } ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( 'result-page' )
        } ),
      );
  }

  private buildRequest (): GreencardReleasePreAuthRequest {
    return {
      accLogId: this.wizard.model.transaction.id,
    };
  }
}
