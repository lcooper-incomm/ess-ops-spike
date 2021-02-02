import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { Router } from "@angular/router";
import { CloseDockTabAction } from '../core/dock/action/close-dock-tab-action';
import { CollapseSessionPanelAction } from '../core/session/action/session-actions';
import { RoutePath } from '../core/routing/route-path.enum';

@Component ( {
  selector: 'cca-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: [ './control-panel.component.scss' ]
} )

export class ControlPanelComponent extends CcaBaseComponent implements OnInit {
  constructor (
    private router: Router,
    private store: Store<AppState>,
  ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToRouteChange ();
  }

  get isControlPanelBaseRoute (): boolean {
    return this.router.url.replace ( '/', '' ) === RoutePath.CONTROL_PANEL;
  }

  private subscribeToRouteChange () {
    this.addSubscription (
      this.router.events.subscribe ( () => {
        this.store.dispatch ( new CloseDockTabAction () );
        this.store.dispatch ( new CollapseSessionPanelAction () );
      } )
    );
  }
}
