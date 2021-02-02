import { PayloadAction } from "../../core/payload-action";
import { AuthenticationActionType } from "./authentication-action-type.enum";
import { User } from "../../core/user/user";

export class UpdateUserAction implements PayloadAction {

  payload: User;
  type = AuthenticationActionType.UPDATE_USER;

  constructor ( user: User ) {
    this.payload = user;
  }
}

