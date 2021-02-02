import {Component, OnInit} from '@angular/core';
import {DetailTabType, getDetailTabTypeDisplayValue} from "../detail-tab-type.enum";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {CcaBaseComponent} from "../../core/cca-base-component";
import {AppStateType} from "../../app-state-type.enum";
import {SessionState} from "../../core/session/session-state";
import {Selection, SelectionDataType} from "../../core/session/model/selection";
import {SelectionType} from "../../core/session/model/selection-type.enum";
import {PlatformType} from '../../core/platform/platform-type.enum';
import {SetSelectionSelectedTabAction} from "../../core/session/action/session-actions";
import {MaplesPlatform} from '@cscore/maples-client-model';

@Component({
  selector: 'cca-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss']
})
export class DetailsPanelComponent extends CcaBaseComponent implements OnInit {

  selection: Selection<SelectionDataType>;
  tabs: Tab[] = [];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
  }

  selectTab(tab: Tab): void {
    this.selection.selectedTab = tab.value;
    this.store.dispatch(new SetSelectionSelectedTabAction(this.selection));
  }

  private buildTab(type: DetailTabType): void {
    let tab          = new Tab();
    tab.value        = type;
    tab.displayValue = getDetailTabTypeDisplayValue(type);
    this.tabs.push(tab);
  }

  private buildTabs (): void {
    this.tabs = [];

    // The first tab depends on selection type
    if (this.selection.type === SelectionType.ORDER) {
      this.buildTab(DetailTabType.ORDER_ITEMS);
    } else if (this.selection.type !== SelectionType.CUSTOMER_ACCOUNT && this.selection.type !== SelectionType.MAPLES_CUSTOMER) {
      this.buildTab(DetailTabType.TRANSACTION_HISTORY);
    } else if (this.selection.type === SelectionType.CUSTOMER_ACCOUNT) {
      this.buildTab(DetailTabType.MAPLES_TRANSACTION_HISTORY);
    }

    // Second tab should always be Comments
    this.buildTab(DetailTabType.COMMENTS);

    // The rest go alphabetically, and depend on various factors (but we can't just use orderBy, due to tabs 1 and 2 above...)

    if (this.selection.platform === PlatformType.GREENCARD) {
      this.buildTab(DetailTabType.ACCOUNT_HISTORY);
    }

    if (this.selection.type === SelectionType.CUSTOMER) {
      if (this.selection.platform === PlatformType.CCL
          || (this.selection.platform === PlatformType.VMS && this.selection.getCustomer()
            && (!this.selection.getCustomer().isVmsGiftCard || this.selection.getCustomer().relatedAccounts.length))) {
        this.buildTab(DetailTabType.ACCOUNT_HOLDER);
      }

      if (this.selection.platform === PlatformType.VMS) {
        this.buildTab(DetailTabType.ALERTS);
      }

      this.buildTab(DetailTabType.CARDS);

      if (this.selection.platform === PlatformType.VMS) {
        this.buildTab(DetailTabType.DOCUMENTS);
      }

      this.buildTab(DetailTabType.FEES);
      this.buildTab(DetailTabType.LIMITS);

      if (this.selection.platform === PlatformType.VMS) {
        this.buildTab(DetailTabType.MOBILE_WALLET);
      }
    }

    if (this.selection.type === SelectionType.CUSTOMER_ACCOUNT) {
      this.buildTab(DetailTabType.ACCOUNT_HOLDER);
      this.buildTab(DetailTabType.ACCOUNT_ALERTS);
      this.buildTab(DetailTabType.CARDS);
      this.buildTab(DetailTabType.ACCOUNT_DOCUMENTS);
      // TODO: Add back after Serve Fixes this.buildTab(DetailTabType.ACCOUNT_FEES);
      this.buildTab(DetailTabType.ACCOUNT_FUNDING);
      this.buildTab(DetailTabType.ACCOUNT_LIMITS);
      this.buildTab(DetailTabType.ACCOUNT_NOTIFICATIONS);
      this.buildTab(DetailTabType.ACCOUNT_STATUS_CODES);
      this.buildTab(DetailTabType.RELATED_ACCOUNTS);
    }

    if (this.selection.type === SelectionType.LOCATION) {
      this.buildTab(DetailTabType.CONTACTS);
      this.buildTab(DetailTabType.LOCATION_TERMINALS);
    }

    if (this.selection.type === SelectionType.MAPLES_CUSTOMER) {
      this.buildTab(DetailTabType.CUSTOMER_ORDERS);
      this.buildTab(DetailTabType.RELATED_CASES);
    }

    if (this.selection.type === SelectionType.ORDER && this.selection.getMaplesPlatform() === MaplesPlatform.ALDER) {
      this.buildTab(DetailTabType.ORDER_DELIVERIES);
      this.buildTab(DetailTabType.ORDER_CONFIGURATIONS);
    } else if (this.selection.type === SelectionType.ORDER) {
      this.buildTab(DetailTabType.ORDER_DELIVERIES);
      this.buildTab(DetailTabType.RELATED_JOBS);
      this.buildTab(DetailTabType.ORDER_NOTIFICATIONS);
      this.buildTab(DetailTabType.ORDER_PROCESSING_HISTORY);
    }
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          this.selection = state.selection;
          if (this.selection) {
            this.buildTabs();
          }
        })
    );
  }
}

export class Tab {
  displayValue: string;
  value: DetailTabType;
}
