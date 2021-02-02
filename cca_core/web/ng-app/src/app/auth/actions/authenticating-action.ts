import { Action } from "@ngrx/store";
import { AuthenticationActionType } from "./authentication-action-type.enum";

export class AuthenticatingAction implements Action {

  type = AuthenticationActionType.AUTHENTICATING;

}
