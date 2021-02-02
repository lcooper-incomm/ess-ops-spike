import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ChangeGreencardStatusWizard } from "../change-greencard-status-wizard";
import { Observable, of } from "rxjs";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Selection } from "../../../../core/session/model/selection";
import { PlatformType } from "../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-change-greencard-status',
  templateUrl: './change-greencard-status.component.html',
  styleUrls: [ './change-greencard-status.component.scss' ]
} )
export class ChangeGreencardStatusComponent extends WizardPage<ChangeGreencardStatusWizard> implements OnInit {
  key: string           = 'form-page';
  selection: Selection<any>;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private store: Store<AppState> ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
  }

  ngOnInit () {
    this.subscribeToSessionState ();
    this.addDisplayNames ();
    this.wizard.model.currentStatus = this.wizard.model.card.getStatusByPlatform ( PlatformType.GREENCARD );
  }

  onNext (): Observable<string> {
    this.wizard.model.comment        = this.wizardForm.get ( 'comment' ).value;
    this.wizard.model.cardStatusCode = this.wizardForm.get ( 'cardStatusCode' ).value;
    return of ( 'review-page' );
  }

  private addDisplayNames () {
    this.initForms ();
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      comment: new FormControl ( '', [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ),
      cardStatusCode: new FormControl ( '', ),
      serialNumber: new FormControl ( this.wizard.model.card.identifiers.serialNumber, )
    } );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            if ( this.selection && this.selection.getCustomer () ) {
              this.wizard.model.customerId = this.selection.getCustomer ().id;
            }
          }
        } )
    );
  }
}
