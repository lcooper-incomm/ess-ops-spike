import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from 'src/app/core/transaction/transaction';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';
import { TransactionActionService } from './transaction-action.service';

@Component ( {
  selector: 'cca-transaction-action-toolbar',
  templateUrl: './transaction-action-toolbar.component.html',
  styleUrls: [ './transaction-action-toolbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransactionActionToolbarComponent implements OnChanges {

  @Input ()
  transaction: Transaction;

  actions: ActionToolbarButtonStatus[] = [];

  constructor ( private actionService: TransactionActionService ) {
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.actions = this.actionService.doAllChecksForTransaction ( this.transaction );
  }
}
