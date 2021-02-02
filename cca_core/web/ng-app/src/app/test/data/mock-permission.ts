import { Permission } from "src/app/core/auth/permission";

export function mockPermission (): Permission {
  return new Permission ( {
    category: {
      id: 123,
      displayName: 'Permission Category',
      systemName: 'PERMISSION_CATEGORY',
    }
  } );
}
