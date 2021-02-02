import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelGroupsService } from "../control-panel-groups.service";
import { User } from "../../../../core/user/user";

@Component ( {
  selector: 'cca-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: [ './user-card.component.scss' ]
} )
export class UserCardComponent implements OnInit {
  @Input ()
  ownerData: User;

  @Input ()
  groupId: string;

  @Output () updateOwners = new EventEmitter ( true );

  constructor ( private groupService: ControlPanelGroupsService ) {
  }

  ngOnInit () {

  }

  public removeOwner ( ownerData ) {
    this.groupService.removeOwner ( ownerData.id, this.groupId )
      .subscribe ( ( data ) => {
        this.updateOwners.emit ( data );
      } )
  }
}
