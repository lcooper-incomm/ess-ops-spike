import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { CcaBaseComponent } from "../../cca-base-component";
import { AppStateType } from "../../../app-state-type.enum";
import { DockTab } from "../dock-tab.enum";
import { CloseDockTabAction } from "../action/close-dock-tab-action";
import { OpenDockTabAction } from "../action/open-dock-tab-action";
import { UnpinDockTabAction } from "../action/unpin-dock-tab-action";
import { PinDockTabAction } from "../action/pin-dock-tab-action";
import { DockState } from "../dock-state";
import { SessionState } from "../../session/session-state";
import { NavigationEnd, Router } from "@angular/router";
import { RoutingService } from "../../routing/routing.service";
import { RoutePath } from "../../routing/route-path.enum";

@Component ( {
  selector: 'cca-dock',
  templateUrl: './dock.component.html',
  styleUrls: [ './dock.component.scss' ]
} )
export class DockComponent extends CcaBaseComponent implements OnInit {

  DockTab                     = DockTab;
  isOnDetailsPage: boolean    = false;
  isOpen: boolean             = false;
  isPinned: boolean           = false;
  selectedTab: DockTab        = DockTab.WORKSPACE;
  showQueueHelpTabs: boolean  = false;
  showSessionTabs: boolean    = false;
  workspaceTotalCount: number = 0;

  constructor ( private router: Router,
                private routingService: RoutingService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToDockState ();
    this.subscribeToNavigationEvents ();
    this.subscribeToSessionState ();
  }

  toggle (): void {
    if ( this.isOpen ) {
      this.store.dispatch ( new CloseDockTabAction ( true ) );
    } else {
      this.store.dispatch ( new OpenDockTabAction () );
    }
  }

  togglePinned (): void {
    if ( this.isPinned ) {
      this.store.dispatch ( new CloseDockTabAction () );
      this.store.dispatch ( new UnpinDockTabAction () );
    } else {
      this.store.dispatch ( new OpenDockTabAction () );
      this.store.dispatch ( new PinDockTabAction () );
    }
  }

  private subscribeToDockState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_STATE )
        .subscribe ( ( state: DockState ) => {
          if ( state ) {
            this.isOpen      = state.isOpen;
            this.isPinned    = state.isPinned;
            this.selectedTab = state.selectedTab;
          }
        } )
    );
  }

  private subscribeToNavigationEvents (): void {
    this.isOnDetailsPage = this.routingService.isOn ( RoutePath.DETAIL );
    this.addSubscription (
      this.router.events.subscribe ( ( event ) => {
        if ( event instanceof NavigationEnd ) {
          this.isOnDetailsPage = this.routingService.isOn ( RoutePath.DETAIL );
        }
      } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.showSessionTabs = !!state.session;

            this.showQueueHelpTabs = state
              && state.session
              && state.session.queue
              && (state.session.queue.locale === 'JAX'
                || state.session.queue.locale === 'NOR'
                || state.session.queue.locale === 'RBC');

            if ( state.workspaceSessions ) {
              this.workspaceTotalCount = state.workspaceSessions.totalElements;
            }
          }
        } )
    );
  }

}
