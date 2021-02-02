import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionGroupItem } from "../selection-group-item";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { CcaBaseComponent } from "../../../../cca-base-component";
import { DockSelectionsTabState } from "../dock-selections-tab-state";
import { AppStateType } from "../../../../../app-state-type.enum";
import {
  SetDockSelectionsTabSelectionIsCollapsedAction,
  SetDockSelectionsTabSelectionIsSelectedAction,
  SetDockSelectionsTabSelectionPaginationPageAction
} from "../dock-selections-tab-actions";
import { SessionState } from "../../../../session/session-state";
import { Workflow } from "../../../../workflow/workflow.service";
import { SpinnerComponent } from "../../../../spinner/spinner.component";
import { finalize, map } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";
import { RoutingService } from "../../../../routing/routing.service";
import { UrlQueryParam } from "../../../../routing/url-query-param.enum";
import { SelectionType } from "../../../../session/model/selection-type.enum";
import { OrderService } from "../../../../order/order.service";
import { SpinnerSize } from "../../../../spinner/spinner-size.enum";
import { snapshot } from "../../../../store-utils/store-utils";
import * as _ from "lodash";
import { CloseDockTabAction } from "../../../action/close-dock-tab-action";
import { SecurityService } from "../../../../security/security.service";
import { Session } from "../../../../session/model/session";
import { Selection, SelectionDataType } from "../../../../session/model/selection";
import { WizardRunner } from "../../../../wizard/wizard-runner/wizard-runner.service";
import { RemoveSelectionWizard } from "../../../../session/session-panel/selection-navigation/selection-button/remove-selection-wizard/remove-selection-wizard";
import { Permission } from "../../../../auth/permission";
import { SessionClassType } from "../../../../session/session-class-type.enum";
import { PlatformType } from "../../../../platform/platform-type.enum";
import { MergeSelectionWizard } from "../../../../session/session-panel/selection-navigation/selection-button/merge-selection-wizard/merge-selection-wizard";
import { SearchTypeContainer } from "../../../../search/search-type-container";
import { SearchState } from "../../../../search/search-state";
import { SearchTypeType } from "../../../../search/search-type/search-type-type.enum";
import {MaplesAccount, MaplesCard, MaplesOrderItemCard} from "@cscore/maples-client-model";
import { Logger } from "../../../../../logging/logger.service";
import { SearchParameterValueType } from "../../../../search/search-type/search-parameter-value-type.enum";
import { Partner } from "../../../../session/selection/partner";
import { Card } from "../../../../card/card";
import { CustomerService } from "../../../../customer/customer.service";
import { Customer } from 'src/app/core/customer/customer';
import { CustomerAccountService } from 'src/app/core/customer-account/customer-account.service';

