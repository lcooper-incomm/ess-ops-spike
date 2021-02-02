import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ChangeSessionTypeWizard } from "../change-session-type-wizard";
import { FormControl, FormGroup } from "@angular/forms";
import { SessionService } from "../../../../session.service";
import { Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map } from "rxjs/operators";
import { SessionClass } from "../../../../model/session-class";

@Component ( {
  selector: 'cca-change-session-type-confirm-page',
  templateUrl: './change-session-type-confirm-page.component.html',
  styleUrls: [ './change-session-type-confirm-page.component.scss' ]
} )
export class ChangeSessionTypeConfirmPageComponent extends WizardPage<ChangeSessionTypeWizard> implements OnInit {

  confirmationText: string;
  key: string                         = 'confirm-page';
  sessionClassControl: FormControl;
  sessionClassOptions: SessionClass[] = [];
  sessionTypeControl: FormControl;
  wizardForm: FormGroup               = new FormGroup ( {} );

  constructor ( private sessionService: SessionService ) {
    super ();
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Yes';
  }

  ngOnInit () {
  }

  onLoad (): Observable<any> {
    this.setConfirmationText ();
    return of ( null );
  }

  onNext (): Observable<string> {
    let subject = new Subject<string> ();

    this.sessionService.changeType ( this.wizard.model.session.id, this.wizard.model.selectedSessionType.name )
      .pipe (
        map ( () => {
          subject.next ( 'success-page' );
        } ),
        catchError ( ( error ) => {
          subject.next ( 'failure-page' );
          return of ( null );
        } ),
        finalize ( () => {
          subject.complete ();
        } )
      )
      .subscribe ();

    return subject;
  }

  private setConfirmationText (): void {
    this.confirmationText = `<span>You are about to change this Session's Type from <strong>${this.wizard.model.session.sessionType.displayName}</strong> to <strong>${this.wizard.model.selectedSessionType.displayName}</strong>.</span>`;
  }
}
