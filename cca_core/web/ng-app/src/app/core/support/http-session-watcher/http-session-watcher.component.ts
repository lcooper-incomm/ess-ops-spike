import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { CcaBaseComponent } from "../../cca-base-component";
import { interval } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material";
import { SessionTimeoutDialogComponent } from "./session-timeout-dialog/session-timeout-dialog.component";
import { UserService } from "../../user/user.service";
import { AuthenticationService } from "../../../auth/authentication.service";
import { AppStateType } from "../../../app-state-type.enum";
import { LogoutType } from "../../../auth/login/logout-type.enum";

@Component ( {
  selector: 'cca-http-session-watcher',
  template: ''
} )
export class HttpSessionWatcherComponent extends CcaBaseComponent implements OnInit {

  dialogRef: MatDialogRef<SessionTimeoutDialogComponent>;
  sessionTimeoutDate: Date;

  constructor ( private authenticationService: AuthenticationService,
                private dialog: MatDialog,
                private store: Store<AppState>,
                private userService: UserService ) {
    super ();
  }

  ngOnInit () {
    this.startExpirationInterval ();
    this.subscribeToSupportState ();
  }

  private startExpirationInterval (): void {
    this.addSubscription ( interval ( 1000 ).subscribe ( value => {
      if ( !this.dialogRef
        && this.sessionTimeoutDate
        && this.sessionTimeoutDate < new Date () ) {
        this.dialogRef = this.dialog.open ( SessionTimeoutDialogComponent );
        this.dialogRef.afterClosed ().subscribe ( result => {
          if ( result ) {
            this.userService.findAuthenticatedUser ().subscribe ();
          } else {
            this.authenticationService.logout ( LogoutType.INACTIVITY );
          }
          this.sessionTimeoutDate = null;
          this.dialogRef          = null;
        } );
      }
    } ) );
  }

  private subscribeToSupportState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SUPPORT_STATE ).subscribe ( {
        next: supportState => {
          if ( supportState ) {
            this.sessionTimeoutDate = supportState.sessionTimeout;
          }
        }
      } )
    );
  }
}
