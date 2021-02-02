import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelRolesService } from "../control-panel-roles.service";

@Component ( {
  selector: 'cca-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: [ './member-card.component.scss' ]
} )
export class MemberCardComponent implements OnInit {

  @Input ()
  memberData;
  @Input ()
  roleId;

  @Output () updateMembers = new EventEmitter ( true );

  constructor ( private rolesService: ControlPanelRolesService ) {
  }

  ngOnInit () {

  }

  public removeMember ( memberData ) {
    this.rolesService.removeMemberFromRole ( memberData.id, this.roleId )
      .subscribe ( ( data ) => {
        this.updateMembers.emit ( data );
      } )
  }
}

