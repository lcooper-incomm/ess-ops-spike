import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from "../../../../../../../core/transaction/transaction";
import { Selection } from "../../../../../../../core/session/model/selection";
import { CsCoreAddressType } from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-greencard-transaction-history-detail',
  templateUrl: './greencard-transaction-detail.component.html',
  styleUrls: [ './greencard-transaction-detail.component.scss' ]
} )
export class GreencardTransactionDetailComponent implements OnInit {

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;

  AddressType = CsCoreAddressType;

  constructor () {
  }

  ngOnInit () {
  }

}
