import { Pipe, PipeTransform } from '@angular/core';
import { SelectionGroupItem } from "./selection-group-item";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { DockSelectionsTabState } from "./dock-selections-tab-state";
import { snapshot } from "../../../store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import { SelectionType } from "../../../session/model/selection-type.enum";
import { SelectionGroupItemCustomerChildrenPipe } from "./selection-group-item-customer-children.pipe";
import { SelectionGroupItemOrderChildrenPipe } from "./selection-group-item-order-children.pipe";

@Pipe ( {
  name: 'selectionGroupItem'
} )
export class SelectionGroupItemPipe implements PipeTransform {

  constructor ( private customerChildrenPipe: SelectionGroupItemCustomerChildrenPipe,
                private orderChildrenPipe: SelectionGroupItemOrderChildrenPipe,
                private store: Store<AppState> ) {
  }

  transform ( items: SelectionGroupItem[] ): SelectionGroupItem[] {
    let tabState: DockSelectionsTabState = snapshot ( this.store, AppStateType.DOCK_SELECTIONS_TAB_STATE );
    let filter                           = tabState.filter;

    if ( filter ) {
      filter = filter.toLowerCase ();

      let filteredItems: SelectionGroupItem[] = items.filter ( ( item: SelectionGroupItem ) => {
        let filteredChildrenCount = 0;

        if ( item.selection.type === SelectionType.CUSTOMER && item.selection.data ) {
          filteredChildrenCount = this.customerChildrenPipe.transform ( item.selection.getCustomer ().cards ).length;
        } else if ( item.selection.type === SelectionType.ORDER && item.selection.data ) {
          filteredChildrenCount = this.orderChildrenPipe.transform ( item.selection.getAllCardsInOrder () ).length;
        }

        //TODO detect whether status matches, in switch on selection type and platform... yuck...

        return filteredChildrenCount
          || (item.selection.description && item.selection.description.toLowerCase ().indexOf ( filter ) !== -1);
      } );

      return filteredItems;
    } else {
      return items;
    }
  }

}
