import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {MaplesFundingSource, MaplesFundingSourceActivity, MaplesTransaction} from '@cscore/maples-client-model';
import {CsCoreTableColumn} from '@cscore/components';
import {AppState} from '../../../app-state';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {Selection} from '../../../core/session/model/selection';
import {Session} from '../../../core/session/model/session';

@Component({
  selector: 'cca-account-funding-tab',
  templateUrl: './account-funding-tab.component.html'
})
export class AccountFundingTabComponent extends CcaBaseComponent implements OnInit {

  linkedBankColumns: CsCoreTableColumn<MaplesFundingSource>[] = [
    {
      key: 'id',
      label: 'ID',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.id,
    },
    {
      key: 'routingNumber',
      label: 'Routing Number',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.routingNumber,
    },
    {
      key: 'accountType',
      label: 'Account Type',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.sourceType,
    },
    {
      key: 'accountNumber',
      label: 'Account Number',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.accountNumber,
    },
    {
      key: 'bankName',
      label: 'Bank Name',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.nickName,
    },
    {
      key: 'status',
      label: 'Status',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.status,
    }
  ];
  linkedBankDataSource: MatTableDataSource<MaplesFundingSource> = new MatTableDataSource();

  linkedCardColumns: CsCoreTableColumn<MaplesFundingSource>[] = [
    {
      key: 'cardType',
      label: 'Card Type',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.sourceType,
    },
    {
      key: 'cardNumber',
      label: 'Card Number',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.accountNumber,
    },
    {
      key: 'cardNickname',
      label: 'Card Nickname',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.nickName,
    },
    {
      key: 'expirationDate',
      label: 'Expiration Date',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.expirationDate,
    },
    {
      key: 'backupFundingSource',
      label: 'Backup Funding Source',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.backupFundingSource && fundingSource.backupFundingSource === 'true' ? 'Yes' : 'No',
    },
    {
      key: 'dmaSubStatus',
      label: 'DMA Sub-Status',
      getValue: (fundingSource: MaplesFundingSource) => 'MISSING DATA',
    },
    {
      key: 'status',
      label: 'Status',
      getValue: (fundingSource: MaplesFundingSource) => fundingSource.status,
    }
  ];
  linkedCardDataSource: MatTableDataSource<MaplesFundingSource> = new MatTableDataSource();

  @ViewChild(MatPaginator) fundingActivityPaginator: MatPaginator;
  fundingActivityColumns: CsCoreTableColumn<MaplesFundingSourceActivity>[] = [
    {
      key: 'caret',
      label: '',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => undefined,
      disableSort: true
    },
    {
      key: 'accountType',
      label: 'Account Type',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.accountType,
    },
    {
      key: 'cardType',
      label: 'Card Type',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.cardType,
    },
    {
      key: 'last4',
      label: 'Last 4',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.last4,
    },
    {
      key: 'linkedDate',
      label: 'Linked Date',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.linkedDate && fundingSourceActivity.linkedDate.displayValue,
    },
    {
      key: 'svcType',
      label: 'SVC Type',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.svcType,
    },
    {
      key: 'avsResponse',
      label: 'Address Response',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.avsResponse,
    },
    {
      key: 'securityCodeResponse',
      label: 'Security Code Response',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.securityCodeResponse,
    },
    {
      key: 'message',
      label: 'Message',
      getValue: (fundingSourceActivity: MaplesFundingSourceActivity) => fundingSourceActivity.message,
    }
  ];
  fundingActivityDataSource: MatTableDataSource<MaplesFundingSourceActivity> = new MatTableDataSource();

  selection: Selection<any>;
  private session: Session;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.fundingActivityDataSource.paginator = this.fundingActivityPaginator;
    this.fundingActivityDataSource.sortingDataAccessor = (fundingSourceActivity: MaplesFundingSourceActivity, property: string) => {
      let sortValue: any;

      switch (property) {
        case 'linkedDate':
          sortValue = fundingSourceActivity.linkedDate ? fundingSourceActivity.linkedDate.getAsMilliseconds() : null;
          break;
        default:
          sortValue = fundingSourceActivity[property];
          break;
      }

      return sortValue;
    };

    this.subscribeToSessionState();
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.selection = state.selection;
            this.session   = state.session;
          }

          if (state && state.selection && state.selection.getCustomerAccount()) {
            this.fundingActivityDataSource.data = state.selection.getCustomerAccount().fundingSourceActivities;

            if (state.selection.getCustomerAccount().customer) {
              this.linkedBankDataSource.data = state.selection.getCustomerAccount().customer.fundingSources.filter((fundingSource: MaplesFundingSource) => {
                return fundingSource.sourceType === 'DIRECT_DEPOSIT' || fundingSource.sourceType === 'Bank';
              });
              this.linkedCardDataSource.data = state.selection.getCustomerAccount().customer.fundingSources.filter((fundingSource: MaplesFundingSource) => {
                return fundingSource.sourceType === 'DEBIT';
              });
            } else {
              this.linkedBankDataSource.data = [];
              this.linkedCardDataSource.data = [];
            }
          } else {
            this.linkedBankDataSource.data = [];
            this.linkedCardDataSource.data = [];
            this.fundingActivityDataSource.data = [];
          }
        })
    );
  }
}
