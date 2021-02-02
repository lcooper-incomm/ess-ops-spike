import { ReportState } from "./report-state";
import { PayloadAction } from "../core/payload-action";
import { ReportActionType } from "./action/report-action-type.enum";

export const DEFAULT_REPORT_STATE: ReportState = {
  reportId: null,
  reports: []
};

export function reportReducer ( state: ReportState = DEFAULT_REPORT_STATE, action: PayloadAction ): ReportState {
  let newState: ReportState;

  switch ( action.type ) {
    case ReportActionType.SELECT_REPORT:
      newState = {
        ...state,
        reportId: action.payload
      };
      break;
    case ReportActionType.LOAD_REPORTS:
      newState = {
        ...state,
        reports: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
