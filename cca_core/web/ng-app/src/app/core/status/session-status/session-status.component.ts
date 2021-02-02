import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SessionStatusType } from "../../session/model/session-status-type.enum";
import { StatusColor } from "../status-color.enum";
import { SessionStatus } from '../../session/model/session-status';
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-session-status',
  templateUrl: './session-status.component.html',
  styleUrls: [ './session-status.component.scss' ]
} )
export class SessionStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: SessionStatus;

  constructor () {
    super ();
  }

  ngOnInit () {
    this.init ();
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.init ();
  }

  private init (): void {
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.status.value ) {
      case SessionStatusType.ACTIVE:
        this.color = StatusColor.GREEN;
        break;
      case SessionStatusType.ACTIVATION_REVERSAL:
      case SessionStatusType.AWAITING_DOCS:
      case SessionStatusType.CALLBACK:
      case SessionStatusType.REPLACEMENT_REQUESTED:
      case SessionStatusType.WORKING:
        this.color = StatusColor.ORANGE;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip (): void {
    this.tooltip = this.status.value;
  }

}
