import { ToastActionType } from "./toast-action-type.enum";
import { PayloadAction } from "../../core/payload-action";
import { Toast } from "../toast";

export class ClearToastAction implements PayloadAction {

  payload: Toast;
  type = ToastActionType.CLEAR_TOAST;

  constructor ( payload: Toast ) {
    this.payload = payload;
  }
}
