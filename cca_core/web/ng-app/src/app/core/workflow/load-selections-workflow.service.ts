import {Injectable} from '@angular/core';
import {forkJoin, from, Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {SessionState} from "../session/session-state";
import {snapshot} from "../store-utils/store-utils";
import {AppStateType} from "../../app-state-type.enum";
import {Session} from "../session/model/session";
import {Logger} from "../../logging/logger.service";
import {RoutingService} from "../routing/routing.service";
import {Selection, SelectionDataType} from "../session/model/selection";
import {UrlQueryParam} from "../routing/url-query-param.enum";
import {
  LoadSelectionAction,
  RemoveSelectionAction,
  SetSelectionDataAction,
  SetSelectionFailedAction,
  SetSelectionSelectedTabAction,
  SetSelectionTransactionSearchRequestAction,
} from "../session/action/session-actions";
import {getSelectionTypeDisplayValue, SelectionType} from "../session/model/selection-type.enum";
import {catchError, finalize, flatMap, map, mapTo, tap} from "rxjs/operators";
import {SelectionService} from "../session/selection/selection.service";
import {AccountService} from "../account/account.service";
import {CustomerService} from "../customer/customer.service";
import {LocationService} from "../node/location/location.service";
import {OrderService} from "../order/order.service";
import {CardService} from "../card/card.service";
import {TransitionService} from "../transition/transition.service";
import {SelectionGroup} from "../dock/dock/selections-tab/selection-group";
import {SelectionGroupItem} from "../dock/dock/selections-tab/selection-group-item";
import * as _ from "lodash";
import {SetDockSelectionsTabGroupsAction} from "../dock/dock/selections-tab/dock-selections-tab-actions";
import {RoutePath} from "../routing/route-path.enum";
import {TransactionService} from "../../detail/details-panel/transaction-history-tab/transaction.service";
import {LocalStorage} from "../local-storage/local-storage.service";
import {IdentifierType} from "../session/model/identifier-type.enum";
import {CustomerAccountService} from '../customer-account/customer-account.service';
import {MaplesAccount, MaplesCustomer, MaplesOrder} from '@cscore/maples-client-model';
import {Customer} from '../customer/customer';
import {Location} from '../node/location/location';
import {PlatformType} from "../platform/platform-type.enum";
import {MaplesTransactionService} from "../transaction/maples-transaction.service";
import {MaplesCustomerService} from '../maples/maples-customer.service';
import {flatTap} from '../utils/rxjs-utils';

@Injectable({
  providedIn: 'root'
})
export class LoadSelectionsWorkflow {

  constructor(private accountService: AccountService,
              private cardService: CardService,
              private customerService: CustomerService,
              private customerAccountService: CustomerAccountService,
              private localStorage: LocalStorage,
              private locationService: LocationService,
              private logger: Logger,
              private maplesCustomerService: MaplesCustomerService,
              private orderService: OrderService,
              private routingService: RoutingService,
              private selectionService: SelectionService,
              private store: Store<AppState>,
              private maplesTransactionService: MaplesTransactionService,
              private transactionService: TransactionService,
              private transitionService: TransitionService) {
  }

  run(): Observable<Selection<SelectionDataType>> {
    this.logger.info('Begin Load Selections Workflow');
    const session: Session = this.loadSessionFromState();

    const selection = this.selectPrimarySelection(session);
    this.loadNonPrimarySelectionsDataAsync(session);
    return this.loadDataForPrimarySelection(selection)
      .pipe(
        tap(() => {
          let queryParams                                 = {};
          queryParams[UrlQueryParam.SESSION_SESSION_ID]   = session.id;
          queryParams[UrlQueryParam.SESSION_SELECTION_ID] = selection.id;

          if (selection.type === SelectionType.CUSTOMER && selection.selectedCard) {
            queryParams[UrlQueryParam.DETAILS_LAST_FOUR] = selection.selectedCard.identifiers.pan.slice(-4);
          }

          // Navigate to details if we're on the dashboard, else stay where we are
          if (this.routingService.isOn(RoutePath.DASHBOARD) || this.routingService.isOn(RoutePath.CASE_WORKSPACE)) {
            this.routingService.navigateTo(RoutePath.DETAIL, queryParams);
          } else {
            this.routingService.setQueryParams(queryParams);
          }
        }),
        finalize(() => {
          this.logger.info('End Load Selections Workflow');
        })
      );
  }

  runForSelection(selection: Selection<SelectionDataType>): Observable<boolean> {
    this.logger.info('Begin Load Selection Workflow');
    this.transitionService.on();

    // TODO: Clear Details & Session Query params

    this.store.dispatch(new LoadSelectionAction(selection));

    const primarySelection = this.getPrimarySelection();

    return this.loadDataForPrimarySelection(primarySelection)
      .pipe(
        flatMap(() => {
          return from(this.routingService.navigateToDetails());
        }),
        finalize(() => {
          this.transitionService.off();
          this.logger.info('End Load Selection Workflow');
        })
      );
  }

  refreshSelection(selection: Selection<SelectionDataType>): Observable<SelectionDataType> {
    if (selection.platform === PlatformType.SERVE) {
      this.customerAccountService.loadSecondaryAccountData(selection as Selection<MaplesAccount>).subscribe();
    }

    return this.loadPrimarySelectionData(selection)
      .pipe(
        tap((data: any) => {
          if (data) {
            selection.data = data;
            this.store.dispatch(new SetSelectionDataAction(selection));
            this.transitionService.off();
          }
      }));
  }

  /** 
   * Loads selection data and returns the selection with the loaded data in it.
   */
  loadSelectionData(selection: Selection<SelectionDataType>, skipSecondaryData: boolean = false): Observable<Selection<SelectionDataType>> {
    selection.isFailedToLoad = false;
    this.store.dispatch(new SetSelectionFailedAction(selection));

    let loadTask: Observable<SelectionDataType> = this.loadPrimarySelectionData(selection).pipe(
      catchError(() => {
        selection.isFailedToLoad = true;
        this.store.dispatch(new SetSelectionFailedAction(selection));

        // Remove the selection if it's a LOCATION with an ANI identifier
        if (selection.type === SelectionType.LOCATION) {
          let locationIdentifier = selection.getIdentifierByType(IdentifierType.ANI);
          if (locationIdentifier) {
            return this.selectionService.removeOne(selection.id)
              .pipe(map(() => {
                this.store.dispatch(new RemoveSelectionAction(selection));
                return of(null);
              }));
          }
        }
        return of(null);
      })
    );

    if (loadTask) {
      loadTask = loadTask.pipe(
        flatTap(data => this.updateSelection(selection, data)),
        tap(() => this.onPrimarySelectionDataLoaded(selection)),
      );
    } else {
      loadTask = of(null);
    }

    if (!skipSecondaryData) {
      loadTask = loadTask.pipe(flatTap(() => this.loadSecondarySelectionData(selection)));
    }

    return loadTask.pipe(mapTo(selection));
  }

  private fetchPrimarySelectionData(selection: Selection<SelectionDataType>): Observable<SelectionDataType> {
    switch (selection.type) {
      case SelectionType.ACCOUNT:
        const accountIdentifier = selection.getIdentifierByType(IdentifierType.ACCOUNT_NUMBER);
        return accountIdentifier && this.accountService.findOneByAccountNumber(accountIdentifier.value);

      case SelectionType.CUSTOMER:
        const customerIdentifier = selection.getIdentifierByType(IdentifierType.CUSTOMERID);
        return customerIdentifier && this.customerService.findOneById(customerIdentifier.value, selection.platform, selection.partner);

      case SelectionType.CUSTOMER_ACCOUNT:
        const customerAccountIdentifier = selection.getIdentifierByType(IdentifierType.ACCOUNT_ID);
        return customerAccountIdentifier && this.customerAccountService.findOneById(customerAccountIdentifier.value, selection.platform);

      case SelectionType.LOCATION:
        const locationIdentifier = selection.getIdentifierByType(IdentifierType.LOCATIONID);
        return locationIdentifier && this.locationService.findOneById(locationIdentifier.value);

      case SelectionType.MAPLES_CUSTOMER:
        const maplesCustomerIdentifier = selection.getIdentifierByType(IdentifierType.MEMBER_NUMBER);
        return maplesCustomerIdentifier && this.maplesCustomerService.findOneById(maplesCustomerIdentifier.value, selection.getMaplesPlatform());

      case SelectionType.ORDER:
        const orderIdentifier = selection.getPrimaryIdentifier();
        return orderIdentifier && this.orderService.findOneByIdentifier(orderIdentifier, selection.getMaplesPlatform(), selection.simplePartner);

      case SelectionType.CARD:
        return this.cardService.findOneFromSelection(selection);

      default:
        this.logger.error('Attempted to load data for unmapped SelectionType!');
        return of(null);
    }
  }

  private getPrimarySelection(): Selection<SelectionDataType> {
    const sessionState: SessionState = snapshot(this.store, AppStateType.SESSION_STATE);
    return sessionState.selection;
  }

  private onPrimarySelectionDataLoaded(selection: Selection<SelectionDataType>): void {
      // Set the selectedCard if it's a Customer or Account
      if (selection.type === SelectionType.CUSTOMER) {
        this.customerService.setSelectedCardForSelection(selection as Selection<Customer>);
      }
      if (selection.type === SelectionType.CUSTOMER_ACCOUNT) {
        this.customerAccountService.setSelectedCardForSelection(selection as Selection<MaplesAccount>);
      }

      // Set default transaction search request
      if (selection.type !== SelectionType.CUSTOMER_ACCOUNT) {
        this.transactionService.setDefaultRequestForSelection(selection);
      } else if (selection.type === SelectionType.CUSTOMER_ACCOUNT) {
        this.maplesTransactionService.setDefaultRequestForSelection(selection);
      }

      // Update transaction search request and selected tab from local storage
      this.localStorage.updateSelectionFromLocalStorage(selection);

      // Update state accordingly
      this.store.dispatch(new SetSelectionSelectedTabAction(selection));
      if (selection.type !== SelectionType.MAPLES_CUSTOMER) {
        this.store.dispatch(new SetSelectionTransactionSearchRequestAction(selection));
      }
  }

  private loadDataForPrimarySelection(selection: Selection<SelectionDataType>): Observable<Selection<SelectionDataType>> {
    // If we've selected a search result before, we can do the simple data load
    if (selection && !selection.data) {
      return this.loadSelectionData(selection);
    }
    // Else, we don't need to do anything
    else {
      return of(null);
    }
  }

  /**
   * Load the basic selection data (Card/Customer/Location/etc data from APLS) for any selection that:
   *  * has not yet populated its "data" field
   *  * is NOT the primary selection (we handle that one separately, because that's the only one we really need before proceeding)
   *  * is missing the selection description
   */
  private loadNonPrimarySelectionsDataAsync(session: Session): void {
    const primarySelection: Selection<SelectionDataType> = this.getPrimarySelection();

    this.updateSelectionsTabState(session);

    // Only load data for non-primary selections if they *are* non-primary, and we don't have a description yet
    const loadTasks: Observable<Selection<SelectionDataType>>[] = session.selections
      .filter(selection => !selection.data && selection.id !== primarySelection.id && !selection.description)
      .map(selection => this.loadSelectionData(selection, true));

    if (loadTasks.length) {
      forkJoin(loadTasks).subscribe();
    }
  }

  private loadPrimarySelectionData(selection: Selection<SelectionDataType>): Observable<SelectionDataType> {
    return this.fetchPrimarySelectionData(selection).pipe(
      tap((result: SelectionDataType) => {
        if (!result) {
          throw 'Failed to load selection data!';
        }
      })
    );
  }

  private loadSecondarySelectionData(selection: Selection<SelectionDataType>): Observable<void> {
    switch (selection.type) {
      case SelectionType.CUSTOMER:
        return this.customerService.loadSecondaryCustomerData(selection as Selection<Customer>);
      case SelectionType.CUSTOMER_ACCOUNT:
        return this.customerAccountService.loadSecondaryAccountData(selection as Selection<MaplesAccount>);
      case SelectionType.LOCATION:
        return this.locationService.loadSecondaryLocationData(selection as Selection<Location>);
      case SelectionType.MAPLES_CUSTOMER:
        return this.maplesCustomerService.loadSecondaryCustomerData(selection as Selection<MaplesCustomer>);
      case SelectionType.ORDER:
        return this.orderService.loadSecondaryOrderData(selection as Selection<MaplesOrder>);
      default:
        return of(null);
    }
  }

  private loadSessionFromState(): Session {
    let sessionState: SessionState = snapshot(this.store, AppStateType.SESSION_STATE);
    let session: Session           = sessionState.session;
    if (!session) {
      this.logger.error('Attempted to begin loading selections before the session was available!');
      throw new Error('Session Not Ready!');
    }
    return session;
  }

  private selectPrimarySelection(session: Session): Selection<SelectionDataType> {
    let selection: Selection<SelectionDataType>  = this.getPrimarySelection();

    // We only need to do this if the state doesn't already have a selection
    if (!selection && session.selections.length) {

      // Try to load from the selection-id query param, if present
      let selectionId = this.routingService.getQueryParam(UrlQueryParam.SESSION_SELECTION_ID);
      if (selectionId) {
        selection = session.getSelectionById(Number(selectionId));
      }

      // Next, if there is a non-LOCATION type selection, pick that
      if (!selection) {
        selection = _.findLast(session.selections, (selection: Selection<SelectionDataType>) => {
          return selection.type !== SelectionType.LOCATION;
        });
      }

      // Finally, just pick the last (newest) selection in the list
      if (!selection) {
        selection = session.selections[session.selections.length - 1];
      }

      // Store in state
      if (selection) {
        this.store.dispatch(new LoadSelectionAction(selection));
        this.routingService.setQueryParam(UrlQueryParam.SESSION_SELECTION_ID, selection.id);
      }
    }

    return selection;
  }

  private sortSelectionsIntoGroups(selections: Selection<SelectionDataType>[]): SelectionGroup[] {
    const groupedSelections = _.groupBy(selections, selection => selection.type);
    return Object.keys(groupedSelections).map((selectionType: SelectionType) => {
      const group: SelectionGroup = new SelectionGroup();
      group.type                  = selectionType;
      group.displayValue          = getSelectionTypeDisplayValue(selectionType);
      group.selections            = groupedSelections[selectionType].map(selection => new SelectionGroupItem(selection));
      return group;
    });
  }

  private updateSelection(selection: Selection<SelectionDataType>, data: any): Observable<Selection<SelectionDataType>> {
    if (data) {
      // Update the selection's data with the returned value
      selection.data = data;
      this.store.dispatch(new SetSelectionDataAction(selection));

      /*
      If the selection was missing its description on its initial load from the server, we need to update the
      record so that we don't need to load data for it a second time (until it's made the primary selection, that is).
       */
      if (selection.isMissingDescriptionOnInitialLoad) {
        return this.selectionService.updateOne(selection).pipe(
          tap((selection: Selection<SelectionDataType>) => {
            selection.isMissingDescriptionOnInitialLoad = false;
          })
        );
      } else {
        return of(selection);
      }
    } else {
      this.logger.error('Failed to load selection data!', selection);
      return of(selection); // Don't throw an error, we don't want to interrupt everything else going on
    }
  }

  private updateSelectionsTabState(session: Session): void {
    let selectionGroups: SelectionGroup[] = this.sortSelectionsIntoGroups(session.selections);
    this.store.dispatch(new SetDockSelectionsTabGroupsAction(selectionGroups));
  }
}
