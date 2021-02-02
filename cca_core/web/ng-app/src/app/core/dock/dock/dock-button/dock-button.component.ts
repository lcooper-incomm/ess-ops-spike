import { Component, Input, OnInit } from '@angular/core';
import { DockTab } from "../../dock-tab.enum";
import { Store } from "@ngrx/store";
import { AppState } from '../../../../app-state';
import { SelectDockTabAction } from "../../action/select-dock-tab-action";
import { CcaBaseComponent } from "../../../cca-base-component";
import { AppStateType } from "../../../../app-state-type.enum";
import { CloseDockTabAction } from "../../action/close-dock-tab-action";
import { OpenDockTabAction } from "../../action/open-dock-tab-action";

@Component ( {
  selector: 'cca-dock-button',
  templateUrl: './dock-button.component.html',
  styleUrls: [ './dock-button.component.scss' ]
} )
export class DockButtonComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  badgeCount: number    = 0;
  @Input ()
  icon: string;
  isActive: boolean     = false;
  @Input ()
  isCaseButton: boolean = false;
  @Input ()
  name: string;
  @Input ()
  tab: DockTab;

  private isOpen: boolean = false;
  private selectedTab: DockTab;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToDockState ();
  }

  setSelectedTab (): void {
    if ( this.isOpen && this.isActive ) {
      this.store.dispatch ( new CloseDockTabAction () );
    } else {
      this.store.dispatch ( new OpenDockTabAction () );
    }
    this.store.dispatch ( new SelectDockTabAction ( this.tab ) );
  }

  private subscribeToDockState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_STATE ).subscribe ( {
        next: state => {
          if ( state ) {
            this.isActive    = this.tab === state.selectedTab;
            this.isOpen      = state.isOpen;
            this.selectedTab = state.selectedTab;
          }
        }
      } )
    );
  }
}
