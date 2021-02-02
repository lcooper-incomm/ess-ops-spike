import { SelectionGroupPipe } from './selection-group.pipe';
import { SelectionGroupItemPipe } from "./selection-group-item.pipe";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";

describe ( 'SelectionGroupPipe', () => {
  let itemPipe: SelectionGroupItemPipe;
  let store: Store<AppState>;

  it ( 'create an instance', () => {
    const pipe = new SelectionGroupPipe ( itemPipe, store );
    expect ( pipe ).toBeTruthy ();
  } );
} );
