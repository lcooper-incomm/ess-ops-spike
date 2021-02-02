import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelRolesService } from "../../roles/control-panel-roles.service";
import { ToastFactory } from "../../../../toast/toast-factory.service";

@Component ( {
  selector: 'cca-user-role-card',
  templateUrl: './user-role-card.component.html',
  styleUrls: [ './user-role-card.component.scss' ]
} )
export class UserRoleCardComponent implements OnInit {

  @Input ()
  roleData;
  @Input ()
  userId;

  @Output () updateRoles = new EventEmitter ( true );

  constructor ( private rolesService: ControlPanelRolesService,
                private toastFactory: ToastFactory ) {
  }

  ngOnInit () {

  }

  public removeRole ( roleData ) {
    if ( this.roleData.membershipType === "MEMBER" ) {
      this.rolesService.removeMemberFromRole ( this.userId, roleData.id )
        .subscribe ( ( data ) => {
          this.toastFactory.success ( 'User removed as Role Administrator successfully' );
          this.updateRoles.emit ( data );
        } )
    }
    if ( this.roleData.membershipType === "ADMINISTRATOR" ) {
      this.rolesService.removeAdminFromRole ( this.userId, roleData.id )
        .subscribe ( ( data ) => {
          this.toastFactory.success ( 'User removed as Role Administrator successfully' );
          this.updateRoles.emit ( data );
        } )
    }
  }
}
