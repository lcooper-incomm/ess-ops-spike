import { ToastActionType } from "./toast-action-type.enum";
import { Action } from "@ngrx/store";

export class ClearAllToastsAction implements Action {

  type = ToastActionType.CLEAR_ALL;
}
