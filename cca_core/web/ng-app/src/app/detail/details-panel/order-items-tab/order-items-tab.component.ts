import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {finalize} from 'rxjs/operators';
import * as _ from 'lodash';
import {MaplesOrderItem, MaplesOrderItemCard, MaplesPartner} from '@cscore/maples-client-model';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {AppState} from '../../../app-state';
import {Selection} from '../../../core/session/model/selection';
import {OrderItemsService} from './order-items.service';
import {CardStatusResponseValue} from './card-status-response-value';
import {SearchTypeType} from '../../../core/search/search-type/search-type-type.enum';
import {SearchTypeContainer} from '../../../core/search/search-type-container';
import {SearchState} from '../../../core/search/search-state';
import {snapshot} from '../../../core/store-utils/store-utils';
import {Workflow} from '../../../core/workflow/workflow.service';
import {PlatformType} from '../../../core/platform/platform-type.enum';
import {Partner} from '../../../core/session/selection/partner';
import {SearchParameterValueType} from '../../../core/search/search-type/search-parameter-value-type.enum';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {CloseCardsOnOrderWizard} from '../../selection-action-toolbar/close-cards-on-order-wizard/close-cards-on-order-wizard';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {Permission} from '../../../core/auth/permission';
import {SecurityService} from '../../../core/security/security.service';
import {PropertyService} from '../../../core/config/property.service';
import {BulkChangeCardStatusWizard} from '../../selection-action-toolbar/bulk-change-card-status-wizard/bulk-change-card-status-wizard';
import {Customer} from '../../../core/customer/customer';
import {CustomerSearchService} from '../../../core/search/customer-search.service';
import {CsCoreStatusType} from '../../../core/model/cs-core-status';
import {ToastFactory} from '../../../toast/toast-factory.service';
import {ToastDuration} from '../../../toast/toast-duration.enum';
import {RefundOrderActionWizard} from '../../selection-action-toolbar/refund-order-action-wizard/refund-order-action-wizard';
import {OrderRelatedJobView} from '../../../core/order/order-related-job-view';

@Component({
  selector: 'cca-order-items-tab',
  templateUrl: './order-items-tab.component.html',
  styleUrls: ['./order-items-tab.component.scss']
})
export class OrderItemsTabComponent extends CcaBaseComponent implements OnInit {

  bulkActionsButtonTooltip: string;
  bulkCloseCardsButtonTooltip: string;
  bulkChangeStatusButtonTooltip: string;
  refundOrderButtonTooltip: string;
  cancellationJobRunningForSelectedCards: boolean = false;
  dataSource: MatTableDataSource<MaplesOrderItemCard>   = new MatTableDataSource<MaplesOrderItemCard>();
  // displayedColumns: string[]                      = ['isSelected', 'serialNumber', 'proxyNumber', 'name', 'email', 'status', 'value', 'purchaseFee', 'balance'];
  displayedColumns: string[];
  filterControl                                   = new FormControl();
  hasVMSPermission: boolean                       = false;
  isBulkActionsAllowed: boolean                   = false;
  isCardsSelected: boolean                        = false;
  isCloseCardsEnabled: boolean                    = false;
  isChangeStatusEnabled: boolean                  = false;
  isMissingSerialNumbers: boolean                 = false;
  isOldOrder: boolean                             = false;
  isAlreadyRefunded: boolean                      = false;
  isSelectAllChecked: boolean                     = false;
  MaplesPartner                                   = MaplesPartner;
  orderItems: MaplesOrderItem[]                         = [];
  platform: PlatformType;
  selection: Selection<any>;
  selectedOrderFlag: boolean                    = false;

  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChildren('orderItemSpinner')
  orderItemSpinners: QueryList<SpinnerComponent>;
  @ViewChildren('orderItemProxySpinner')
  orderItemProxySpinners: QueryList<SpinnerComponent>;
  @ViewChildren('serialNumberSpinner')
  serialNumberSpinner: QueryList<SpinnerComponent>;
  @ViewChildren('proxyNumberSpinner')
  proxyNumberSpinner: QueryList<SpinnerComponent>;

