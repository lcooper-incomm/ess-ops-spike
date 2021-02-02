import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { MobileWalletTokenStatusType } from "./mobile-wallet-token-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-mobile-wallet-token-status',
  templateUrl: './mobile-wallet-token-status.component.html',
  styleUrls: [ './mobile-wallet-token-status.component.scss' ]
} )
export class MobileWalletTokenStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: string;

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
    this.setFinalDisplayValue ( this.status );
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.status ) {
      case MobileWalletTokenStatusType.ACTIVE:
        this.color = StatusColor.GREEN;
        break;
      case MobileWalletTokenStatusType.INACTIVE:
        this.color = StatusColor.BLUE;
        break;
      case MobileWalletTokenStatusType.DEACTIVATED:
        this.color = StatusColor.DARK_GREY;
        break;
      case MobileWalletTokenStatusType.SUSPENDED:
        this.color = StatusColor.RED;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip (): void {
    this.tooltip = this.status;
  }

}
