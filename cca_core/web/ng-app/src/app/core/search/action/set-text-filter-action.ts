import { SearchActionType } from "./search-action-type.enum";
import { PayloadAction } from "../../payload-action";

export class SetTextFilterAction implements PayloadAction {

  payload: string;
  type = SearchActionType.SET_TEXT_FILTER;

  constructor ( payload: string ) {
    this.payload = payload;
  }
}
