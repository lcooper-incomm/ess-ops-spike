import { Action } from "@ngrx/store";
import { DockActionType } from "./dock-action-type.enum";

export class ClearDockStateAction implements Action {

  type = DockActionType.CLEAR_STATE;
}
