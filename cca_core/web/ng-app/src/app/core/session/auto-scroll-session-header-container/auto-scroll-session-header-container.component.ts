import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { DockState } from "../../dock/dock-state";
import { CollapseSessionPanelAction, OpenSessionPanelAction } from "../action/session-actions";
import { SessionState } from "../session-state";
import { interval } from "rxjs";
import * as $ from "jquery";

@Component ( {
  selector: 'cca-auto-scroll-session-header-container',
  templateUrl: './auto-scroll-session-header-container.component.html',
  styleUrls: [ './auto-scroll-session-header-container.component.scss' ]
} )
export class AutoScrollSessionHeaderContainerComponent extends CcaBaseComponent implements OnInit {

  isDockOpen: boolean                       = false;
  isDockPinned: boolean                     = false;
  isSessionActive: boolean                  = false;
  isSessionCollapsed: boolean               = false;
  isSessionHeaderScrolledOutOfView: boolean = false;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToDockState ();
    this.subscribeToSessionState ();
    this.startScrollWatcher ();
  }

  toggleIsCollapsed (): void {
    if ( this.isSessionCollapsed ) {
      this.store.dispatch ( new OpenSessionPanelAction () );
    } else {
      this.store.dispatch ( new CollapseSessionPanelAction () );
    }
  }

  private startScrollWatcher (): void {
    this.addSubscription (
      interval ( 50 )
        .subscribe ( () => {
          let scrollY                       = 0;
          let routerOutletContainer: JQuery = $ ( '.router-outlet-container' );
          if ( routerOutletContainer ) {
            scrollY = routerOutletContainer.scrollTop ();
          }
          this.isSessionHeaderScrolledOutOfView = this.isSessionActive && (this.isSessionCollapsed || scrollY > 15);
        } )
    );
  }

  private subscribeToDockState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_STATE )
        .subscribe ( ( state: DockState ) => {
          if ( state ) {
            this.isDockOpen   = state.isOpen;
            this.isDockPinned = state.isPinned && state.isOpen;
          }
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.isSessionActive    = !!state.session;
            this.isSessionCollapsed = state.isCollapsed;
          }
        } )
    );
  }

}
