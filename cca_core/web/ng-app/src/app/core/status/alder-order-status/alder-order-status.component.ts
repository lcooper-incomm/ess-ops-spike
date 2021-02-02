import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MaplesOrderStatusItem} from '@cscore/maples-client-model';
import {StatusColor} from '../status-color.enum';
import {AbstractStatusComponent} from '../abstract-status/abstract-status.component';
import {AlderOrderStatusType} from './alter-order-status-type.enum';

@Component({
  selector: 'cca-alder-order-status',
  templateUrl: './alder-order-status.component.html'
})
export class AlderOrderStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input()
  status: MaplesOrderStatusItem;

  @Input()
  statusString: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  private init(): void {
    let statusValue;
    if (this.status) {
      statusValue = this.status.status;
    }
    if (this.statusString) {
      statusValue = this.statusString;
    }

    this.setFinalDisplayValue(statusValue || 'Unavailable');
    this.setClass(statusValue);
    this.setTooltip(statusValue);
  }

  private setClass(statusValue): void {
    let value;
    value = statusValue || 'Unavailable';

    switch (value.toUpperCase()) {
      case AlderOrderStatusType.COMPLETED:
        this.color = StatusColor.GREEN;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip(statusValue): void {
    this.tooltip = statusValue || 'Unavailable';
  }

}
