import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";

export class ResetSearchParametersAction implements PayloadAction {

  payload: Map<string, any>;
  type = SearchActionType.RESET_PARAMETERS;

  constructor ( payload: Map<string, any> ) {
    this.payload = payload;
  }
}
