import { Action } from "@ngrx/store";
import { AuthenticationActionType } from "./authentication-action-type.enum";

export class LoginNeededAction implements Action {

  type = AuthenticationActionType.LOGIN_NEEDED;

}
