import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelRolesService } from "../../roles/control-panel-roles.service";
import { Role } from "../../../../core/auth/role";

@Component ( {
  selector: 'cca-permission-role-card',
  templateUrl: './permission-role-card.component.html',
  styleUrls: [ './permission-role-card.component.scss' ]
} )
export class PermissionRoleCardComponent implements OnInit {

  @Input ()
  roleData: Role;
  @Input ()
  permissionId: string;

  @Output () updateRoles = new EventEmitter ( true );

  constructor ( private rolesService: ControlPanelRolesService ) {
  }

  ngOnInit () {

  }

  public removePermission ( roleData: Role ) {
    this.rolesService.removePermissionFromRole ( roleData.id, this.permissionId )
      .subscribe ( ( data ) => {
        this.updateRoles.emit ( data );
      } )
  }

}