  constructor(private store: Store<AppState>,
              private customerSearchService: CustomerSearchService,
              private orderItemService: OrderItemsService,
              private propertyService: PropertyService,
              private securityService: SecurityService,
              private toastFactory: ToastFactory,
              private wizardRunner: WizardRunner,
              private workflow: Workflow) {
    super();
  }

  ngOnChanges(): void {
    this.setBulkActionsAllowedFlag();
  }

  ngOnInit() {
    this.dataSource.sort            = this.sort;
    this.dataSource.paginator       = this.paginator;
    this.subscribeToSessionState();
    this.filterInit();
    this.setPermissionFlags();
    this.resetSelected();
    this.setBulkActionsAllowedFlag();
    this.setVMSPermissionFlag();
  }

  filterInit(): void {
    if (this.selection.platform && this.selection.platform !== PlatformType.ALDER) {
      this.sort.disableClear          = true;
      this.dataSource.filterPredicate = (orderItemCard: MaplesOrderItemCard, filterValue: string) => {
        if (filterValue) {
          filterValue = filterValue.toLowerCase();
        }
        return orderItemCard.serialNumber && orderItemCard.serialNumber.toString().indexOf(filterValue) !== -1
          || (orderItemCard.cardNumber && orderItemCard.cardNumber.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.parentItem.name && orderItemCard.parentItem.name.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.shipment && orderItemCard.shipment.id && orderItemCard.shipment.id.toString().indexOf(filterValue) !== -1)
          || (orderItemCard.shipment && orderItemCard.shipment.recipient && orderItemCard.shipment.recipient.emailAddress && orderItemCard.shipment.recipient.emailAddress.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.status && orderItemCard.status.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.parentItem.initialValue && orderItemCard.parentItem.initialValue.displayValue.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.parentItem.totals && orderItemCard.parentItem.totals.purchaseFees && orderItemCard.parentItem.totals.purchaseFees.displayValue.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.parentItem.totals && orderItemCard.parentItem.totals.handlingFees && orderItemCard.parentItem.totals.handlingFees.displayValue.toLowerCase().indexOf(filterValue) !== -1)
          || (orderItemCard.availableBalance && orderItemCard.availableBalance.displayValue && orderItemCard.availableBalance.displayValue.toLowerCase().indexOf(filterValue) !== -1);
      };

      this.dataSource.sortingDataAccessor = (item, property) => {
        let sortValue: any;

        switch (property) {
          case 'serialNumber':
            sortValue = item.serialNumber ? item.serialNumber : null;
            break;
          case 'proxyNumber':
            sortValue = item.cardNumber ? item.cardNumber : null;
            break;
          case 'name':
            sortValue = item.parentItem.name ? item.parentItem.name.toLowerCase() : null;
            break;
          case 'email':
            const digital: boolean = item.parentItem && item.parentItem.productType && item.parentItem.productType.toLowerCase().indexOf('digital') >= 0;
            sortValue = digital && item.shipment && item.shipment.recipient && item.shipment.recipient.emailAddress ? item.shipment.recipient.emailAddress.toLowerCase() : null;
            break;
          case 'status':
            sortValue = item.status ? item.status.toLowerCase() : null;
            break;
          case 'value':
            sortValue = item.parentItem.initialValue ? item.parentItem.initialValue.value : null;
            break;
          case 'purchaseFees':
            let purchaseFees = (item.parentItem.totals
              && item.parentItem.totals.purchaseFees) ? item.parentItem.totals.purchaseFees : null;
            sortValue        = purchaseFees ? purchaseFees.value : null;
            break;
          case 'handlingFees':
            let handlingFees = (item.parentItem.totals
              && item.parentItem.totals.handlingFees) ? item.parentItem.totals.handlingFees : null;
            sortValue        = handlingFees ? handlingFees.value : null;
            break;
          case 'balance':
            sortValue = item.availableBalance ? item.availableBalance.value : null;
            break;
          default:
            sortValue = item[property];
            break;
        }
        return sortValue;
      };
    }
  }



  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter(): void {
    this.filterControl.setValue('');
    this.applyFilter('');
    this.selectedOrderFlag = false;
  }

