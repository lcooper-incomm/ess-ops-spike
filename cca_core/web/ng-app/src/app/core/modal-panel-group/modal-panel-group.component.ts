import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { ControlPanelGroupsService } from "../../control-panel/control-panels/groups/control-panel-groups.service";

@Component ( {
  selector: 'cca-modal-panel-group',
  templateUrl: './modal-panel-group.component.html',
  styleUrls: [ './modal-panel-group.component.scss' ]
} )
export class ModalPanelGroupComponent implements OnInit {
  @Input ()
  color: string = 'primary';
  @Input ()
  header: string;

  @Input ()
  isLocked: boolean;

  @Input ()
  isLoaded: boolean;

  groupData;

  constructor ( public dialogRef: MatDialogRef<ModalPanelGroupComponent>,
                @Inject ( MAT_DIALOG_DATA ) public data: any,
                private groupService: ControlPanelGroupsService ) {
    this.groupData = data;
  }

  ngOnInit () {
  }

  public close () {
    this.dialogRef.close ()
  }
}
