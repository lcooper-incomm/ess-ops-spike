import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from "../../../../../../core/transaction/transaction";
import { Selection } from "../../../../../../core/session/model/selection";

@Component ( {
  selector: 'cca-transaction-history-account-detail',
  templateUrl: './transaction-history-account-detail.component.html',
  styleUrls: [ './transaction-history-account-detail.component.scss' ]
} )
export class TransactionHistoryAccountDetailComponent implements OnInit {

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;

  constructor () {

  }

  ngOnInit () {

  }

}
