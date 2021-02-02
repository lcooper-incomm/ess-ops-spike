import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { AppStateType } from '../../../../../app-state-type.enum';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';
import { AppState } from 'src/app/app-state';
import { Store } from '@ngrx/store';
import { Session } from '../../../model/session';

@Component ( {
  selector: 'cca-cards-session-component-form',
  templateUrl: './cards-session-component-form.component.html',
  styleUrls: [ './cards-session-component-form.component.scss' ]
} )
export class CardsSessionComponentFormComponent extends CcaBaseComponent implements OnInit {
  @Input ()
  form: FormGroup;

  session: Session;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store
        .select ( AppStateType.SESSION_STATE )
        .subscribe ( sessionState => this.session = sessionState.session )
    );
  }
}
