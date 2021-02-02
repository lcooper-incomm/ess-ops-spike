import { PayloadAction } from "../../payload-action";
import { OrderActionType } from "./order-action-type.enum";
import { Selection } from "../../session/model/selection";
import {MaplesOrder} from "@cscore/maples-client-model";

export class LoadOrderItemsForSelectionAction implements PayloadAction {
  payload: Selection<MaplesOrder>;
  type = OrderActionType.LOAD_ORDER_ITEMS_FOR_SELECTION;

  constructor ( payload: Selection<MaplesOrder> ) {
    this.payload = payload;
  }
}
