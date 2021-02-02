import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../wizard/wizard-page";
import { ActivateGreencardB2bCardWizard } from "../activate-greencard-b2b-card-wizard";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { GreencardActionService } from '../../greencard-action-service/greencard-action.service';
import { ActivateB2bCardRequest } from '../../greencard-action-service/greencard-action-request-models';

@Component({
  selector: 'cca-activate-greencard-b2b-card-confirm-page',
  templateUrl: './activate-greencard-b2b-card-confirm-page.component.html',
  styleUrls: ['./activate-greencard-b2b-card-confirm-page.component.scss']
})
export class ActivateGreencardB2bCardConfirmPageComponent extends WizardPage< ActivateGreencardB2bCardWizard > implements OnInit {

  backButtonText: string            = 'No';
  closeButtonText: string          = 'Cancel';
  isBackable: boolean               = true;
  isCloseable: boolean              = true;
  isNextable: boolean               = true;
  key: string                       = 'confirm-page';
  nextButtonText: string            = 'Yes';
  wizardForm: FormGroup             = new FormGroup( {} );

  constructor ( private greencardService: GreencardActionService ) {
    super ();
  }

  ngOnInit() {
  }

  onLoad (): Observable<any> {
    this.initForm();
    return of( null );
  }

  onNext (): Observable<any> {
    let request = this.buildActivateGreencardB2bRequest();
    let subject = new Subject<string> ();

    this.greencardService.activateB2BCard ( request )
      .pipe(
        map( () => {
          subject.next( 'success-page' );
        }),
        catchError( ( error ) => {
          this.wizard.pages.get( 'fail-page' ).instance.isIgnored = false;
          this.wizard.pages.get( 'success-page' ).instance.isIgnored = true;
          subject.next( 'fail-page' );
          return of ( null );
        } ),
        finalize ( () => {
          subject.complete();
        })
      )
      .subscribe();

    return subject;
  }

  private buildActivateGreencardB2bRequest(): ActivateB2bCardRequest {
    let request = new ActivateB2bCardRequest();
    request.pin = this.wizard.model.pin;
    let selection = this.wizard.model.selection;
    if( selection && selection.getCard() && selection.getCard().identifiers ) {
      request.serialNumber = selection.getCard().identifiers.serialNumber;
    }
    return request;
  }

  private initForm (): void {
    this.wizardForm = new FormGroup( {
      pin: new FormControl( this.wizard.model.pin )
    } );
    this.wizardForm.disable();
  }

}
