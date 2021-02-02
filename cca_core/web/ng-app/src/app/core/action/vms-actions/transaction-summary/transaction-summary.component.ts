import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Transaction } from 'src/app/core/transaction/transaction';

@Component ( {
  selector: 'cca-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: [ './transaction-summary.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class TransactionSummaryComponent {
  @Input () transaction: Transaction;
}
