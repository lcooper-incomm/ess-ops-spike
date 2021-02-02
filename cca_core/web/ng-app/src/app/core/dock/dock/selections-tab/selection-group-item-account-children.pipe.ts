import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { MaplesCard } from '@cscore/maples-client-model';
import { AppState } from '../../../../app-state';
import { AppStateType } from '../../../../app-state-type.enum';
import { snapshot } from '../../../store-utils/store-utils';
import { DockSelectionsTabState } from './dock-selections-tab-state';

@Pipe ( {
  name: 'selectionGroupItemAccountChildren'
} )
export class SelectionGroupItemAccountChildrenPipe implements PipeTransform {

  constructor ( private store: Store<AppState> ) {
  }

  transform ( cards: MaplesCard[] ): MaplesCard[] {
    const tabState: DockSelectionsTabState = snapshot ( this.store, AppStateType.DOCK_SELECTIONS_TAB_STATE );
    let filter                             = tabState.filter;

    if ( filter ) {
      filter = filter.toLowerCase ();

      const filteredCards = cards.filter ( card => {
        const cardLastFour = card.identifiers.pan ? card.identifiers.pan.slice ( -4 ) : null;
        const cardStatus   = card.getPlatformStatus ();

        return (cardLastFour && cardLastFour.indexOf ( filter ) !== -1)
          || (cardStatus && cardStatus.name && cardStatus.name.toLowerCase ().indexOf ( filter ) !== -1);
      } );

      return filteredCards;
    } else {
      return cards;
    }
  }
}
