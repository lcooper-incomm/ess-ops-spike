import { AuthenticationStatus } from "./authentication-status.enum";
import { User } from "../core/user/user";

export class AuthenticationState {

  error: any;
  status: AuthenticationStatus = AuthenticationStatus.NOT_ATTEMPTED;
  user: User;
}
