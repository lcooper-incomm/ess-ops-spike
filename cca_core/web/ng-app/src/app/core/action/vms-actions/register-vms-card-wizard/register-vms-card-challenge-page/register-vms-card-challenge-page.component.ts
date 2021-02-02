import { Component } from '@angular/core';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { RegisterVmsCardWizard, RegisterVmsCardPage } from '../register-vms-card-wizard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { RegisterVmsCardRequestBuilderService } from '../register-vms-card-request-builder.service';
import { ChallengeQuestion, ChallengeAnswer } from '../../models/vms-request-models';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-challenge-page',
  templateUrl: './register-vms-card-challenge-page.component.html',
  styleUrls: [ './register-vms-card-challenge-page.component.scss' ],
} )
export class RegisterVmsCardChallengePageComponent extends WizardFormPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.CHALLENGE;

  constructor ( private customerService: CustomerService, private requestBuilder: RegisterVmsCardRequestBuilderService ) {
    super ();
    this.nextButtonText = 'Submit';
    this.width          = WizardWidth.MEDIUM;
  }

  onLoad (): Observable<any> {
    this.wizardForm = this.initForm ();
    this.wizard.model.challengeInfo.questions.forEach ( question => {
      this.wizardForm.addControl ( this.getQuestionControlName ( question ), new FormControl ( null, Validators.required ) );
    } );
    return of ( null );
  }

  onNext (): Observable<string> {
    const customerId = this.wizard.model.customer.id;

    // Only pass in the selected answer
    this.wizard.model.challengeInfo.questions.forEach ( question => {
      const controlName    = this.getQuestionControlName ( question );
      const selectedAnswer = this.getValueFromForm<ChallengeAnswer> ( controlName );
      question.answers     = question.answers.filter ( answer => answer.id === selectedAnswer.id );
    } );

    const createSession = this.wizard.model.createSession;
    const partner       = this.wizard.model.partner;
    const platform      = this.wizard.model.platform;
    const request       = this.requestBuilder.buildRegisterCardRequest ( this.wizard.model );

    return this.customerService
      .registerCard ( customerId, request, platform, partner, createSession )
      .pipe (
        catchError(() => {
          this.wizard.model.success = false;
          return of(null);
        }),
        mapTo(RegisterVmsCardPage.RESULT)
      );
  }

  getQuestionControlName ( question: ChallengeQuestion ): string {
    return 'question-' + question.id;
  }

  protected initForm (): FormGroup {
    return new FormGroup ( {} );
  }
}
