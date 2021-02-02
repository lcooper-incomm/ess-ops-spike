import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import { Transaction } from "../../../../../core/transaction/transaction";
import { Selection } from "../../../../../core/session/model/selection";

@Component ( {
  selector: 'cca-transaction-detail',
  templateUrl: './transaction-history-detail.component.html',
  styleUrls: [ './transaction-history-detail.component.scss' ]
} )
export class TransactionHistoryDetailComponent implements OnInit {

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;
  @Input ()
  expanded: boolean = false;

  showTransactionDetail: boolean = false;

  constructor () {
  }

  ngOnInit () {
  }

  /**
   * Listen for the details to be expanded before rendering children.  Rendering children prompts requests for detail data.
   * Once expanded the first time, always show.
   *
   * @param simpleChanges
   */
  ngOnChanges ( simpleChanges: SimpleChanges ): void {
    if ( simpleChanges["expanded"] ) {
      this.showTransactionDetail = this.showTransactionDetail || simpleChanges[ "expanded" ].currentValue;
    }
  }

}
