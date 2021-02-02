import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component ( {
  selector: 'cca-modal-panel',
  templateUrl: './modal-panel.component.html',
  styleUrls: [ './modal-panel.component.scss' ]
} )
export class ModalPanelComponent implements OnInit {
  @Input ()
  color: string = 'primary';
  @Input ()
  header: string;

  @Input ()
  isLocked: boolean;

  @Input ()
  isLoaded: boolean;

  groupData;

  constructor ( public dialogRef: MatDialogRef<ModalPanelComponent>,
                @Inject ( MAT_DIALOG_DATA ) public data: any ) {
    this.groupData = data;
  }

  ngOnInit () {
    this.header = this.groupData.displayName
  }

  public close () {
    this.dialogRef.close ();
  }
}
