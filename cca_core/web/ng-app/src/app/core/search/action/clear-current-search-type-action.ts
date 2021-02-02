import { SearchActionType } from "./search-action-type.enum";
import { Action } from "@ngrx/store";

export class ClearCurrentSearchTypeAction implements Action {

  type = SearchActionType.CLEAR_CURRENT_SEARCH_TYPE;
}
