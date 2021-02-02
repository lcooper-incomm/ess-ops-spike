import { PayloadAction } from "../../core/payload-action";
import { AuthenticationActionType } from "./authentication-action-type.enum";

export class LoginErrorAction implements PayloadAction {

  payload: any;
  type = AuthenticationActionType.LOGIN_ERROR;

  constructor ( payload: any ) {
    this.payload = payload;
  }
}
