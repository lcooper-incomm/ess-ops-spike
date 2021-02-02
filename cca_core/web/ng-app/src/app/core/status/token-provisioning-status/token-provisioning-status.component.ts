import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractStatusComponent } from '../abstract-status/abstract-status.component';
import { TokenProvisioningStatusType } from '../../customer/token-provisioning-status-type.enum';
import { StatusColor } from '../status-color.enum';

@Component ( {
  selector: 'cca-token-provisioning-status',
  templateUrl: './token-provisioning-status.component.html',
  styleUrls: [ './token-provisioning-status.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TokenProvisioningStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: string = 'INELIGIBLE';

  @Input ()
  showTooltip: boolean = true;

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
    if ( this.status === TokenProvisioningStatusType.SUPPORTED ) {
      this.setFinalDisplayValue ( 'ENABLED' );
    } else {
      this.setFinalDisplayValue ( this.status );
    }
  }

  get colorClass (): string {
    switch ( this.status ) {
      case TokenProvisioningStatusType.LOCKED:
        return StatusColor.RED;
      case TokenProvisioningStatusType.SUPPORTED:
        return StatusColor.GREEN;
      case TokenProvisioningStatusType.UNSUPPORTED:
        return StatusColor.DARK_GREY;
      default:
        return StatusColor.LIGHT_GREY;
    }
  }

  get tooltip (): string {
    return this.status;
  }
}
