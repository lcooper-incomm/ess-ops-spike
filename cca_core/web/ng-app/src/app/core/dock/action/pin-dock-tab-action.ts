import { DockActionType } from "./dock-action-type.enum";
import { Action } from "@ngrx/store";

export class PinDockTabAction implements Action {

  type = DockActionType.PIN;
}
