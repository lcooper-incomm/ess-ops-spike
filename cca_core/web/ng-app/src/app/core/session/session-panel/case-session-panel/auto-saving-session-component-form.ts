import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { AutoSavingForm } from 'src/app/core/form/auto-saving-form';
import { AppStateType } from '../../../../app-state-type.enum';
import { Session } from '../../model/session';

export abstract class AutoSavingSessionComponentForm extends AutoSavingForm implements OnInit {
  public session: Session;

  constructor ( protected store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  protected subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( sessionState => {
          if ( sessionState ) {
            this.session = sessionState.session;
          }
        } )
    );
  }
}
