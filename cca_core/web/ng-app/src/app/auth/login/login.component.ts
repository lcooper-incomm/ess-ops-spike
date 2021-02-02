import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationState } from "../authentication-state";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { AuthenticationService } from "../authentication.service";
import { RoutingService } from "../../core/routing/routing.service";
import { AuthenticationStatus } from '../authentication-status.enum';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SpinnerComponent } from "../../core/spinner/spinner.component";
import { UrlQueryParam } from "../../core/routing/url-query-param.enum";
import { AppStateType } from "../../app-state-type.enum";
import { CcaBaseComponent } from "../../core/cca-base-component";
import { LogoutType } from "./logout-type.enum";

@Component ( {
  selector: 'cca-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent extends CcaBaseComponent implements OnInit {

  loginForm: FormGroup;
  logoutType: LogoutType;
  LogoutType              = LogoutType;
  passwordField: FormControl;
  showErrorPanel: boolean = false;
  usernameField: FormControl;

  @ViewChild ( SpinnerComponent )
  spinner: SpinnerComponent;

  state: AuthenticationState;

  constructor ( private store: Store<AppState>,
                private authenticationService: AuthenticationService,
                private routingService: RoutingService ) {
    super ();
  }

  ngOnInit () {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( { next: value => this.handleStateChange ( value ) } )
    );
    this.initForm ();
    this.checkLogoutType ();
  }

  handleStateChange ( state: AuthenticationState ): void {
    this.state = state;
    if ( this.state ) {
      this.showErrorPanel = this.state.status === AuthenticationStatus.AUTHENTICATION_FAILED;

      if ( this.state.status === AuthenticationStatus.AUTHENTICATED || this.state.status === AuthenticationStatus.AUTHENTICATION_FAILED ) {
        this.spinner.on = false;
      }
    }
  }

  initForm (): void {
    this.usernameField = new FormControl ( '', [ Validators.required ] );
    this.passwordField = new FormControl ( '', [ Validators.required ] );
    this.loginForm     = new FormGroup ( {
      username: this.usernameField,
      password: this.passwordField
    } );
  }

  login (): void {
    this.spinner.on = true;
    this.logoutType = null;
    this.authenticationService.login ( this.loginForm );
  }

  private checkLogoutType (): void {
    let logoutTypeString = this.routingService.getQueryParam ( UrlQueryParam.LOGOUT_TYPE );
    this.logoutType      = logoutTypeString ? LogoutType[ logoutTypeString ] : null;
    this.routingService.setQueryParam ( UrlQueryParam.LOGOUT_TYPE, null );
  }
}
