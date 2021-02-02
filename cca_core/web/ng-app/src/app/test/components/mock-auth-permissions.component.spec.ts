import { Group } from 'src/app/core/auth/group';
import { Component, Input } from '@angular/core';
import { Role } from 'src/app/core/auth/role';

@Component ( {
  selector: 'cca-auth-permissions',
  template: '',
} )
export class MockAuthPermissionsComponent {
  @Input () group: Group;
  @Input () role: Role;
}
