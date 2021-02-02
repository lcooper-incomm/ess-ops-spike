import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractStatusComponent} from '../abstract-status/abstract-status.component';
import {StatusColor} from '../status-color.enum';
import {MaplesStatus} from '@cscore/maples-client-model';
import {ServeCardStatus} from '../../model/account/serve-card-status.enum';

/**
 * The status passed in should be the card status on the account if the card is active.  Otherwise, use the status on
 * the card (which should always be inactive).
 */
@Component ( {
  selector: 'cca-serve-card-status',
  templateUrl: './serve-card-status.component.html',
  styleUrls: [ './serve-card-status.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ServeCardStatusComponent extends AbstractStatusComponent implements OnChanges, OnInit {

  @Input ()
  status: MaplesStatus;
  @Input ()
  textStatus: string;

  ngOnInit () {
    this.init ();
  }

  ngOnChanges (): void {
    this.init ();
  }

  private init (): void {
    this.setFinalDisplayValue ( this.getStatus() );
  }

  /**
   * When a card status comes back, it is on the description.  On the platform status on a card, the status is on
   * the name.  Use this difference to tell which one to use.
   */
  getStatus(): string {
    if (this.status) {
      return this.status.name ? this.status.name : (this.status.description ? this.status.description : '');
    } else if (this.textStatus) {
      return this.textStatus;
    } else {
      return '';
    }
  }

  get colorClass(): string {
    let status: string = this.getStatus().toLowerCase();
    switch (status) {
      case ServeCardStatus.INACTIVE.toLowerCase():
        return StatusColor.BLUE;
      case ServeCardStatus.ACTIVE.toLowerCase():
      case ServeCardStatus.OPEN.toLowerCase():
        return StatusColor.GREEN;
      case ServeCardStatus.PENDING_ACTIVATION.toLowerCase():
        return StatusColor.ORANGE;
      case ServeCardStatus.LOCKED.toLowerCase():
        return StatusColor.RED;
      default:
        return StatusColor.LIGHT_GREY;
    }
  }

  get tooltip (): string {
    if (this.status) {
      return this.status.name;
    } else {
      return this.textStatus;
    }
  }
}
