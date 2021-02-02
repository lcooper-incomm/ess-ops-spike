import { DockActionType } from "./dock-action-type.enum";
import { Action } from "@ngrx/store";

export class UnpinDockTabAction implements Action {

  type = DockActionType.UNPIN;
}
