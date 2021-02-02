import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import { GreencardStatusType } from "./greencard-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-greencard-status',
  templateUrl: './greencard-status.component.html',
  styleUrls: [ './greencard-status.component.scss' ]
} )
export class GreencardStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: CsCoreStatus;

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
    this.setDisplayValue ();
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.status.name ) {
      case GreencardStatusType.INITIAL:
      case GreencardStatusType.ASSIGNED:
      case GreencardStatusType.PRINT_REQUEST:
      case GreencardStatusType.SENT_TO_PRINTERS:
      case GreencardStatusType.IN_PRODUCTION:
      case GreencardStatusType.IN_TRANSIT:
      case GreencardStatusType.IN_STORE:
      case GreencardStatusType.ACTIVATION_REQUESTED:
        this.color = StatusColor.BLUE;
        break;
      case GreencardStatusType.ACTIVE:
        this.color = StatusColor.GREEN;
        break;
      case GreencardStatusType.REPLACEMENT_REQUESTED:
      case GreencardStatusType.REPLACEMENT_PROCESSED:
      case GreencardStatusType.GIFT_CARD_REPLACEMENT:
      case GreencardStatusType.ON_HOLD:
      case GreencardStatusType.STOLEN:
      case GreencardStatusType.LOST:
      case GreencardStatusType.LOST_STOLEN:
        this.color = StatusColor.ORANGE;
        break;
      case GreencardStatusType.DEACTIVE:
      case GreencardStatusType.HOT_CARD:
      case GreencardStatusType.COMPROMISED_INACTIVE:
      case GreencardStatusType.FRAUD_WATCH:
      case GreencardStatusType.FAILED_ACTIVATION:
        this.color = StatusColor.RED;
        break;
      case GreencardStatusType.INVALID:
      case GreencardStatusType.EXPIRED:
        this.color = StatusColor.DARK_GREY;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setDisplayValue (): void {
    let value: string;
    switch ( this.status.name ) {
      case GreencardStatusType.LOST_STOLEN:
        value = 'Lost-Stolen';
        break;
      case GreencardStatusType.ON_HOLD:
        value = 'On-Hold';
        break;
      case GreencardStatusType.ON_HOLD_NEGATIVE_BALANCE:
        value = 'Negative Balance On-Hold';
        break;
      case GreencardStatusType.OFAC_FAILED:
        value = 'OFAC Failed';
        break;
      case GreencardStatusType.BALANCE_WRITE_OFF:
        value = 'Balance Write-Off';
        break;
      case GreencardStatusType.FRAUD_WATCH:
        value = 'Fraud Watch';
        break;
      default:
        value = this.status.description;
        break;
    }
    this.setFinalDisplayValue ( value );
  }

  private setTooltip (): void {
    this.tooltip = this.status.name;
    if ( this.status.description ) {
      this.tooltip += ' - ' + this.status.description;
    }
  }

}
