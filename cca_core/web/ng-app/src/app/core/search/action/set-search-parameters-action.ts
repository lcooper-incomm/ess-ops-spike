import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";

export class SetSearchParametersAction implements PayloadAction {

  payload: Map<string, any>;
  type = SearchActionType.SET_SEARCH_PARAMETERS;

  constructor ( payload: Map<string, any> ) {
    this.payload = payload;
  }
}
