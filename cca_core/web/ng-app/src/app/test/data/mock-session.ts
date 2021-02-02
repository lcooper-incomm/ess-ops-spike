import { Session } from "src/app/core/session/model/session";
import { mockUser } from './mock-user';

export function mockSession (): Session {
  const session = new Session ( null );
  session.user  = mockUser ();
  return session;
}
