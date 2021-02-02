import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "./auth/authentication.service";
import { AppState } from "./app-state";
import { Store } from '@ngrx/store';
import { AuthenticationStatus } from "./auth/authentication-status.enum";
import { SupportService } from "./core/support/support.service";
import { CcaBaseComponent } from "./core/cca-base-component";
import { AppStateType } from "./app-state-type.enum";
import { WebSocketService } from "./core/web-socket/web-socket.service";
import { RoutingService } from "./core/routing/routing.service";
import { RoutePath } from "./core/routing/route-path.enum";
import { AuthenticationState } from './auth/authentication-state';
import { DockState } from "./core/dock/dock-state";
import { SessionService } from "./core/session/session.service";
import { SessionState } from "./core/session/session-state";
import { NavigationEnd, Router } from "@angular/router";
import { SupportState } from "./core/support/support-state";
import { snapshot } from "./core/store-utils/store-utils";

@Component ( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent extends CcaBaseComponent implements OnInit {

  isAuthenticated: boolean = false;
  isDockPinned: boolean    = false;
  isOnDetailsPage: boolean = false;
  isOnLoginPage: boolean   = false;

  sessionState$: Store<SessionState>;

  constructor ( private authenticationService: AuthenticationService,
                private router: Router,
                private routingService: RoutingService,
                private sessionService: SessionService,
                private store: Store<AppState>,
                private supportService: SupportService,
                private websocketService: WebSocketService ) {
    super ();
  }

  ngOnInit (): void {
    this.isOnLoginPage = this.routingService.isOn ( RoutePath.LOGIN );
    this.subscribeToAuthenticationState ();
    this.subscribeToDockState ();
    this.subscribeToRouteChanges ();
    this.sessionState$ = <Store<SessionState>>this.store.select ( AppStateType.SESSION_STATE );
    this.authenticationService.attemptGetUser ();
  }

  private onAuthenticationUpdate ( authenticationState: AuthenticationState ): void {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );

    if ( authenticationState ) {
      this.isAuthenticated = authenticationState.status === AuthenticationStatus.AUTHENTICATED
        && !!authenticationState.user;
      if ( this.isAuthenticated && !supportState.isInitComplete ) {
        this.supportService.runStartupSequence ();
        this.websocketService.connect ( authenticationState.user.username );
        this.websocketService.connect ( 'codex' );
        this.websocketService.connect ( 'dictionary' );
      }
    }
  }

  private onDockUpdate ( dockState: DockState ): void {
    if ( dockState ) {
      this.isDockPinned = dockState.isOpen && dockState.isPinned;
    }
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( ({
        next: state => this.onAuthenticationUpdate ( state )
      }) )
    );
  }

  private subscribeToDockState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_STATE ).subscribe ( {
        next: state => this.onDockUpdate ( state )
      } )
    );
  }

  private subscribeToRouteChanges (): void {
    this.addSubscription (
      this.router.events.subscribe ( ( event ) => {
        if ( event instanceof NavigationEnd ) {
          let url              = event.urlAfterRedirects.replace ( '/', '' );
          this.isOnLoginPage   = url.indexOf ( RoutePath.LOGIN ) === 0;
          this.isOnDetailsPage = url.indexOf ( RoutePath.DETAIL ) === 0;
          this.routingService.setRedirect ();
        }
      } )
    );
  }

}
