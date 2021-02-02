import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MaplesTransaction} from "@cscore/maples-client-model";
import {ActionToolbarButtonStatus} from 'src/app/core/action-toolbar/action-toolbar-button-status';
import {MaplesTransactionActionService} from './maples-transaction-action.service';

@Component({
  selector: 'cca-maples-transaction-action-toolbar',
  templateUrl: './maples-transaction-action-toolbar.component.html',
  styleUrls: ['./maples-transaction-action-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaplesTransactionActionToolbarComponent implements OnChanges {

  @Input()
  transaction: MaplesTransaction;

  @Input()
  preauthTransaction: MaplesTransaction;

  actions: ActionToolbarButtonStatus[] = [];

  constructor(private actionService: MaplesTransactionActionService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.transaction.schedule && this.transaction.schedule.id) {
      this.actions = this.actionService.doAllChecksForScheduledTransaction(this.transaction);
    } else {
      this.actions = this.actionService.doAllChecksForTransaction(this.transaction,this.preauthTransaction);
    }
  }
}