  clearSelectedCards() {
    this.dataSource.data.forEach(card => {
      if (card.isSelected) {
        card.isSelected = !card.isSelected;
      }
    });
    this.isCardsSelected = false;
  }

  filterCardItems(item: MaplesOrderItem): void {
    this.filterControl.setValue(item.name);
    this.applyFilter(item.name);
    this.selectedOrderFlag = true;
  }

  findStatus(card: MaplesOrderItemCard): void {
    if (card.serialNumber) {
      const spinner = this.findOrderItemSpinners(card.serialNumber);
      spinner.start();
      this.orderItemService.findStatus(card.serialNumber)
        .pipe(finalize(() => spinner.stop()))
        .subscribe((data: CardStatusResponseValue) => {
          card.status           = data.status;
          card.availableBalance = data.availableBalance;
        });
    }
  }

  findStatusByProxy(card: MaplesOrderItemCard): void {
    const spinner = this.findOrderItemProxySpinners(card.cardNumber);
    spinner.start();
    let searchTypeContainer = this.getSearchTypeContainer();
    searchTypeContainer.clear();
    searchTypeContainer.parameters.set(SearchParameterValueType.PARTNER, Partner.INCOMM);
    searchTypeContainer.parameters.set(SearchParameterValueType.PLATFORM, PlatformType.VMS);
    searchTypeContainer.parameters.set(SearchParameterValueType.PROXY_NUMBER, card.cardNumber);
    this.customerSearchService.search(searchTypeContainer)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((customer: Customer[]) => {
        if (customer.length === 1) {
          if (customer.length === 1 && customer[0].getPrimaryCard().getStatusByType(CsCoreStatusType.PLATFORM).name) {
            card.status = customer[0].getPrimaryCard().getStatusByType(CsCoreStatusType.PLATFORM).name;
          } else {
            card.status = null;
            this.toastFactory.warn('We were unable to retrieve a status for this card.', null, ToastDuration.DEFAULT);
          }
          if (customer.length === 1 && customer[0].accounts && customer[0].accounts.spending.availableBalance) {
            card.availableBalance = customer[0].accounts.spending.availableBalance;
          } else {
            card.availableBalance = null;
            this.toastFactory.warn('We were unable to retrieve an available balance for this card.', null, ToastDuration.DEFAULT);
          }
        } else {
          this.toastFactory.warn('We were unable to retrieve information for this card.', null, ToastDuration.DEFAULT);
        }
      });
  }

  openBulkChangeStatusWizard() {
    let wizard             = new BulkChangeCardStatusWizard();
    wizard.model.selection = this.selection;
    if (this.isSelectAllChecked) {
      wizard.model.cards = this.dataSource.data;
    } else {
      wizard.model.cards = this.findSelectedCards();
    }
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe(() => this.resetSelected());
  }

  openCloseCardWizard() {
    let wizard             = new CloseCardsOnOrderWizard();
    wizard.model.selection = this.selection;
    if (this.isSelectAllChecked) {
      wizard.model.cards = this.dataSource.data;
    } else {
      wizard.model.cards = this.findSelectedCards();
    }
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe(() => this.resetSelected());
  }

  openRefundOrderWizard(): void {
    let cards: MaplesOrderItemCard[] = this.findSelectedCards();

    let wizard             = new RefundOrderActionWizard();
    wizard.model.selection = this.selection;
    wizard.model.order     = this.selection.getOrder();
    wizard.model.orderId   = this.selection.getOrder().id;
    wizard.model.cards     = cards;
    wizard.model.request.items = [];
    for (let card of cards) {
      wizard.model.request.items.push(card.id);
    }
    this.wizardRunner.run(wizard);
  }

