import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { OrderNewCardWizard } from "../order-new-card-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { ChallengeAnswer, ChallengeQuestion } from "../../../../../core/action/vms-actions/models/vms-request-models";
import { catchError, map } from "rxjs/operators";
import { CardService } from "../../../../../core/card/card.service";
import { PlatformType } from "../../../../../core/platform/platform-type.enum";
import { OrderNewCardBuilderService } from "../../order-new-card-builder-service";

@Component ( {
  selector: 'cca-order-new-card-challenge-page',
  templateUrl: './order-new-card-challenge-page.component.html',
  styleUrls: [ './order-new-card-challenge-page.component.scss' ]
} )
export class OrderNewCardChallengePageComponent extends WizardPage<OrderNewCardWizard> implements OnInit {
  key: string           = 'challenge-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private builderService: OrderNewCardBuilderService,
                private cardService: CardService ) {
    super ();
    this.nextButtonText = 'Submit';
    this.isNextable     = true;
    this.width          = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.wizardForm = this.initForm ();
    this.wizard.model.challengeInfo.questions.forEach ( question => {
      this.wizardForm.addControl ( this.getQuestionControlName ( question ), new FormControl ( null, Validators.required ) );
    } );
    return of ( null );
  }

  onNext (): Observable<string> {

    // Only pass in the selected answer
    this.wizard.model.challengeInfo.questions.forEach ( question => {
      const controlName    = this.getQuestionControlName ( question );
      const selectedAnswer = this.getValueFromForm<ChallengeAnswer> ( controlName );
      question.answers     = question.answers.filter ( answer => answer.id === selectedAnswer.id );
    } );

    this.wizard.model.request.challengeInfo = this.wizard.model.challengeInfo;

    return this.cardService
      .orderNewCard ( this.wizard.model.request, PlatformType.INCOMM )
      .pipe (
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        map ( result => {
          return 'result-page';
        } )
      );
  }

  getQuestionControlName ( question: ChallengeQuestion ): string {
    return 'question-' + question.id;
  }

  protected initForm (): FormGroup {
    return new FormGroup ( {} );
  }
}
