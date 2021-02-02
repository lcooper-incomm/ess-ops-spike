import { SearchActionType } from "./search-action-type.enum";
import { Action } from "@ngrx/store";

export class ClearSearchTypesAction implements Action {

  type = SearchActionType.CLEAR_SEARCH_TYPES;
}
