import {Component, HostBinding, Input} from '@angular/core';
import {MaplesOrder} from '@cscore/maples-client-model';
import {Selection} from '../../../../core/session/model/selection';

@Component({
  selector: 'cca-order-alder-summary',
  templateUrl: './order-alder-summary.component.html'
})
export class OrderAlderSummaryComponent {

  @HostBinding('class') classes: string = 'summary-section-container';

  @Input()
  selection: Selection<MaplesOrder>;

}
