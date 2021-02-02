import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";
import { SearchTypeContainer } from "../search-type-container";

export class UpdateSearchTypeAction implements PayloadAction {

  payload: SearchTypeContainer;
  type = SearchActionType.UPDATE_SEARCH_TYPE;

  constructor ( payload: SearchTypeContainer ) {
    this.payload = payload;
  }
}
