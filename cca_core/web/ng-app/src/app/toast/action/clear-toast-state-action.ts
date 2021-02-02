import { ToastActionType } from "./toast-action-type.enum";
import { Action } from "@ngrx/store";

export class ClearToastStateAction implements Action {

  type = ToastActionType.CLEAR_STATE;
}
