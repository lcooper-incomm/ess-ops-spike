import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";
import { SearchTypeType } from "../search-type/search-type-type.enum";

export class SelectSearchTypeAction implements PayloadAction {

  payload: SearchTypeType;
  type = SearchActionType.SELECT_SEARCH_TYPE;

  constructor ( payload: SearchTypeType ) {
    this.payload = payload;
  }
}
