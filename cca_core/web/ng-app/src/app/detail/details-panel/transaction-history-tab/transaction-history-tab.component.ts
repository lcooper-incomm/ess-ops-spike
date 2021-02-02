import { Component, OnInit } from '@angular/core';
import { TransactionService } from "./transaction.service";
import { SecurityService } from "../../../core/security/security.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";

@Component ( {
  selector: 'cca-transaction-history-tab',
  templateUrl: './transaction-history-tab.component.html',
  styleUrls: [ './transaction-history-tab.component.scss' ]
} )
export class TransactionHistoryTabComponent implements OnInit {

  constructor ( private securityService: SecurityService,
                private store: Store<AppState>,
                private transactionService: TransactionService ) {
  }

  ngOnInit () {
  }

}
