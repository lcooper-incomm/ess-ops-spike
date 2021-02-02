import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Transaction} from 'src/app/core/transaction/transaction';
import {MaplesTransaction} from '@cscore/maples-client-model';

@Component({
  selector: 'cca-simple-transaction-table',
  templateUrl: './simple-transaction-table.component.html',
  styleUrls: ['./simple-transaction-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTransactionTableComponent {
  @Input() transactions: MaplesTransaction[] | Transaction[] = [];

  displayedColumns: string[] = ['id', 'createdDate', 'request', 'response', 'authorizedAmount'];

  getDate(transaction: MaplesTransaction | Transaction): string {
    if (transaction instanceof MaplesTransaction) {
      return (<MaplesTransaction>transaction).getDisplayDate();
    } else {
      return (<Transaction>transaction).createDate ? (<Transaction>transaction).createDate.displayValue : null;
    }
  }

  getRequest(transaction: MaplesTransaction | Transaction): string {
    if (transaction instanceof MaplesTransaction) {
      const maplesTransaction: MaplesTransaction = <MaplesTransaction>transaction;
      return maplesTransaction.request && maplesTransaction.request.description;
    } else {
      return (<Transaction>transaction).getRequestDisplayValue();
    }
  }

  getResponse(transaction: MaplesTransaction | Transaction): string {
    if (transaction instanceof MaplesTransaction) {
      const maplesTransaction: MaplesTransaction = <MaplesTransaction>transaction;
      return maplesTransaction.response && maplesTransaction.response.description;
    } else {
      return (<Transaction>transaction).getResponseDisplayValue();
    }
  }
}
