import { Pipe, PipeTransform } from '@angular/core';
import { Card } from "../../../card/card";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { DockSelectionsTabState } from "./dock-selections-tab-state";
import { snapshot } from "../../../store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";

@Pipe ( {
  name: 'selectionGroupItemCustomerChildren'
} )
export class SelectionGroupItemCustomerChildrenPipe implements PipeTransform {

  constructor ( private store: Store<AppState> ) {
  }

  transform ( cards: Card[] ): Card[] {
    const tabState: DockSelectionsTabState = snapshot ( this.store, AppStateType.DOCK_SELECTIONS_TAB_STATE );
    let filter                           = tabState.filter;

    if ( filter ) {
      filter = filter.toLowerCase ();

      const filteredCards = cards.filter ( card => {
        const cardLastFour = card.identifiers.pan ? card.identifiers.pan.slice ( -4 ) : null;
        const cardStatus   = card.getStatusByPlatform ( card.platform );

        return (cardLastFour && cardLastFour.indexOf ( filter ) !== -1)
          || (cardStatus && cardStatus.name && cardStatus.name.toLowerCase ().indexOf ( filter ) !== -1);
      } );

      return filteredCards;
    } else {
      return cards;
    }
  }

}
