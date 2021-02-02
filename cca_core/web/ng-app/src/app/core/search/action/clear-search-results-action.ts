import { SearchActionType } from "./search-action-type.enum";
import { Action } from "@ngrx/store";

export class ClearSearchResultsAction implements Action {

  type = SearchActionType.CLEAR_SEARCH_RESULTS;
}
