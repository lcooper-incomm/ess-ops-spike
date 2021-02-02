import { DockActionType } from "./dock-action-type.enum";
import { Action } from "@ngrx/store";

export class OpenDockTabAction implements Action {

  type = DockActionType.OPEN;
}
