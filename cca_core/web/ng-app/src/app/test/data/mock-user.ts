import { User } from "src/app/core/user/user";

export function mockUser (): User {
  return new User ( {
    id: '123',
    username: 'username',
    displayName: 'User',
  } )
}
