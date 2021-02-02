import { PayloadAction } from "../../core/payload-action";
import { ServiceState } from "../../services/service-state";
import { ServicePanelActionType } from "./service-panel-action-type.enum";

export const DEFAULT_SERVICE_STATE: ServiceState = {
  selectedServiceType: null,

};

export function serviceReducer ( state: ServiceState = DEFAULT_SERVICE_STATE, action: PayloadAction ): ServiceState {
  let newState: ServiceState;

  switch ( action.type ) {
    case ServicePanelActionType.SELECT_SERVICE_PANEL_TYPE:
      newState = {
        ...state,
        selectedServiceType: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
