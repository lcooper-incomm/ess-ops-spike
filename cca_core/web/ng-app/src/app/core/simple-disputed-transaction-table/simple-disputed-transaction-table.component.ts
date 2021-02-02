import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DisputeTransaction} from "../action/vms-actions/models/vms-request-models";
import {FullTransactionHistoryDetailsWizard} from "../../detail/details-panel/transaction-history-tab/full-transaction-history-details-wizard/full-transaction-history-details-wizard";
import {WizardRunner} from "../wizard/wizard-runner/wizard-runner.service";
import {HttpParams} from "@angular/common/http";
import {RequestQueryParam} from "../routing/request-query-param.enum";
import {IdentifierType} from "../session/model/identifier-type.enum";
import {Transaction} from "../transaction/transaction";
import {SessionState} from "../session/session-state";
import {snapshot} from "../store-utils/store-utils";
import {AppStateType} from "../../app-state-type.enum";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {TransactionService} from "../../detail/details-panel/transaction-history-tab/transaction.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SpinnerComponent} from "../spinner/spinner.component";
import {finalize} from "rxjs/operators";
import {PlatformType} from "../platform/platform-type.enum";
import {Selection} from "../session/model/selection";
import {MaplesTransactionService} from '../transaction/maples-transaction.service';
import {
  MaplesPlatform,
  MaplesTransaction,
  MaplesTransactionAlerts,
  MaplesTransactionAmounts,
  MaplesTransactionDevice,
  MaplesTransactionFeeInfo,
  MaplesTransactionRequest,
  MaplesTransactionResponse,
  MaplesTransactionSettlement
} from '@cscore/maples-client-model';
import {MaplesTransactionDetailsWizard} from '../../detail/details-panel/maples-transaction-history-tab/maples-transaction-details-wizard/maples-transaction-details-wizard';
import {Identifier} from '../session/model/identifier';

@Component ( {
  selector: 'cca-simple-disputed-transaction-table',
  templateUrl: './simple-disputed-transaction-table.component.html',
  styleUrls: [ './simple-disputed-transaction-table.component.scss' ]
} )

export class SimpleDisputedTransactionTableComponent implements OnInit {
  dataSource                    = new MatTableDataSource<DisputeTransaction> ();
  greenCardColumns: string[]    = [ 'transactionId', 'businessDate', 'request', 'response', 'amount' ];
  nonGreenCardColumns: string[] = [ 'transactionId', 'businessDate', 'requestCode', 'responseCode', 'amount' ];
  serveColumns: string[]        = [ 'transactionId', 'sourceRefNum', 'disputeId', 'businessDate', 'requestCode', 'responseCode', 'amount' ];

  displayedColumns: string[] = this.nonGreenCardColumns;
  isGreenCard: boolean;
  selection: Selection<any>;

  @ViewChild ( 'disputeSpinner' )
  disputeSpinner: SpinnerComponent;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  @Input()
  identifier: Identifier;

  @Input ()
  set transactions ( transactions: DisputeTransaction[] ) {
    if ( transactions ) {
      this.dataSource.data = transactions;
    }
  }

