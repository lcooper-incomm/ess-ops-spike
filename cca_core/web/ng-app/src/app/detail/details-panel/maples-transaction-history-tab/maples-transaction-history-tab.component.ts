import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../app-state';
import {SecurityService} from '../../../core/security/security.service';
import {MaplesTransactionService} from '../../../core/transaction/maples-transaction.service';
import {MaplesTransactionHistoryService} from './maples-transaction-history.service';

@Component({
  selector: 'cca-maples-transaction-history-tab',
  templateUrl: './maples-transaction-history-tab.component.html',
  styleUrls: ['./maples-transaction-history-tab.component.scss'],
  providers: [MaplesTransactionHistoryService]
})
export class MaplesTransactionHistoryTabComponent implements OnInit {

  constructor(private securityService: SecurityService,
              private store: Store<AppState>,
              private maplesTransactionService: MaplesTransactionService) {
  }

  ngOnInit() {
  }

}
