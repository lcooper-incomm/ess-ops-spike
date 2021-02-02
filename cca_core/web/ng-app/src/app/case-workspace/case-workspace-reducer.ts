import { CaseWorkspaceState } from "./case-workspace-state";
import { PayloadAction } from "../core/payload-action";
import { SessionQueue } from "../core/session/model/session-queue";
import { CaseWorkspaceActionType } from "./case-workspace-actions";

export const DEFAULT_CASE_WORKSPACE_STATE: CaseWorkspaceState = {
  request: null,
  results: null,
  queueMap: new Map<string, SessionQueue[]> (),
  queues: [],
  statusOptions: [],
  teams: []
}

export function caseWorkspaceReducer ( state: CaseWorkspaceState = DEFAULT_CASE_WORKSPACE_STATE, action: PayloadAction ): CaseWorkspaceState {
  let newState: CaseWorkspaceState;

  switch ( action.type ) {
    case CaseWorkspaceActionType.CLEAR:
      newState = DEFAULT_CASE_WORKSPACE_STATE;
      break;
    case CaseWorkspaceActionType.LOAD_QUEUES:
      newState = {
        ...state,
        queues: [ ...action.payload ]
      };
      break;
    case CaseWorkspaceActionType.LOAD_QUEUES_INTO_MAP:
      newState = {
        ...state
      };
      newState.queueMap.set ( action.payload.key, action.payload.value );
      break;
    case CaseWorkspaceActionType.LOAD_STATUS_OPTIONS:
      newState = {
        ...state,
        statusOptions: [ ...action.payload ]
      };
      break;
    case CaseWorkspaceActionType.LOAD_TEAMS:
      newState = {
        ...state,
        teams: [ ...action.payload ]
      };
      break;
    case CaseWorkspaceActionType.SET_REQUEST:
      newState = {
        ...state,
        request: action.payload
      };
      break;
    case CaseWorkspaceActionType.SET_RESULTS:
      newState = {
        ...state,
        results: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
