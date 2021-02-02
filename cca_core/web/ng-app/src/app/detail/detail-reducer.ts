import { DetailState } from "./detail-state";
import { SummaryModeType } from "../core/user/summary-mode-type.enum";
import { PayloadAction } from "../core/payload-action";
import { AuthenticationActionType } from "../auth/actions/authentication-action-type.enum";
import { DetailActionType } from "./detail-action-type.enum";

export const DEFAULT_DETAIL_STATE: DetailState = {
  summaryMode: null
};

export function detailReducer ( state: DetailState = DEFAULT_DETAIL_STATE, action: PayloadAction ): DetailState {
  let newState: DetailState;

  switch ( action.type ) {
    case AuthenticationActionType.LOGIN:
      newState = {
        ...state,
        summaryMode: action.payload.prefSummaryMode ? action.payload.prefSummaryMode : SummaryModeType.LEFT
      };
      break;
    case DetailActionType.SET_SUMMARY_MODE:
      newState = {
        ...state,
        summaryMode: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
