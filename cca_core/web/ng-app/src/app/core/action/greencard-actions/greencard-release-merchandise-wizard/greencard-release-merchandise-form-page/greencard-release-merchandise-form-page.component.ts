import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { GreencardReleaseMerchandiseWizard, MerchandiseReleaseDecision } from '../greencard-release-merchandise-wizard';
import { GenericOption } from 'src/app/core/model/generic-option';

@Component ( {
  selector: 'cca-greencard-release-merchandise-form-page',
  templateUrl: './greencard-release-merchandise-form-page.component.html',
  styleUrls: [ './greencard-release-merchandise-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class GreencardReleaseMerchandiseFormPageComponent extends WizardPage<GreencardReleaseMerchandiseWizard> {
  readonly key: string             = 'form-page';
  wizardForm: FormGroup            = new FormGroup ( {} );
  readonly isCloseable: boolean    = true;
  readonly isNextable: boolean     = true;
  readonly closeButtonText: string = 'Cancel';

  readonly decisions: GenericOption<MerchandiseReleaseDecision>[] = [
    {
      displayValue: 'Approved',
      value: MerchandiseReleaseDecision.APPROVED,
    },
    {
      displayValue: 'Denied',
      value: MerchandiseReleaseDecision.DENIED,
    },
  ];

  reasons: GenericOption<string>[] = [];

  constructor ( private formBuilder: FormBuilder ) {
    super ();
    this.initForm ();
  }

  onNext (): Observable<any> {
    this.wizard.model.comment  = this.getComment ();
    this.wizard.model.decision = this.getDecision ();
    this.wizard.model.reason   = this.getReason ();
    return of ( 'confirmation-page' );
  }

  private getComment (): string {
    return this.getValueFromForm<string> ( 'comment' );
  }

  private getDecision (): MerchandiseReleaseDecision {
    return this.getValueFromForm<GenericOption<MerchandiseReleaseDecision>> ( 'decision' ).value;
  }

  private getReason (): string {
    return this.getValueFromForm<GenericOption<string>> ( 'reason' ).value;
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'comment': [ null ],
      'decision': [ null ],
      'reason': [ { value: null, disabled: true } ],
    } );

    this.onFormFieldChange ( 'decision', ( decision: GenericOption<MerchandiseReleaseDecision> ) => {
      this.reasons = GreencardReleaseMerchandiseFormPageComponent
        .getReasonsByDecision ( decision.value )
        .map ( reason => ({ displayValue: reason, value: reason }) );
      this.wizardForm.get ( 'reason' ).enable ();
    } );
  }

  private static getReasonsByDecision ( decision: MerchandiseReleaseDecision ): string[] {
    switch ( decision ) {
      case MerchandiseReleaseDecision.APPROVED:
        return [
          'Letter Received',
        ];
      case MerchandiseReleaseDecision.DENIED:
        return [
          'Letter Not Legitimate',
          'Bad Merchant',
          'Merchant Letter Not Received',
          'Returned Funds',
        ];
    }
  }
}
