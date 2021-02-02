import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelPermissionService } from "../control-panel-permission.service";
import { Group } from "../../../../core/auth/group";

@Component ( {
  selector: 'cca-permission-group-card',
  templateUrl: './permission-group-card.component.html',
  styleUrls: [ './permission-group-card.component.scss' ]
} )
export class PermissionGroupCardComponent implements OnInit {

  @Input ()
  groupData: Group;
  @Input ()
  permissionId: string;

  @Output () updateGroups = new EventEmitter ( true );

  constructor ( private permissionService: ControlPanelPermissionService ) {
  }

  ngOnInit () {
  }

  public removePermission ( groupData: Group ) {
    this.permissionService.removePermission ( groupData.id, this.permissionId )
      .subscribe ( ( data ) => {
        this.updateGroups.emit ( data );
      } )
  }
}
