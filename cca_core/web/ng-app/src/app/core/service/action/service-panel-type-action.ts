import { PayloadAction } from "../../payload-action";
import { ServicePanelActionType } from "../service-panel-action-type.enum";
import { ServicePanelType } from "../service-panel-type.enum";

export class ServicePanelTypeAction implements PayloadAction {

  payload: ServicePanelType;
  type = ServicePanelActionType.SELECT_SERVICE_PANEL_TYPE;

  constructor ( payload: ServicePanelType ) {
    this.payload = payload;
  }
}
