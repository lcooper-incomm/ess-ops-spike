import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { CardHolder, GiftCardReplacementRequest } from '../../greencard-action-service/greencard-action-request-models';
import { GreencardActionService } from '../../greencard-action-service/greencard-action.service';
import { ReplaceGreencardWizard } from '../replace-greencard-wizard';

@Component ( {
  selector: 'cca-replace-greencard-confirmation-page',
  templateUrl: './replace-greencard-confirmation-page.component.html',
  styleUrls: [ './replace-greencard-confirmation-page.component.scss' ],
} )
export class ReplaceGreencardConfirmationPageComponent extends WizardPage<ReplaceGreencardWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  backButtonText: string  = 'No';
  closeButtonText: string = 'Cancel';
  nextButtonText: string  = 'Yes';

  constructor ( private actionService: GreencardActionService ) {
    super ();
  }

  onNext (): Observable<string> {
    return this.actionService
      .replaceCard ( this.buildRequest (), this.wizard.model.reorder )
      .pipe (
        map ( result => {
          this.wizard.model.result  = result;
          this.wizard.model.success = true;
          return 'result-page'
        } ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( 'result-page' );
        } ),
      );
  }

  get cardHolder (): CardHolder {
    return this.wizard.model.cardHolder;
  }

  get serialNumber (): string {
    return this.wizard.model.card.identifiers.serialNumber;
  }

  get replacePan (): boolean {
    return this.wizard.model.replacePan;
  }

  get reorder (): boolean {
    return this.wizard.model.reorder;
  }

  private buildRequest (): GiftCardReplacementRequest {
    return {
      serialNumber: this.wizard.model.card.identifiers.serialNumber,
      replacePan: !!this.wizard.model.replacePan,
      cardHolder: this.wizard.model.cardHolder.flatten (),
    };
  }
}