  ngOnInit () {
    const sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    this.selection                   = sessionState.selection;
    this.isGreenCard                 = this.identifier.platform === PlatformType.GREENCARD;
    if (this.isGreenCard) {
      this.displayedColumns = this.greenCardColumns;
    } else if (this.identifier.platform === PlatformType.SERVE) {
      this.displayedColumns = this.serveColumns;
    }

    this.sort.disableClear    = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.dataSource.sortingDataAccessor = ( disputeTransaction: DisputeTransaction, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'transactionId':
          sortValue = disputeTransaction.transactionId ? disputeTransaction.transactionId.toLowerCase () : null;
          break;
        case 'sourceRefNum':
          sortValue = disputeTransaction.sourceRefNum ? disputeTransaction.sourceRefNum.toLowerCase () : null;
          break;
        case 'businessDate':
          sortValue = (disputeTransaction.businessDate && disputeTransaction.businessDate.displayValue) ? disputeTransaction.businessDate.displayValue.toLowerCase () : null;
          break;
        case 'request':
          sortValue = disputeTransaction.request ? disputeTransaction.request.toLowerCase () : null;
          break;
        case 'requestCode':
          sortValue = disputeTransaction.requestCode ? disputeTransaction.requestCode.toLowerCase () : null;
          break;
        case 'response':
          sortValue = disputeTransaction.response ? disputeTransaction.response.toLowerCase () : null;
          break;
        case 'responseCode':
          sortValue = disputeTransaction.responseCode ? disputeTransaction.responseCode.toLowerCase () : null;
          break;
        case 'amount':
          sortValue = (disputeTransaction.amount && disputeTransaction.amount.displayValue) ? disputeTransaction.amount.displayValue.toLowerCase () : null;
          break;
        case 'disputeId':
          sortValue = disputeTransaction.disputeId;
          break;
        default:
          sortValue = disputeTransaction[ property ];
          break;
      }

      return sortValue;
    };
  }

  constructor ( private store: Store<AppState>,
                private transactionService: TransactionService,
                private maplesTransactionService: MaplesTransactionService,
                private wizardRunner: WizardRunner ) {
  }

  private openFullTransactionDetails ( transaction: Transaction | MaplesTransaction ) {
    let wizard = undefined;
    if (transaction instanceof Transaction) {
      wizard = new FullTransactionHistoryDetailsWizard ();
      wizard.model.transaction = transaction;
    } else {
      wizard = new MaplesTransactionDetailsWizard ();
      let merchant = transaction.nodes.find((node) => node.type.toLowerCase() === 'merchant');
      wizard.model.transaction = transaction;
      wizard.model.amounts = (transaction.amounts) ? transaction.amounts : new MaplesTransactionAmounts();
      wizard.model.device = (transaction.device) ? transaction.device : new MaplesTransactionDevice();
      wizard.model.feeInfo = (transaction.feeInfo) ? transaction.feeInfo : new MaplesTransactionFeeInfo();
      wizard.model.request = (transaction.request) ? transaction.request : new MaplesTransactionRequest();
      wizard.model.response = (transaction.response) ? transaction.response : new MaplesTransactionResponse();
      wizard.model.settlement = (transaction.settlement) ? transaction.settlement : new MaplesTransactionSettlement();
      wizard.model.alerts = (transaction.alerts) ? transaction.alerts : new MaplesTransactionAlerts();
      wizard.model.nodes = (transaction.nodes) ? transaction.nodes : null;
      wizard.model.merchant = merchant;
    }
    this.wizardRunner.run ( wizard );
  }

  getTransactionDetails ( disputedTransaction: DisputeTransaction ) {
    this.disputeSpinner.start ();

    if (this.identifier.platform === PlatformType.SERVE) {
      this.maplesTransactionService.getTransactionDetails( this.identifier.value, disputedTransaction.sourceRefNum, <MaplesPlatform><any>this.identifier.platform )
        .pipe ( finalize ( () => {
          this.disputeSpinner.stop ();
        } ) )
        .subscribe ( ( transaction: MaplesTransaction ) => {
          this.openFullTransactionDetails ( transaction );
        } );
    } else {
      let businessDate: string = disputedTransaction.businessDate.value.getTime ().toString ();
      let platform             = this.identifier.platform;
      let requestCode          = disputedTransaction.requestCode;
      let responseCode         = disputedTransaction.responseCode;
      let deliveryChannel      = disputedTransaction.deliveryChannelCode;

      let params = new HttpParams ()
        .set ( 'businessDate', businessDate )
        .set ( RequestQueryParam.PLATFORM, platform )
        .set ( 'requestCode', requestCode )
        .set ( 'responseCode', responseCode )
        .set ( 'deliveryChannel', deliveryChannel )
        .set ( RequestQueryParam.PARTNER, this.selection.partner.type);

      this.transactionService.getTransactionDetails ( IdentifierType.CUSTOMERID, this.selection.getCustomer ().id, disputedTransaction.transactionId, params )
        .pipe ( finalize ( () => {
          this.disputeSpinner.stop ();
        } ) )
        .subscribe ( ( transaction: Transaction ) => {
          this.openFullTransactionDetails ( transaction );
        } );
    }
  }

}
