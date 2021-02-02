import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlPanelGroupsService } from "../../groups/control-panel-groups.service";
import { ToastFactory } from "../../../../toast/toast-factory.service";

@Component ( {
  selector: 'cca-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: [ './group-card.component.scss' ]
} )
export class GroupCardComponent implements OnInit {

  @Input ()
  groupData;
  @Input ()
  userId;

  @Output () updateGroups = new EventEmitter ( true );

  constructor ( private groupService: ControlPanelGroupsService,
                private toastFactory: ToastFactory ) {
  }

  ngOnInit () {

  }

  public removeGroup ( groupData ) {
    this.groupService.removeOwner ( this.userId, groupData.id )
      .subscribe ( ( data ) => {
        this.toastFactory.success ( 'User removed as Group Owner successfully' );
        this.updateGroups.emit ( data );
      } )
  }
}

