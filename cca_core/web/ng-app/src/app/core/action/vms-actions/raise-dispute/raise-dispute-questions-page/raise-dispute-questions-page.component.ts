import { Component } from '@angular/core';
import { WizardPage } from "../../../../wizard/wizard-page";
import { RaiseDisputePageType, RaiseDisputeWizard } from "../raise-dispute-wizard";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { WizardWidth } from "../../../../wizard/wizard-width.enum";
import { DisputeProbingQuestion } from "../dispute-probing-question";

@Component ( {
  selector: 'cca-raise-dispute-questions-page',
  templateUrl: './raise-dispute-questions-page.component.html',
  styleUrls: [ './raise-dispute-questions-page.component.scss' ]
} )
export class RaiseDisputeQuestionsPageComponent extends WizardPage<RaiseDisputeWizard> {

  key: string           = RaiseDisputePageType.QUESTIONS;
  wizardForm: FormGroup = new FormGroup ( {} );

  private questionsReason: string;

  constructor () {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.initForm ();
    return of ( null );
  }

  onBack (): Observable<string> {
    this.saveQuestionAnswers ();
    return of ( RaiseDisputePageType.FORM );
  }

  onNext (): Observable<string> {
    this.saveQuestionAnswers ();
    return of ( RaiseDisputePageType.DOCUMENT );
  }

  /**
   * Save the question answers.  Do this on back or next page clicks.
   */
  saveQuestionAnswers (): void {
    (<FormArray>this.wizardForm.get ( 'questions' )).controls.forEach ( ( control: FormControl, index: number ) => {
      this.wizard.model.probingQuestions[ index ].answer = control.value;
    } );
  }

  private initForm (): void {
    let questions: DisputeProbingQuestion[] = [];

    //Use the model's questions if the reason hasn't changed
    if ( this.questionsReason && this.wizard.model.reason && this.questionsReason === this.wizard.model.reason.code ) {
      questions = this.wizard.model.probingQuestions;
    }
    //Else, build the questions new from the codexResponse
    else {
      this.questionsReason = this.wizard.model.reason ? this.wizard.model.reason.code : null;
      if ( this.codexResponse && this.codexResponse.questions ) {
        this.codexResponse.questions.forEach ( ( question: string ) => {
          questions.push ( new DisputeProbingQuestion ( {
            question: question
          } ) );
        } );
      }
      this.wizard.model.probingQuestions = questions;
    }

    //Build the formArray from the questions
    let questionsArray: FormControl[] = [];
    questions.forEach ( ( probingQuestion: DisputeProbingQuestion ) => {
      questionsArray.push ( new FormControl ( probingQuestion.answer, [ Validators.required, Validators.minLength ( 2 ), Validators.maxLength ( 500 ) ] ) );
    } );

    this.wizardForm = new FormGroup ( {
      questions: new FormArray ( questionsArray )
    } );
  }

}
