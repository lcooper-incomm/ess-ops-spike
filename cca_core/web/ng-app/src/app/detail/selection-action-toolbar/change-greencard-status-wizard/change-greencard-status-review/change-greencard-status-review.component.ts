import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ChangeGreencardStatusWizard } from "../change-greencard-status-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { GreencardActionService } from "../../../../core/action/greencard-actions/greencard-action-service/greencard-action.service";
import { CsCoreStatus } from "../../../../core/model/cs-core-status";
import { StatusChangeResponse } from "../../../../core/action/greencard-actions/greencard-action-service/greencard-action-response-models";

@Component ( {
  selector: 'cca-change-greencard-status-review',
  templateUrl: '../change-greencard-status/change-greencard-status.component.html',
  styleUrls: [ './change-greencard-status-review.component.scss' ]
} )
export class ChangeGreencardStatusReviewComponent extends WizardPage<ChangeGreencardStatusWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private greencardService: GreencardActionService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit () {
    this.initForms ();
  }

  onClose (): Observable<string> {
    return of ( null );
  }

  onLoad (): Observable<string> {
    this.wizardForm.get ( 'comment' ).setValue ( this.wizard.model.comment );
    this.wizardForm.get ( 'comment' ).disable ();
    this.wizardForm.get ( 'cardStatusCode' ).setValue ( this.wizard.model.cardStatusCode );
    this.wizardForm.get ( 'cardStatusCode' ).disable ();
    return of ( null );
  }

  onNext (): Observable<any> {
    return this.greencardService.changeStatus ( this.wizardForm.getRawValue () )
      .pipe (
        map ( ( value: StatusChangeResponse ) => {
          let data                    = {
            "name": value.cardStatus.code,
            "description": value.cardStatus.description,
            "platform": 'GREENCARD',
            "type": 'PLATFORM'
          };
          let status                  = new CsCoreStatus ( data );
          this.wizard.model.newStatus = status;
          return 'confirmation-page';
        } )
      )
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      comment: new FormControl ( '', [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ),
      cardStatusCode: new FormControl ( '', ),
      serialNumber: new FormControl ( this.wizard.model.card.identifiers.serialNumber, )
    } );
  }
}
