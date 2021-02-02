import { DockActionType } from "./dock-action-type.enum";
import { Action } from "@ngrx/store";

export class CloseDockTabAction implements Action {

  forceClose: boolean;
  type = DockActionType.CLOSE;

  constructor ( forceClose: boolean = false ) {
    this.forceClose = forceClose;
  }

}
