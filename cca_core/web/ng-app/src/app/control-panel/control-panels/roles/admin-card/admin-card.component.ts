import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelRolesService } from "../control-panel-roles.service";

@Component ( {
  selector: 'cca-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: [ './admin-card.component.scss' ]
} )
export class AdminCardComponent implements OnInit {

  @Input ()
  adminData;
  @Input ()
  roleId;

  @Output () updateAdmins = new EventEmitter ( true );

  constructor ( private rolesService: ControlPanelRolesService ) {
  }

  ngOnInit () {

  }

  public removeAdmin ( adminData ) {
    this.rolesService.removeAdminFromRole ( adminData.id, this.roleId )
      .subscribe ( ( data ) => {
        this.updateAdmins.emit ( data );
      } )
  }
}

