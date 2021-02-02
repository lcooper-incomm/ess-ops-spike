import { SelectionGroupItemOrderChildrenPipe } from './selection-group-item-order-children.pipe';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";

describe ( 'SelectionGroupItemOrderChildrenPipe', () => {
  let store: Store<AppState>;

  it ( 'create an instance', () => {
    const pipe = new SelectionGroupItemOrderChildrenPipe ( store );
    expect ( pipe ).toBeTruthy ();
  } );
} );
