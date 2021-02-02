import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";

export class SetSearchResultsAction implements PayloadAction {

  payload: any[];
  type = SearchActionType.SET_SEARCH_RESULTS;

  constructor ( payload: any[] ) {
    this.payload = payload;
  }
}
