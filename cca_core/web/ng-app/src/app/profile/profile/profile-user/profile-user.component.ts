import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { Component, OnInit } from '@angular/core';
import { AppStateType } from "../../../app-state-type.enum";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { User } from "../../../core/user/user";

@Component ( {
  selector: 'cca-user-profile',
  templateUrl: './profile-user.component.html',
  styleUrls: [ './profile-user.component.scss' ]
} )
export class ProfileUserComponent extends CcaBaseComponent implements OnInit {

  currentUser: User;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToAuthenticationState ()
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( {
        next: authenticationState => {
          if ( authenticationState ) {
            this.currentUser = authenticationState.user;
          }
        }
      } )
    );
  }
}
