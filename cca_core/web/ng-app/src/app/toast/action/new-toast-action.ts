import { Toast } from "../toast";
import { ToastActionType } from "./toast-action-type.enum";
import { PayloadAction } from "../../core/payload-action";

export class NewToastAction implements PayloadAction {

  payload: Toast;
  type = ToastActionType.NEW_TOAST;

  constructor ( toast: Toast ) {
    this.payload = toast;
  }
}