  linkToSerialNumber(serialNumber: string): void {
    let spinner = this.findSerialNumberSpinners(serialNumber);
    spinner.start();
    // Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer();
    searchTypeContainer.clear();
    searchTypeContainer.parameters.set(SearchParameterValueType.PARTNER, Partner.INCOMM);
    searchTypeContainer.parameters.set(SearchParameterValueType.PLATFORM, PlatformType.VMS);
    searchTypeContainer.parameters.set(SearchParameterValueType.SERIAL_NUMBER, serialNumber);
    this.workflow.forwardingSearch(searchTypeContainer, true)
      .subscribe(() => {
        spinner.stop();
      });
  }

  linkToProxyNumber(proxyNumber: string): void {
    let spinner = this.findProxyNumberSpinners(proxyNumber);
    spinner.start();
    // Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer();
    searchTypeContainer.clear();
    searchTypeContainer.parameters.set(SearchParameterValueType.PARTNER, Partner.INCOMM);
    searchTypeContainer.parameters.set(SearchParameterValueType.PLATFORM, PlatformType.VMS);
    searchTypeContainer.parameters.set(SearchParameterValueType.PROXY_NUMBER, proxyNumber);
    this.workflow.forwardingSearch(searchTypeContainer, true)
      .subscribe(() => {
        spinner.stop();
      });
  }

  setPermissionFlags() {
    this.isCloseCardsEnabled   = this.securityService.hasPermission(Permission.CANCEL_ORDER_WITH_REFUND);
    this.isChangeStatusEnabled = this.securityService.hasPermission(Permission.BULK_CHANGE_CARD_STATUS);
    if (!this.isCloseCardsEnabled) {
      this.bulkCloseCardsButtonTooltip = 'You don\'t have permission to perform this action';
    }
    if (!this.isChangeStatusEnabled) {
      this.bulkChangeStatusButtonTooltip = 'You don\'t have permission to perform this action';
    }
  }

  setVMSPermissionFlag() {
    this.hasVMSPermission = this.securityService.hasPermission(Permission.SEARCH_BY_VMS_GIFT);
  }

  resetSelected(): void {
    this.isSelectAllChecked ? this.toggleSelectAll() : this.clearSelectedCards();
  }

  setSelectAllTooltip(): string {
    if (this.isMissingSerialNumbers) {
      return 'One or more cards is not eligible for Bulk Actions';
    } else {
      return this.isSelectAllChecked ? 'Deselect All' : 'Select All';
    }
  }

  setTooltip(card: MaplesOrderItemCard): string {
    return !card.isSelected ? 'Select' : 'Deselect';
  }

  toggleSelectAll(): void {
    this.isSelectAllChecked = !this.isSelectAllChecked;
    if (!this.isSelectAllChecked) {
      this.clearSelectedCards();
      this.isCardsSelected = false;
    } else {
      this.isCardsSelected = true;
    }
    this.setBulkActionsTooltip();
  }

  toggleSelectedCard(card: MaplesOrderItemCard): void {
    card.isSelected      = !card.isSelected;
    this.isCardsSelected = this.findSelectedCards().length > 0;
    this.setBulkActionsTooltip();
  }

  private setBulkActionsAllowedFlag(): void {
    this.isBulkActionsAllowed                   = this.isBulkActionAllowedByPartnerAndPlatform();
    this.cancellationJobRunningForSelectedCards = this.isCancellationJobRunningForSelectedCards();
    this.setBulkActionsTooltip();
  }

  private isBulkActionAllowedByPartnerAndPlatform() {
    return (this.selection.platform === PlatformType.ECOMM) || (this.selection.platform === PlatformType.BOL && (this.selection.simplePartner === MaplesPartner.VANILLA || this.selection.simplePartner === MaplesPartner.AXBOL || this.selection.simplePartner === MaplesPartner.MBOL));
  }

