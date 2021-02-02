import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import { FsapiStatusType } from "./fsapi-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-fsapi-status',
  templateUrl: './fsapi-status.component.html',
  styleUrls: [ './fsapi-status.component.scss' ]
} )
export class FsapiStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: CsCoreStatus | string;

  private statusDescription: string;
  private statusValue: string;

  constructor () {
    super ();
  }

  ngOnInit () {
    this.init ();
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.init ();
  }

  private init () {
    if ( this.status instanceof CsCoreStatus ) {
      this.statusDescription = this.status.description;
      this.statusValue       = this.status.name;
    } else {
      this.statusValue = this.status;
    }

    this.setDisplayValue ();
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.statusValue ) {
      case FsapiStatusType.ACTIVE:
      case FsapiStatusType.ACTIVE_UNREGISTERED:
      case FsapiStatusType.SPEND_DOWN:
        this.color = StatusColor.GREEN;
        break;
      case FsapiStatusType.INACTIVE:
        this.color = StatusColor.BLUE;
        break;
      case FsapiStatusType.ON_HOLD:
      case FsapiStatusType.LOST_STOLEN:
        this.color = StatusColor.ORANGE;
        break;
      case FsapiStatusType.HOT_CARDED:
      case FsapiStatusType.DAMAGE:
      case FsapiStatusType.MONITORED:
      case FsapiStatusType.RESTRICTED:
      case FsapiStatusType.PASSIVE:
      case FsapiStatusType.ALERT:
      case FsapiStatusType.RETURNED_MAIL:
        this.color = StatusColor.RED;
        break;
      case FsapiStatusType.EXPIRED:
      case FsapiStatusType.CLOSED:
        this.color = StatusColor.DARK_GREY;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setDisplayValue (): void {
    let value = this.statusValue ? this.statusValue : 'UNKNOWN';
    this.setFinalDisplayValue ( value );
  }

  private setTooltip (): void {
    this.tooltip = this.statusValue ? this.statusValue : 'UNKNOWN';
    if ( this.statusDescription ) {
      this.tooltip += ' ' + this.statusDescription;
    }
  }

}
