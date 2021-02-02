import { DockState } from "./dock-state";
import { DockTab } from "./dock-tab.enum";
import { DockActionType } from "./action/dock-action-type.enum";
import { PayloadAction } from "../payload-action";
import { CloseDockTabAction } from "./action/close-dock-tab-action";
import { DockSelectionsTabActionType } from "./dock/selections-tab/dock-selections-tab-action-type.enum";

export const DEFAULT_DOCK_STATE: DockState = {
  isOpen: false,
  isPinned: false,
  selectedTab: DockTab.WORKSPACE
};

export function dockReducer ( state: DockState = DEFAULT_DOCK_STATE, action: PayloadAction ): DockState {
  let newState: DockState;

  switch ( action.type ) {
    case DockSelectionsTabActionType.CLEAR_STATE:
    case DockActionType.CLEAR_STATE:
      newState = DEFAULT_DOCK_STATE;
      break;
    case DockActionType.CLOSE:
      newState = {
        ...state
      };

      //Do not close the workspace if it's pinned, unless it's forced (which only happens if the user clicks on the workspace itself to close it)
      if ( !newState.isPinned || (<CloseDockTabAction>action).forceClose ) {
        newState.isOpen = false;
      }
      break;
    case DockActionType.OPEN:
      newState = {
        ...state,
        isOpen: true
      };
      break;
    case DockActionType.PIN:
      newState = {
        ...state,
        isPinned: true
      };
      break;
    case DockActionType.SELECT_TAB:
      newState = {
        ...state,
        selectedTab: action.payload
      };
      break;
    case DockActionType.UNPIN:
      newState = {
        ...state,
        isPinned: false
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
