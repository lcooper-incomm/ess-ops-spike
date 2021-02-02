import { PayloadAction } from "../payload-action";
import { ControlPanelState } from "./control-panel-state";
import { ControlPanelActionType } from './control-panel-action-type.enum';

export const DEFAULT_CONTROL_PANEL_STATE: ControlPanelState = {
  lastVisitedChildRoute: null,
};

export function controlPanelReducer ( state: ControlPanelState = DEFAULT_CONTROL_PANEL_STATE, action: PayloadAction ): ControlPanelState {
  let newState: ControlPanelState;

  switch ( action.type ) {
    case ControlPanelActionType.SELECT_CONTROL_PANEL_CHILD_ROUTE:
      newState = {
        ...state,
        lastVisitedChildRoute: action.payload,
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
