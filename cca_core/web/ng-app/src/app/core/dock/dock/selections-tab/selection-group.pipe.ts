import { Pipe, PipeTransform } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { SelectionGroup } from "./selection-group";
import { DockSelectionsTabState } from "./dock-selections-tab-state";
import { snapshot } from "../../../store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import { SelectionGroupItemPipe } from "./selection-group-item.pipe";

@Pipe ( {
  name: 'selectionGroup'
} )
export class SelectionGroupPipe implements PipeTransform {

  constructor ( private itemPipe: SelectionGroupItemPipe,
                private store: Store<AppState> ) {
  }

  transform ( groups: SelectionGroup[] ): any {
    let tabState: DockSelectionsTabState = snapshot ( this.store, AppStateType.DOCK_SELECTIONS_TAB_STATE );
    let filter                           = tabState.filter;

    if ( filter ) {
      filter = filter.toLowerCase ();

      let filteredGroups: SelectionGroup[] = [];

      groups.forEach ( ( group: SelectionGroup ) => {
        if ( this.itemPipe.transform ( group.selections ).length ) {
          filteredGroups.push ( group );
        }
      } );

      return filteredGroups;
    } else {
      return groups;
    }
  }

}
