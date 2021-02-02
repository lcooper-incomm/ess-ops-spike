import { SearchActionType } from "./search-action-type.enum";
import { Action } from "@ngrx/store";

export class ClearSearchStateAction implements Action {

  type = SearchActionType.CLEAR_STATE;
}
