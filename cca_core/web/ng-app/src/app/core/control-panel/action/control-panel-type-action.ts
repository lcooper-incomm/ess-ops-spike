import { PayloadAction } from "../../payload-action";
import { ControlPanelActionType } from "../control-panel-action-type.enum";

export class ControlPanelChildRouteAction implements PayloadAction {

  payload: string;
  type = ControlPanelActionType.SELECT_CONTROL_PANEL_CHILD_ROUTE;

  constructor ( url: string ) {
    this.payload = url;
  }
}
