import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  MaplesAccount,
  MaplesAccountBalance,
  MaplesAccountBalances,
  MaplesRelatedAccountBalance
} from '@cscore/maples-client-model';
import {AppState} from 'src/app/app-state';
import {AbstractSelectionAwareComponent} from '../../../abstract-selection-aware/abstract-selection-aware.component';
import {DetailTabType} from '../../../detail-tab-type.enum';
import {SetSelectionSelectedTabAction} from '../../../../core/session/action/session-actions';
import {scrollToElementById} from '../../../../core/utils/scroll-to-element-by-id';

@Component({
  selector: 'cca-customer-account-balance-section',
  templateUrl: './customer-account-balance-section.component.html',
  styleUrls: ['./customer-account-balance-section.component.scss'],
})
export class CustomerAccountBalanceSectionComponent extends AbstractSelectionAwareComponent<MaplesAccount> implements OnInit {
  constructor(store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    super.init();
  }

  get masterBalance(): MaplesAccountBalances {
    return this.account.getCurrentBalance();
  }

  get currentBalance(): MaplesAccountBalance {
    return this.masterBalance && this.masterBalance.balance.find(balance => balance.type === 'CURRENT');
  }

  get totalBalance(): MaplesAccountBalance {
    return this.masterBalance && this.masterBalance.balance.find(balance => balance.type === 'TOTAL');
  }

  get pendingBalance(): MaplesAccountBalance {
    return this.masterBalance && this.masterBalance.balance.find(balance => balance.type === 'PENDING');
  }

  get availableBalance(): MaplesAccountBalance {
    return this.masterBalance && this.masterBalance.balance.find(balance => balance.type === 'AVAILABLE');
  }

  get totalReserveBalance(): MaplesRelatedAccountBalance | null {
    let balance;
    const reserveAccount = this.selection.getCustomerAccount().reserveAccounts ? this.selection.getCustomerAccount().reserveAccounts[0] : null;
    if (reserveAccount) {
      balance = reserveAccount.balance ? reserveAccount.balance.filter((balance: MaplesRelatedAccountBalance) => balance.type === 'TOTAL') : null;
    }
    return balance && balance[0];
  }

  get cashbackEarnedBalance(): string {
    try {
      return this.selection.getCustomerAccount().getBalanceType('REWARDS_EARNED', 'AVAILABLE').amount.displayValue;
    } catch (error) {
      return undefined;
    }
  }

  get cashbackRedeemedBalance(): string {
    try {
      return this.selection.getCustomerAccount().getBalanceType('REWARDS_REDEEMED', 'AVAILABLE').amount.displayValue;
    } catch (error) {
      return undefined;
    }
  }

  openRelatedAccountsTab() {
    this.selection.selectedTab = DetailTabType.RELATED_ACCOUNTS;
    this.store.dispatch(new SetSelectionSelectedTabAction(this.selection));
    setTimeout(() => {
      scrollToElementById('reserve-accounts-section', {block: 'end'});
    }, 50);
  }

  private get account(): MaplesAccount {
    return this.selection.getCustomerAccount();
  }
}
