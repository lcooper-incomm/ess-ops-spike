import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { CcaBaseComponent } from "../../core/cca-base-component";
import { Toast } from "../toast";
import { AppStateType } from "../../app-state-type.enum";
import { ClearToastAction } from "../action/clear-toast-action";

@Component ( {
  selector: 'cca-toast-manager',
  templateUrl: './toast-manager.component.html',
  styleUrls: [ './toast-manager.component.scss' ]
} )
export class ToastManagerComponent extends CcaBaseComponent implements OnInit {

  showCorrelationId: boolean = false;
  toasts: Toast[]            = [];

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToAuthenticationState ();
    this.subscribeToToastState ();
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription ( this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( {
      next: authenticationState => {
        if ( authenticationState ) {
          this.showCorrelationId = authenticationState.user ? authenticationState.user.isSystemAdministrator : false;
        }
      }
    } ) );
  }

  private subscribeToToastState (): void {
    this.addSubscription ( this.store.select ( AppStateType.TOAST_STATE ).subscribe ( {
      next: toastState => {
        if ( toastState ) {
          this.toasts.length = 0;
          this.toasts.push.apply ( this.toasts, toastState.toasts );

          for ( let toast of this.toasts ) {
            // If a timer has not yet been created and there is a duration, start a timer and subscribe to it.
            if ( !toast.timer && toast.duration ) {
              this.addSubscription ( toast.createTimer ().subscribe( () => {
                // When the toast's timer is up, clear it from the state.
                this.store.dispatch ( new ClearToastAction( toast ) );
              } ) );
            }
          }
        }
      }
    } ) );
  }

}
