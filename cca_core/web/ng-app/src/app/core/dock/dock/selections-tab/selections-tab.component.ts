import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { CcaBaseComponent } from "../../../cca-base-component";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../session/session-state";
import { FormControl, FormGroup } from "@angular/forms";
import { DockSelectionsTabState } from "./dock-selections-tab-state";
import { SelectionGroup } from "./selection-group";
import {
  SetDockSelectionsTabFilterAction,
  SetDockSelectionsTabIsBulkModeEnabledAction
} from "./dock-selections-tab-actions";
import { SelectionGroupItem } from "./selection-group-item";
import { debounceTime } from "rxjs/operators";
import { SelectionGroupPipe } from "./selection-group.pipe";

@Component ( {
  selector: 'cca-selections-tab',
  templateUrl: './selections-tab.component.html',
  styleUrls: [ './selections-tab.component.scss' ]
} )
export class SelectionsTabComponent extends CcaBaseComponent implements OnInit {

  filterForm: FormGroup;

  dockSelectionsTabState$: Store<DockSelectionsTabState>;
  groups: SelectionGroup[] = [];
  selectedCount: number    = 0;
  sessionState$: Store<SessionState>;

  constructor ( private selectionGroupPipe: SelectionGroupPipe,
                private store: Store<AppState> ) {
    super ();
    this.filterForm = new FormGroup ( {
      filter: new FormControl ( null, [] )
    } );
  }

  ngOnInit () {
    this.dockSelectionsTabState$ = <Store<DockSelectionsTabState>> this.store.select ( AppStateType.DOCK_SELECTIONS_TAB_STATE );
    this.sessionState$           = <Store<SessionState>> this.store.select ( AppStateType.SESSION_STATE );
    this.subscribeToFilterChanges ();
    this.subscribeToTabState ();
  }

  toggleBulkMode ( isEnabled: boolean ): void {
    this.store.dispatch ( new SetDockSelectionsTabIsBulkModeEnabledAction ( isEnabled ) );
  }

  private getSelectedItems (): SelectionGroupItem[] {
    let items: SelectionGroupItem[] = [];

    this.groups.forEach ( ( group: SelectionGroup ) => {
      items.push.apply ( items, group.getSelectedItems () );
    } );

    return items;
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterForm.valueChanges
        .pipe ( debounceTime ( 500 ) )
        .subscribe ( ( value: any ) => {
          this.store.dispatch ( new SetDockSelectionsTabFilterAction ( value.filter ) );
        } )
    );
  }

  private subscribeToTabState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_SELECTIONS_TAB_STATE )
        .subscribe ( ( state: DockSelectionsTabState ) => {
          if ( state ) {
            this.groups        = [ ...state.groups ];
            this.selectedCount = this.getSelectedItems ().length;
          }
        } )
    );
  }
}