  private setBulkActionsTooltip(): void {
    if (!this.isBulkActionsAllowed) {
      this.bulkActionsButtonTooltip = 'No Bulk Actions Available';
    } else if (!this.isCardsSelected) {
      this.bulkActionsButtonTooltip = 'No Transactions Selected';
    } else {
      let cardCount                 = this.isSelectAllChecked ? 'All' : this.findSelectedCards().length;
      this.bulkActionsButtonTooltip = `Bulk Actions (${cardCount})`;

      if (this.cancellationJobRunningForSelectedCards) {
        this.bulkCloseCardsButtonTooltip = 'Please wait for the current job to complete';
      }
    }
  }

  private isCancellationJobRunningForSelectedCards(): boolean {
    if (this.selection && this.selection.relatedJobs && this.selection.relatedJobs.length) {
      return !!_.find(this.selection.relatedJobs, (cancellationTask: OrderRelatedJobView) => {
        return !cancellationTask.isJobComplete;
      });
    }
  }

  private findOrderItemProxySpinners(id: string): SpinnerComponent {
    return this.orderItemProxySpinners.toArray().find(spinner => spinner.id === id);
  }

  private findOrderItemSpinners(id: string): SpinnerComponent {
    return this.orderItemSpinners.toArray().find(spinner => spinner.id === id);
  }

  private findSelectedCards(): MaplesOrderItemCard[] {
    let cards = [];

    this.isOldOrder = false;
    this.isAlreadyRefunded = false;
    this.isMissingSerialNumbers = false;
    this.dataSource.data.forEach(card => {
      if (card.isSelected) {
        cards.push(card);
        if (!card.serialNumber) {
          this.isMissingSerialNumbers = true;
        }
        if (!card.bifReference) {
          this.isOldOrder = true;
        }
        //Add null check
        if (card.paymentStatus && card.paymentStatus.name.toLowerCase().indexOf('refund') !== -1) {
          this.isAlreadyRefunded = true;
        }
      }
    });

    this.refundOrderButtonTooltip = 'Refund Cards';
    if (this.isAlreadyRefunded) {
      this.refundOrderButtonTooltip = 'One or more cards are already refunded';
    } else if (this.isOldOrder) {
      this.refundOrderButtonTooltip = 'Old orders cannot be item level refunded';
    }

    return cards;
  }

  private findSerialNumberSpinners(id: string): SpinnerComponent {
    return this.serialNumberSpinner.toArray().find(spinner => spinner.id === id);
  }

  private findProxyNumberSpinners(id: string): SpinnerComponent {
    return this.proxyNumberSpinner.toArray().find(spinner => spinner.id === id);
  }

  private getSearchTypeContainer(): SearchTypeContainer {
    let searchState: SearchState = snapshot(this.store, AppStateType.SEARCH_STATE);
    return _.cloneDeep(_.find(searchState.searchTypeContainers, (searchTypeContainer: SearchTypeContainer) => {
      return searchTypeContainer.searchType.type === SearchTypeType.VMS_GIFT;
    }));
  }

  private setDisplayedColumns(): void {
    if (this.selection && this.selection.platform !== PlatformType.ALDER) {
      this.displayedColumns = ['isSelected', 'serialNumber', 'proxyNumber', 'name', 'email', 'status', 'value', 'purchaseFee', 'handlingFee','balance'];
    } else if (this.selection && this.selection.platform === PlatformType.ALDER) {
      this.displayedColumns = ['serialNumber', 'proxyNumber', 'name', 'email', 'status', 'value', 'purchaseFee', 'balance'];
    }
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;

            if (this.selection && this.selection.getOrder()) {
              this.platform   = this.selection.platform;
              this.orderItems = this.selection.orderItems;
              this.dataSource.data = this.selection.getAllCardsInOrder();
            } else {
              this.orderItems = [];
              this.dataSource.data = [];
            }

            if (this.selection && this.selection.platform != null) {
              this.setBulkActionsAllowedFlag();
              this.setDisplayedColumns();
            }
          }
        })
    );
  }
}
