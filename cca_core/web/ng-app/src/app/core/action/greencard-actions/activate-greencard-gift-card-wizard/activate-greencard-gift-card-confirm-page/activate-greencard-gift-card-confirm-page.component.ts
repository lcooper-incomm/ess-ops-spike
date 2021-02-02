import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../wizard/wizard-page";
import {ActivateGreencardGiftCardWizard} from "../activate-greencard-gift-card-wizard";
import {catchError, finalize, map} from "rxjs/operators";
import {Observable, of, Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {GreencardActionService} from '../../greencard-action-service/greencard-action.service';
import {ActivateGiftCardReplacementRequest} from '../../greencard-action-service/greencard-action-request-models';

@Component({
  selector: 'cca-activate-greencard-gift-card-confirm-page',
  templateUrl: './activate-greencard-gift-card-confirm-page.component.html',
  styleUrls: ['./activate-greencard-gift-card-confirm-page.component.scss']
})
export class ActivateGreencardGiftCardConfirmPageComponent extends WizardPage<ActivateGreencardGiftCardWizard> implements OnInit {

  backButtonText: string            = 'No';
  closeButtonText: string          = 'Cancel';
  isBackable: boolean               = true;
  isCloseable: boolean              = true;
  isNextable: boolean               = true;
  key: string                       = 'confirm-page';
  nextButtonText: string            = 'Yes';
  wizardForm: FormGroup             = new FormGroup( {} );

  constructor ( private greencardService: GreencardActionService ) {
    super();
  }

  ngOnInit() {
  }

  onLoad (): Observable<any> {
    return of ( null );
  }

  onNext (): Observable<any> {
    let request = this.buildActivateGreencardGiftRequest();
    let subject = new Subject<string> ();

    this.greencardService.activateGiftCardReplacement ( request )
      .pipe(
        map( () => {
          // todo make sure the card status changes, else notify Allen so he can write a ticket to add that
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

  private buildActivateGreencardGiftRequest(): ActivateGiftCardReplacementRequest {
    let request = new ActivateGiftCardReplacementRequest();
    request.birthYear = this.wizard.model.birthYear;
    request.expDate = this.wizard.model.expDate;
    let selection = this.wizard.model.selection;
    if( selection && selection.getCard() && selection.getCard().identifiers ) {
      request.serialNumber = selection.getCard().identifiers.serialNumber;
    }
    return request;
  }
}
