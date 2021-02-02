import {Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {MaplesPlatform, MaplesTransaction, MaplesTransactionType} from '@cscore/maples-client-model';
import {Selection} from '../../../../../core/session/model/selection';
import {SpinnerComponent} from '../../../../../core/spinner/spinner.component';
import {MaplesTransactionService} from '../../../../../core/transaction/maples-transaction.service';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {
  SetSelectionMaplesTransactionDetailAction,
  SetSelectionTransactionSearchRequestAction
} from '../../../../../core/session/action/session-actions';
import {AppState} from '../../../../../app-state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'cca-maples-transaction-detail',
  templateUrl: './maples-transaction-history-detail.component.html',
  styleUrls: ['./maples-transaction-history-detail.component.scss']
})
export class MaplesTransactionHistoryDetailComponent {

  @Input()
  selection: Selection<any>;
  @Input()
  transaction: MaplesTransaction;
  @Input()
  expanded: boolean = false;

  @ViewChild('detailSpinner')
  detailSpinner: SpinnerComponent;
  preauthTransaction: MaplesTransaction;
  transactionLoaded: boolean = false;
  showTransactionDetail: boolean = false;

  constructor(private transactionService: MaplesTransactionService,
              private toastFactory: ToastFactory,
              private store: Store<AppState>) {
  }

  /**
   * Listen for the details to be expanded before rendering children.  Rendering children prompts requests for detail data.
   * Once expanded the first time, always show.
   *
   * @param simpleChanges
   */
  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['expanded']) {
      this.showTransactionDetail = this.showTransactionDetail || simpleChanges['expanded'].currentValue;

      // Details now updates the session.  Only load details once and remember it to prevent a loop.
      if (!this.transactionLoaded && this.showTransactionDetail && !this.transaction['detailsLoaded']) {
        this.getTransactionDetails();
      }
    }
  }

  getTransactionDetails(): void {
    let transactionId: string = (this.selection.getMaplesPlatform() === MaplesPlatform.SERVE)
        ? this.transaction.sourceRefNum
        : this.transaction.id;


    if (!transactionId) {
      this.toastFactory.error('The transaction id does not exist.');
      return;
    }

    this.detailSpinner.start();

    this.transactionService.getTransactionDetails(this.selection.getCustomerAccount().id, transactionId, this.selection.getMaplesPlatform())
      .pipe(finalize(() => {
        this.detailSpinner.stop();
        this.transactionLoaded = true;
      }))
      .subscribe((transaction: MaplesTransaction) => {
        // Adding missing fields found in the transaction array to transaction details
        transaction.id = this.transaction.id;
        transaction.status = this.transaction.status;
        this.transaction.amounts.partialAuth = transaction.amounts.partialAuth;
        transaction.amounts = this.transaction.amounts;
        transaction.description = this.transaction.description;
        transaction.sourceRefNum = this.transaction.sourceRefNum;
        transaction.createDate = this.transaction.createDate;
        transaction.transactionDate = this.transaction.transactionDate;
        transaction.identifiers.accountIdentifier = this.transaction.identifiers.accountIdentifier;
        transaction.identifiers.cardNumber = this.transaction.identifiers.cardNumber;
        transaction['detailsLoaded'] = true;
        this.transaction = transaction;
        this.store.dispatch(new SetSelectionMaplesTransactionDetailAction(this.selection, this.transaction));
      });
     if( this.selection.transactionRequests.maplesCurrent.filters.accountType === MaplesTransactionType.PREAUTH) {
       this.transactionService.getPreAuthTransactionDetails(this.selection.getCustomerAccount().id, transactionId, this.selection.getMaplesPlatform())
         .pipe(finalize (() => {

           this.detailSpinner.stop();
           this.transactionLoaded = true
         }))
         .subscribe((preauthTransaction: MaplesTransaction) => {
           this.preauthTransaction = preauthTransaction;
         });
     }
  }
}
