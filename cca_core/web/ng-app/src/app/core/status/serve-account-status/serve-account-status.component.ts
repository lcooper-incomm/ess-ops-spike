import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import { AbstractStatusComponent } from '../abstract-status/abstract-status.component';
import { StatusColor } from '../status-color.enum';
import { MaplesStatus } from '@cscore/maples-client-model';
import { ServeAccountStatus } from '../../model/account/serve-account-status.enum';

@Component ( {
  selector: 'cca-serve-account-status',
  templateUrl: './serve-account-status.component.html',
  styleUrls: [ './serve-account-status.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ServeAccountStatusComponent extends AbstractStatusComponent implements OnChanges, OnInit {

  @Input ()
  status: MaplesStatus;
  @Input ()
  textStatus: string;

  ngOnInit () {
    this.init ();
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.init ();
  }

  private init (): void {
    this.setFinalDisplayValue ( this.getStatus() ? this.getStatus() : '' );
  }

  getStatus(): string {
    if (this.status) {
      return this.status.name;
    } else {
      return this.textStatus;
    }
  }

  get colorClass (): string {
    switch ( this.getStatus() ) {
      case ServeAccountStatus.OPEN:
        return StatusColor.GREEN;
      case ServeAccountStatus.LOCKED:
        return StatusColor.RED;
      case ServeAccountStatus.CLOSED:
      case ServeAccountStatus.PERMANENTLY_CLOSED:
        return StatusColor.DARK_GREY;
      default:
        return StatusColor.LIGHT_GREY;
    }
  }

  get tooltip (): string {
    return this.getStatus();
  }
}
