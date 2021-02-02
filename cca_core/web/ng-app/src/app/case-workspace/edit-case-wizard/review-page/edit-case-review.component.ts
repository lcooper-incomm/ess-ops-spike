import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../core/wizard/wizard-page";
import { EditCaseWizard } from "../edit-case-wizard";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../core/wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SessionService } from "../../../core/session/session.service";

@Component ( {
  selector: 'cca-edit-case-review',
  templateUrl: './edit-case-review.component.html',
  styleUrls: [ './edit-case-review.component.scss' ]
} )
export class EditCaseReviewComponent extends WizardPage<EditCaseWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private sessionService: SessionService ) {
    super ();
    this.isBackable  = true;
    this.isCloseable = true;
    this.isNextable  = true;
    this.width       = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onBack (): Observable<string> {
    return of ( 'form-page' );
  }

  onNext (): Observable<any> {
    return this.sessionService.assignCase ( this.wizard.model.request )
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( value ) => {
          return 'confirmation-page';
        } )
      );
  }
}
