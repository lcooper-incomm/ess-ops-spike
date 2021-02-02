import {Component, Input, SimpleChanges} from '@angular/core';
import {MaplesTransaction} from '@cscore/maples-client-model';
import {CcaBaseComponent} from '../../../../../core/cca-base-component';
import {Selection} from '../../../../../core/session/model/selection';

@Component({
  selector: 'cca-maples-scheduled-transaction-detail',
  templateUrl: './maples-scheduled-transaction-detail.component.html'
})
export class MaplesScheduledTransactionDetailComponent extends CcaBaseComponent {

  @Input()
  selection: Selection<any>;
  @Input()
  transaction: MaplesTransaction;

}
