import { SearchActionType } from "./search-action-type.enum";
import { SearchType } from "../search-type/search-type";
import { PayloadAction } from "../../payload-action";

export class LoadSearchTypesAction implements PayloadAction {

  payload: SearchType[];
  type = SearchActionType.LOAD_SEARCH_TYPES;

  constructor ( payload: SearchType[] ) {
    this.payload = payload;
  }
}
