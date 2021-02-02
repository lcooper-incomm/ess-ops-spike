import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { CcaBaseComponent } from "../../../../cca-base-component";
import { AppStateType } from "../../../../../app-state-type.enum";
import { SelectionGroup } from '../selection-group';
import { DockSelectionsTabState } from "../dock-selections-tab-state";
import {
  SetDockSelectionsTabGroupIsCollapsedAction,
  SetDockSelectionsTabGroupIsSelectedAction
} from "../dock-selections-tab-actions";
import { SelectionType } from "../../../../session/model/selection-type.enum";
import * as _ from "lodash";
import { SelectionGroupItem } from "../selection-group-item";

@Component ( {
  selector: 'cca-selections-group',
  templateUrl: './selections-group.component.html',
  styleUrls: [ './selections-group.component.scss' ]
} )
export class SelectionsGroupComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  type: SelectionType;

  group: SelectionGroup;
  selections: SelectionGroupItem[] = [];

  state$: Store<DockSelectionsTabState>;

  constructor ( private changeDetectorRef: ChangeDetectorRef,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.state$ = <Store<DockSelectionsTabState>> this.store.select ( AppStateType.DOCK_SELECTIONS_TAB_STATE );
    this.subscribeToTabState ();
  }

  isGroupSelected (): boolean {
    return this.group.getSelectedItems ().length === this.group.selections.length;
  }

  toggleIsCollapsed (): void {
    this.group.isCollapsed = !this.group.isCollapsed;
    this.store.dispatch ( new SetDockSelectionsTabGroupIsCollapsedAction ( this.group ) );
  }

  toggleIsSelected (): void {
    this.group.isSelected = !this.isGroupSelected ();
    this.store.dispatch ( new SetDockSelectionsTabGroupIsSelectedAction ( this.group ) );
  }

  private subscribeToTabState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_SELECTIONS_TAB_STATE )
        .subscribe ( ( state: DockSelectionsTabState ) => {
          if ( state ) {
            let component   = this;
            this.group      = _.find ( state.groups, function ( group: SelectionGroup ) {
              return group.type === component.type;
            } );
            if ( this.group ) {
              this.selections = [ ...this.group.selections ];
            }
          }
        } )
    );
  }

}
