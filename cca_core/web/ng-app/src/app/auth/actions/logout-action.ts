import { Action } from "@ngrx/store";
import { AuthenticationActionType } from "./authentication-action-type.enum";

export class LogoutAction implements Action {

  type = AuthenticationActionType.LOGOUT;

}
