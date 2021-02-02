import { AuthenticationState } from "./authentication-state";
import { PayloadAction } from "../core/payload-action";
import { AuthenticationStatus } from "./authentication-status.enum";
import { AuthenticationActionType } from "./actions/authentication-action-type.enum";

export const DEFAULT_AUTHENTICATION_STATE: AuthenticationState = {
  error: null,
  status: AuthenticationStatus.NOT_ATTEMPTED,
  user: null
};

export function authenticationReducer ( state: AuthenticationState = DEFAULT_AUTHENTICATION_STATE, action: PayloadAction ): AuthenticationState {
  let newState: AuthenticationState;

  switch ( action.type ) {
    case AuthenticationActionType.AUTHENTICATING:
      newState = {
        ...state,
        error: null,
        status: AuthenticationStatus.AUTHENTICATING,
        user: null
      };
      break;
    case AuthenticationActionType.LOGIN_ERROR:
      newState = {
        ...state,
        error: action.payload,
        status: AuthenticationStatus.AUTHENTICATION_FAILED,
        user: null
      };
      break;
    case AuthenticationActionType.LOGIN:
      newState = {
        ...state,
        status: AuthenticationStatus.AUTHENTICATED,
        user: action.payload
      };
      break;
    case AuthenticationActionType.LOGIN_NEEDED:
      newState = {
        ...state,
        status: AuthenticationStatus.NOT_ATTEMPTED,
        user: null
      };
      break;
    case AuthenticationActionType.LOGOUT:
      newState = {
        ...state,
        status: AuthenticationStatus.NOT_ATTEMPTED,
        user: null
      };
      break;
    case AuthenticationActionType.UPDATE_USER:
      newState = {
        ...state
      };

      newState.user.prefDefaultBolPartner   = action.payload.prefDefaultBolPartner;
      newState.user.prefDefaultDataSource   = action.payload.prefDefaultDataSource;
      newState.user.prefDefaultDockMode     = action.payload.prefDockMode;
      newState.user.prefDefaultLandingPage  = action.payload.prefDefaultLandingPage;
      newState.user.prefDefaultPartner      = action.payload.prefDefaultPartner;
      newState.user.prefDefaultCclPartner   = action.payload.prefDefaultCclPartner;
      newState.user.prefDefaultSearchTypeId = action.payload.prefDefaultSearchTypeId;
      newState.user.prefDefaultSessionType  = action.payload.prefDefaultSessionType;
      newState.user.prefSummaryMode         = action.payload.prefSummaryMode;

      break;
    default:
      newState = state;
      break;
  }

  return newState;

}
