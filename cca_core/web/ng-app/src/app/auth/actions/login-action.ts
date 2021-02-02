import { PayloadAction } from "../../core/payload-action";
import { AuthenticationActionType } from "./authentication-action-type.enum";
import { User } from "../../core/user/user";

export class LoginAction implements PayloadAction {

  payload: User;
  type = AuthenticationActionType.LOGIN;

  constructor ( user: User ) {
    this.payload = user;
  }
}
