import { DockTab } from "../dock-tab.enum";
import { DockActionType } from "./dock-action-type.enum";
import { PayloadAction } from "../../payload-action";

export class SelectDockTabAction implements PayloadAction {

  payload: DockTab;
  type = DockActionType.SELECT_TAB;

  constructor ( dockTab: DockTab ) {
    this.payload = dockTab;
  }
}
