import { Injectable } from '@angular/core';
import { User } from '../core/user/user';
import { RoutePath } from '../core/routing/route-path.enum';
import { LoginAction } from './actions/login-action';
import { LoginErrorAction } from './actions/login-error-action';
import { AuthenticatingAction } from './actions/authenticating-action';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppState } from '../app-state';
import { Store } from '@ngrx/store';
import { UserService } from '../core/user/user.service';
import { RoutingService } from "../core/routing/routing.service";
import { LoginNeededAction } from './actions/login-needed-action';
import { FormGroup } from "@angular/forms";
import { LogoutAction } from "./actions/logout-action";
import { UrlQueryParam } from "../core/routing/url-query-param.enum";
import { WebSocketService } from "../core/web-socket/web-socket.service";
import { ClearDockStateAction } from "../core/dock/action/clear-dock-state-action";
import { ClearSupportStateAction } from "../core/support/support-actions";
import { ClearToastStateAction } from "../toast/action/clear-toast-state-action";
import { MatDialog } from "@angular/material";
import { Logger } from "../logging/logger.service";
import { ClearSearchStateAction } from "../core/search/action/clear-search-state-action";
import { LogoutType } from "./login/logout-type.enum";
import { ClearSessionStateAction } from "../core/session/action/session-actions";
import { CustomEncoder } from "../core/utils/custom-encoder";

@Injectable ( {
  providedIn: 'root'
} )
export class AuthenticationService {

  constructor ( private matDialog: MatDialog,
                private http: HttpClient,
                private logger: Logger,
                private routingService: RoutingService,
                private store: Store<AppState>,
                private userService: UserService,
                private webSocketService: WebSocketService ) {
  }

  public attemptGetUser (): void {
    this.loadUser ( true );
  }

  public handleAuthentication (): void {
    this.loadUser ( false );
  }

  public login ( loginForm: FormGroup ): void {
    this.store.dispatch ( new AuthenticatingAction () );

    let body = new HttpParams ( { encoder: new CustomEncoder () } )
      .set ( 'username', loginForm.controls.username.value )
      .set ( 'password', loginForm.controls.password.value );

    this.http.post ( '/authenticate', body.toString (), {
      headers: new HttpHeaders ().set ( 'Content-Type', 'application/x-www-form-urlencoded' )
    } )
      .subscribe ( {
        next: value => this.handleAuthentication (),
        error: err => {
          loginForm.patchValue ( { 'password': null } );
          this.handleLoadUserFailure ( err )
        }
      } );
  }

  public logout ( logoutType: LogoutType ): void {
    this.store.dispatch ( new LogoutAction () );
    this.store.dispatch ( new ClearDockStateAction () );
    this.store.dispatch ( new ClearSearchStateAction () );
    this.store.dispatch ( new ClearSessionStateAction () );
    this.store.dispatch ( new ClearSupportStateAction () );
    this.store.dispatch ( new ClearToastStateAction () );

    this.matDialog.closeAll ();

    //Navigate to login page
    let queryParams = null;
    if ( logoutType ) {
      queryParams                              = {};
      queryParams[ UrlQueryParam.LOGOUT_TYPE ] = logoutType;
    }
    this.routingService.navigateTo ( RoutePath.LOGIN, queryParams, false );

    //Disconnect web sockets
    try {
      this.webSocketService.disconnect ();
    } catch ( e ) {
      this.logger.error ( 'Failed to close Atmosphere Websocket Connection', e );
    }

    //Logout on server
    this.http.get ( '/logout' ).subscribe ();
  }

  private handleLoadUserFailure ( error: any ) {
    this.store.dispatch ( new LoginErrorAction ( error ) );
  }

  private handleLoadUserSuccess ( user: User ) {
    this.store.dispatch ( new LoginAction ( user ) );
    this.routingService.navigateToRedirect ();
  }

  private loadUser ( isInitialAttempt: boolean ): void {
    this.userService.findAuthenticatedUser ()
      .subscribe ( {
        next: value => this.handleLoadUserSuccess ( value ),
        error: error => {
          if ( isInitialAttempt ) {
            this.store.dispatch ( new LoginNeededAction () );
            this.routingService.redirectToLoginIfNecessary ();
          } else {
            this.handleLoadUserFailure ( error )
          }
        }
      } );
  }
}