@Component ( {
  selector: 'cca-selection-group-item',
  templateUrl: './selection-group-item.component.html',
  styleUrls: [ './selection-group-item.component.scss' ]
} )
export class SelectionGroupItemComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  selectionGroupItem: SelectionGroupItem;

  currentActiveCard: string;
  hasRemoveSelectionPermission: boolean = false;
  isSelectionMergeable: boolean         = false;
  currentSelection: Selection<SelectionDataType>;
  SpinnerSize                           = SpinnerSize;
  tabState$: Store<DockSelectionsTabState>;

  @ViewChild ( SpinnerComponent )
  spinner: SpinnerComponent;

  private session: Session;

  constructor (
    private customerAccountService: CustomerAccountService,
    private customerService: CustomerService,
    private logger: Logger,
    private orderService: OrderService,
    private router: Router,
    private routingService: RoutingService,
    private securityService: SecurityService,
    private store: Store<AppState>,
    private wizardRunner: WizardRunner,
    private workflow: Workflow,
  ) {
    super ();
  }

  ngOnInit () {
    this.tabState$ = <Store<DockSelectionsTabState>>this.store.select ( AppStateType.DOCK_SELECTIONS_TAB_STATE );
    this.subscribeToNavigationEvents ();
    this.subscribeToSessionState ();
    this.hasRemoveSelectionPermission = this.securityService.hasPermission ( Permission.REMOVE_SELECTION );
  }

  get isCurrentSelection (): boolean {
    return this.currentSelection && this.currentSelection.id === this.selectionGroupItem.id
  }

  get isSelected (): boolean {
    return this.selectionGroupItem && this.selectionGroupItem.isSelected;
  }

  get paginationStart (): number {
    return this.selectionGroupItem.paginationPage * this.selectionGroupItem.paginationPageSize;
  }

  get paginationCount (): number {
    return this.selectionGroupItem.paginationPageSize;
  }

  linkToAccountCard ( card: MaplesCard ): void {
    this.store.dispatch ( new CloseDockTabAction () );
    if ( this.isSelected ) {
      this.customerAccountService.setSelectedCardForSelection ( this.selectionGroupItem.selection as Selection<MaplesAccount>, card );
    } else {
      this.addSubscription (
        this.workflow.loadSelection ( this.selectionGroupItem.selection )
          .subscribe ( () => {
            this.customerAccountService.setSelectedCardForSelection ( this.selectionGroupItem.selection as Selection<MaplesAccount>, card );
          } )
      );
    }
  }

  linkToCustomerCard ( card: Card ): void {
    this.store.dispatch ( new CloseDockTabAction () );
    if ( this.isSelected ) {
      this.customerService.setSelectedCardForSelection ( this.selectionGroupItem.selection as Selection<Customer>, card );
    } else {
      card.isSearching = true;
      this.addSubscription (
        this.workflow.loadSelection ( this.selectionGroupItem.selection )
          .pipe ( finalize ( () => card.isSearching = false ) )
          .subscribe ( () => {
            this.customerService.setSelectedCardForSelection ( this.selectionGroupItem.selection as Selection<Customer>, card );
          } )
      );
    }
  }

  linkToOrderItemCard ( card: MaplesOrderItemCard ): void {
    let orderPlatform = this.selectionGroupItem.selection.platform;
    let cardPlatform  = this.getCardPlatformFromOrderPlatform ( orderPlatform );

    if ( cardPlatform ) {
      let searchTypeContainer = this.getSearchTypeContainerForCardPlatform ( cardPlatform );
      if ( searchTypeContainer ) {
        searchTypeContainer.clear ();
        searchTypeContainer.parameters.set ( SearchParameterValueType.PARTNER, Partner.INCOMM );
        searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, card.serialNumber );
        this.store.dispatch ( new CloseDockTabAction () );
        card.isSearching = true;

        this.addSubscription (
          this.workflow.forwardingSearch ( searchTypeContainer, true )
            .pipe ( finalize ( () => card.isSearching = false ) )
            .subscribe ()
        );
      }
    }
  }

  loadSelection (): void {
    this.spinner.start ();

    this.addSubscription (
      this.workflow.loadSelection ( this.selectionGroupItem.selection, true )
        .pipe (
          map ( () => {
            if ( this.selectionGroupItem.isCollapsible ) {
              let actionPayload = {
                ...this.selectionGroupItem,
                isCollapsed: !this.selectionGroupItem.isCollapsed
              };
              this.store.dispatch ( new SetDockSelectionsTabSelectionIsCollapsedAction ( <SelectionGroupItem>actionPayload ) );
            }
          } ),
          finalize ( () => {
            this.spinner.stop ();
          } )
        )
        .subscribe ()
    );
  }

  onPage ( page: number ): void {
    let actionPayload = {
      ...this.selectionGroupItem,
      paginationPage: page
    };
    this.store.dispatch ( new SetDockSelectionsTabSelectionPaginationPageAction ( <SelectionGroupItem>actionPayload ) );
  }

  openMergeSelection (): void {
    const wizard           = new MergeSelectionWizard ( this.workflow );
    wizard.model.selection = _.cloneDeep ( this.selectionGroupItem.selection );
    wizard.model.session   = _.cloneDeep ( this.session );
    this.wizardRunner.run ( wizard );
    this.store.dispatch ( new CloseDockTabAction () );
  }

  openRemoveSelection (): void {
    let wizard             = new RemoveSelectionWizard ();
    wizard.model.selection = this.selectionGroupItem.selection;
    this.wizardRunner.run ( wizard );
  }

  select (): void {
    this.addSubscription (
      this.workflow.loadSelection ( this.selectionGroupItem.selection )
        .subscribe ( () => {
          this.store.dispatch ( new CloseDockTabAction () );
        } )
    );
  }

  toggleIsCollapsed (): void {
    let tabState: DockSelectionsTabState = snapshot ( this.store, AppStateType.DOCK_SELECTIONS_TAB_STATE );
    if ( !tabState.isBulkModeEnabled ) {
      let actionPayload = {
        ...this.selectionGroupItem,
        isCollapsed: !this.selectionGroupItem.isCollapsed
      };

      if ( !!this.selectionGroupItem.selection.data ) {
        this.store.dispatch ( new SetDockSelectionsTabSelectionIsCollapsedAction ( <SelectionGroupItem>actionPayload ) );
      } else {
        this.loadSelection ();
      }
    }
  }

  toggleIsSelected (): void {
    let actionPayload = {
      ...this.selectionGroupItem,
      isSelected: !this.isSelected
    };
    this.store.dispatch ( new SetDockSelectionsTabSelectionIsSelectedAction ( <SelectionGroupItem>actionPayload ) );
  }

  private handleIsSelectionMergeable (): void {
    this.isSelectionMergeable = !!this.session
      //Session must be a CASE
      && this.session.sessionClassType === SessionClassType.CASE
      && (
        //Selection must be a customer, and session must have a customerComponent or cardsComponent
        (this.selectionGroupItem.selection.type === SelectionType.CUSTOMER && (!!this.session.customerComponent || !!this.session.callComponent))
        //Or selection must be a location, and the session must have a merchantComponent
        || (this.selectionGroupItem.selection.type === SelectionType.LOCATION && !!this.session.merchantComponent)
        //Or selection must be a Greencard product, and the session must have a customerComponent or cardsComponent
        || (this.selectionGroupItem.selection.type === SelectionType.CARD && this.selectionGroupItem.selection.platform === PlatformType.GREENCARD && (!!this.session.customerComponent || !!this.session.cardsComponent))
        //Or the selection must be any other platform product, and the session must have a cardsComponent
        || (this.selectionGroupItem.selection.type === SelectionType.CARD && !!this.session.cardsComponent)
      );
  }

  private getCardPlatformFromOrderPlatform ( orderPlatform: PlatformType ): PlatformType {
    let cardPlatform: PlatformType;

    switch ( orderPlatform ) {
      case PlatformType.ECOMM:
        cardPlatform = PlatformType.VMS;
        break;
      default:
        cardPlatform = null;
        this.logger.error ( 'No card platform mapped for order platform!', orderPlatform );
        break;
    }

    return cardPlatform;
  }

  private getSearchTypeContainerForCardPlatform ( cardPlatform: PlatformType ): SearchTypeContainer {
    let container: SearchTypeContainer;

    switch ( cardPlatform ) {
      case PlatformType.VMS:
        container = this.getSearchTypeContainer ( SearchTypeType.VMS_GIFT );
        break;
      default:
        container = null;
        this.logger.error ( 'No search type mapped for card platform!', cardPlatform );
        break;
    }

    return container;
  }

  private getSearchTypeContainer ( searchType: SearchTypeType ): SearchTypeContainer {
    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === searchType;
    } ) );
  }

  private subscribeToNavigationEvents (): void {
    this.currentActiveCard = this.routingService.getQueryParam ( UrlQueryParam.DETAILS_LAST_FOUR );
    this.addSubscription (
      this.router.events.subscribe ( ( event ) => {
        if ( event instanceof NavigationEnd ) {
          this.currentActiveCard = this.routingService.getQueryParam ( UrlQueryParam.DETAILS_LAST_FOUR );
        }
      } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.currentSelection = state.selection;
            this.session          = state.session;
            this.handleIsSelectionMergeable ();
          }
        } )
    );
  }
}
