import { catchError, map } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { GreencardActionService } from '../../greencard-action-service/greencard-action.service';
import { GreencardReleaseMerchandiseWizard, MerchandiseReleaseDecision } from '../greencard-release-merchandise-wizard';
import { MerchandiseReleaseRequest } from '../../greencard-action-service/greencard-action-request-models';

@Component ( {
  selector: 'cca-greencard-release-merchandise-confirmation-page',
  templateUrl: './greencard-release-merchandise-confirmation-page.component.html',
  styleUrls: [ './greencard-release-merchandise-confirmation-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class GreencardReleaseMerchandiseConfirmationPageComponent extends WizardPage<GreencardReleaseMerchandiseWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private greencardActionService: GreencardActionService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Yes';
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
  }

  onNext (): Observable<any> {
    this.wizard.model.success = true;
    return this.greencardActionService
      .releaseMerchandise ( this.buildRequest () )
      .pipe (
        map ( result => {
          this.wizard.model.result = result;
          return 'result-page';
        } ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( 'result-page' )
        } )
      );
  }

  get comment (): string {
    return this.wizard.model.comment;
  }

  get decision (): string {
    return this.wizard.model.decision;
  }

  get reason (): string {
    return this.wizard.model.reason;
  }

  get serialNumber (): string {
    return this.wizard.model.card.identifiers.serialNumber;
  }

  buildRequest (): MerchandiseReleaseRequest {
    return {
      approved: this.wizard.model.decision === MerchandiseReleaseDecision.APPROVED,
      comment: this.wizard.model.comment,
      reason: this.wizard.model.reason,
      serialNumber: this.wizard.model.card.identifiers.serialNumber,
    };
  }
}
