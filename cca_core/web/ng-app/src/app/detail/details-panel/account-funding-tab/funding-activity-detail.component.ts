import {Component, Input, OnChanges, SimpleChanges, ViewChild, ViewRef} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {
  MaplesFundingSourceActivity,
  MaplesTransaction,
  MaplesTransactionCode,
  MaplesTransactionQuery,
  MaplesTransactionQueryFilter
} from '@cscore/maples-client-model';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {MaplesTransactionService} from '../../../core/transaction/maples-transaction.service';
import {Selection} from '../../../core/session/model/selection';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {Logger} from '../../../logging/logger.service';

@Component({
  selector: 'cca-funding-activity-detail',
  templateUrl: './funding-activity-detail.component.html'
})
export class FundingActivityDetailComponent extends CcaBaseComponent implements OnChanges {

  @Input()
  fundingActivity: MaplesFundingSourceActivity;
  @Input()
  selection: Selection<any>;
  @Input()
  expanded: boolean = false;

  @ViewChild('detailSpinner')
  detailSpinner: SpinnerComponent;

  showDetail: boolean = false;

  constructor(private maplesTransactionService: MaplesTransactionService,
              private logger: Logger) {
    super();
  }

  /**
   * If expanding for the first time, fetch the funding details.
   *
   * @param simpleChanges
   */
  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['expanded']) {
      this.showDetail = this.showDetail || simpleChanges['expanded'].currentValue;

      // Details now updates the session.  Only load details once and remember it to prevent a loop.
      if (this.showDetail && !this.fundingActivity['fundingActivityDetail']) {
        this.getFundingActivityDetail();
      }
    }
  }

  getCode(type: string): string {
    if (this.fundingActivity && this.fundingActivity['fundingActivityDetail']) {
      const code: MaplesTransactionCode = this.fundingActivity['fundingActivityDetail'].codes.find(
        (item: MaplesTransactionCode) =>  item.type === type
      );
      return code ? code.description : null;
    } else {
      return null;
    }
  }

  /**
   * Create the transaction query and make the search request expecting a single result.
   */
  getFundingActivityDetail(): void {
    if (!this.fundingActivity['fundingActivityDetail']) {
      this.detailSpinner.start();

      let query: MaplesTransactionQuery = new MaplesTransactionQuery();
      query.identifiers = [
        {
          type: 'account_id',
          id: this.selection.getCustomerAccount().id
        },
        {
          type: 'funding_activity_id',
          id: this.fundingActivity.activityId.toString()
        }
      ];
      query.filters = new MaplesTransactionQueryFilter({
        accountType: 'FUNDING'
      });

      this.maplesTransactionService.search(query, this.selection.getMaplesPlatform())
        .pipe(finalize(() => {
          this.detailSpinner.stop();
        }))
        .subscribe((transactions: MaplesTransaction[]) => {
          if (transactions && transactions.length > 0) {
            this.fundingActivity['fundingActivityDetail'] = transactions[0];
          } else {
            this.logger.warn('No funding activity detail found');
          }
        });
    }
  }
}
