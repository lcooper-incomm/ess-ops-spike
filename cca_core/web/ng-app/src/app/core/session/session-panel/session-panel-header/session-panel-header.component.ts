import { Component, OnInit } from '@angular/core';
import { Session } from "../../model/session";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { SessionState } from "../../session-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { CcaBaseComponent } from "../../../cca-base-component";
import { interval, Subscription } from "rxjs";
import { SessionService } from "../../session.service";

@Component ( {
  selector: 'cca-session-panel-header',
  templateUrl: './session-panel-header.component.html',
  styleUrls: [ './session-panel-header.component.scss' ]
} )
export class SessionPanelHeaderComponent extends CcaBaseComponent implements OnInit {

  autoWrapPercentRemaining: number = 100;
  autoWrapTimerSubscription: Subscription;
  isAutoWrapping: boolean          = false;
  isInAutoWrapPeriod: boolean      = false;
  progressBarMode: string          = 'determinate';

  session: Session;

  constructor ( private sessionService: SessionService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionStateForAutoWrapWatcher ();
  }

  private startAutoWrapWatcher (): void {
    this.autoWrapTimerSubscription = interval ( 50 )
      .subscribe ( () => this.updateAutoWrapPercent () );

    this.addSubscription (
      this.autoWrapTimerSubscription
    );
  }

  private subscribeToSessionStateForAutoWrapWatcher (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.session = state.session;

            if ( this.session && this.session.callComponent && this.session.callComponent.disconnectedDate ) {
              if ( this.autoWrapTimerSubscription ) {
                this.autoWrapTimerSubscription.unsubscribe ();
              }

              this.startAutoWrapWatcher ();
            }
          }
        } )
    );
  }

  private updateAutoWrapPercent (): void {
    this.isInAutoWrapPeriod = this.session
      && !!this.session.callComponent
      && !!this.session.callComponent.disconnectedDate
      && ( new Date ().getTime () - new Date ( this.session.callComponent.disconnectedDate.value ).getTime () ) < this.session.queue.autoWrapTime;

    if ( this.isInAutoWrapPeriod && this.autoWrapPercentRemaining > 0 ) {
      let totalAutoWrapTime          = this.session.queue.autoWrapTime;
      let elapsedTimeSinceDisconnect = new Date ().getTime () - new Date ( this.session.callComponent.disconnectedDate.value ).getTime ();
      this.autoWrapPercentRemaining  = 100 - Math.abs ( elapsedTimeSinceDisconnect / totalAutoWrapTime * 100 );
    } else {
      this.isInAutoWrapPeriod = false;
      this.autoWrapPercentRemaining = 100;
      this.progressBarMode          = 'determinate';
      this.autoWrapTimerSubscription.unsubscribe ();
    }
  }

}
