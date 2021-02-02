import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { User } from "../user/user";
import { AuthenticationState } from "../../auth/authentication-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

@Injectable ( {
  providedIn: 'root'
} )
export class SecurityService {

  constructor ( private store: Store<AppState> ) {
  }

  hasAnyPermission ( systemNames: string[], user?: User ): boolean {
    if ( !user ) {
      user = this.getCurrentUser ();
    }
    return systemNames.some ( systemName => this.hasPermission ( systemName, user ) );
  }

  hasPermission ( systemName: string, user?: User ): boolean {
    let hasPermission: boolean = false;

    if ( !user ) {
      user = this.getCurrentUser ();
    }

    if ( user ) {
      hasPermission = !!user.permissions.find ( permission => permission.systemName === systemName && permission.isActive );
    }

    return hasPermission;
  }

  isCurrentUser ( user: User ): boolean {
    let currentUser = this.getCurrentUser ();
    return currentUser && user && user.id === currentUser.id;
  }

  getCurrentUser (): User {
    let authenticationState: AuthenticationState = snapshot ( this.store, AppStateType.AUTHENTICATION_STATE );
    return authenticationState ? authenticationState.user : null;
  }

  getCurrentUserAsync (): Observable<User> {
    return this.store.select<AuthenticationState> ( AppStateType.AUTHENTICATION_STATE )
      .pipe (
        map ( authState => authState.user ),
        filter ( user => !!user ),
        take ( 1 ),
      );
  }
}
