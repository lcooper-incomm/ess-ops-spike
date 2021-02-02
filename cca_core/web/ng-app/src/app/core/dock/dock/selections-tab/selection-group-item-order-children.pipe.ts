import { Pipe, PipeTransform } from '@angular/core';
import { MaplesOrderItemCard } from "@cscore/maples-client-model";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { DockSelectionsTabState } from "./dock-selections-tab-state";
import { snapshot } from "../../../store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";

@Pipe ( {
  name: 'selectionGroupItemOrderChildren'
} )
export class SelectionGroupItemOrderChildrenPipe implements PipeTransform {

  constructor ( private store: Store<AppState> ) {
  }

  transform ( cards: MaplesOrderItemCard[] ): MaplesOrderItemCard[] {
    const tabState: DockSelectionsTabState = snapshot ( this.store, AppStateType.DOCK_SELECTIONS_TAB_STATE );
    let filter                           = tabState.filter;

    if ( filter ) {
      filter = filter.toLowerCase ();

      const filteredCards: MaplesOrderItemCard[] = cards.filter ( ( card: MaplesOrderItemCard ) => {
        const cardLastFour = card.serialNumber ? card.serialNumber.slice ( -4 ) : null;
        const cardStatus   = card.status;

        return (cardLastFour && cardLastFour.indexOf ( filter ) !== -1)
          || (cardStatus && cardStatus.toLowerCase ().indexOf ( filter ) !== -1);
      } );

      return filteredCards;
    } else {
      return cards;
    }
  }

}
