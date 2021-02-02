import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";

export class SearchingAction implements PayloadAction {

  payload: boolean;
  type = SearchActionType.SEARCHING;

  constructor ( payload: boolean ) {
    this.payload = payload;
  }
}
