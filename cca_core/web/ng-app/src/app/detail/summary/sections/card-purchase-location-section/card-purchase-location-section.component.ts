import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractSelectionAwareComponent} from '../../../abstract-selection-aware/abstract-selection-aware.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../app-state';
import {Card} from '../../../../core/card/card';
import {AppStateType} from '../../../../app-state-type.enum';
import {SessionState} from '../../../../core/session/session-state';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {LocationService} from '../../../../core/node/location/location.service';
import {Logger} from '../../../../logging/logger.service';
import {finalize} from 'rxjs/operators';
import {Location} from '../../../../core/node/location/location';
import {
  SetSelectionPurchaseLocationAction,
  SetSelectionPurchaseOrderAction
} from '../../../../core/session/action/session-actions';
import {OrderService} from '../../../../core/order/order.service';
import {MaplesOrder, MaplesPartner} from '@cscore/maples-client-model';
import {Workflow} from '../../../../core/workflow/workflow.service';
import {SearchTypeType} from '../../../../core/search/search-type/search-type-type.enum';
import {SearchTypeContainer} from '../../../../core/search/search-type-container';
import {SearchState} from '../../../../core/search/search-state';
import {snapshot} from '../../../../core/store-utils/store-utils';
import * as _ from 'lodash';
import {SearchParameterValueType} from '../../../../core/search/search-type/search-parameter-value-type.enum';
import {NodeType} from '../../../../core/node/node-type.enum';
import {TogglzService} from '../../../../core/config/togglz.service';
import {TogglzType} from '../../../../core/config/togglz-type.enum';

@Component({
  selector: 'cca-card-purchase-location-section',
  templateUrl: './card-purchase-location-section.component.html',
  styleUrls: ['./card-purchase-location-section.component.scss']
})
export class CardPurchaseLocationSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  @Input()
  card: Card;

  @Input()
  useGivenCard: boolean = false;

  isOrderNumberLinkEnabled: boolean = false;

  @ViewChild('purchaseLocationSpinner')
  purchaseLocationSpinner: SpinnerComponent;
  @ViewChild('purchaseLocationLinkSpinner')
  purchaseLocationLinkSpinner: SpinnerComponent;
  @ViewChild('purchaseOrderSpinner')
  purchaseOrderSpinner: SpinnerComponent;
  @ViewChild('purchaseOrderLinkSpinner')
  purchaseOrderLinkSpinner: SpinnerComponent;

  private attemptedToLoadPurchaseOrder: boolean    = false;
  private attemptedToLoadPurchaseLocation: boolean = false;

  constructor(private locationService: LocationService,
              private logger: Logger,
              private orderService: OrderService,
              protected store: Store<AppState>,
              private togglzService: TogglzService,
              private workflow: Workflow) {
    super(store);
  }

  ngOnInit() {
    super.init();
    this.checkIsOrderNumberLinkEnabled();
    if (!this.useGivenCard) {
      this.subscribeToSessionState();
    } else if (this.card) {
      this.loadPurchaseLocation();
      this.loadPurchaseOrder();
    }
  }

  linkToLocation(): void {
    // Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer(SearchTypeType.LOCATION);
    searchTypeContainer.clear();

    // Set search parameters
    if (this.selection.purchaseLocation) {
      searchTypeContainer.parameters.set(SearchParameterValueType.LOCATION_ID, this.selection.purchaseLocation.id);
    } else if (this.selection.getCard()
      && this.selection.getCard().activation
      && this.selection.getCard().activation.entity
      && this.selection.getCard().activation.entity.type === NodeType.LOCATION) {
      searchTypeContainer.parameters.set(SearchParameterValueType.LOCATION_ID, this.selection.getCard().activation.entity.id);
    } else if (this.selection.getCard()
      && this.selection.getCard().activation
      && this.selection.getCard().activation.pos) {
      searchTypeContainer.parameters.set(SearchParameterValueType.LOCATION_NAME, this.selection.getCard().activation.pos.locationName);
    }

    this.purchaseLocationLinkSpinner.start();
    this.workflow.forwardingSearch(searchTypeContainer, true)
      .pipe(finalize(() => this.purchaseLocationLinkSpinner.stop()))
      .subscribe();
  }

  linkToOrder(): void {
    // Prepare searchTypeContainer
    let searchTypeContainer = this.getSearchTypeContainer(SearchTypeType.ECOMM_ORDER);
    searchTypeContainer.clear();

    // Set search parameters
    if (this.selection.purchaseOrder) {
      searchTypeContainer.parameters.set(SearchParameterValueType.ORDER_ID, this.selection.purchaseOrder.id);
    } else if (this.selection.getCard()
      && this.selection.getCard().activation
      && this.selection.getCard().activation.order) {
      searchTypeContainer.parameters.set(SearchParameterValueType.ORDER_ID, this.selection.getCard().activation.order.orderId);
    }

    this.purchaseOrderLinkSpinner.start();
    this.workflow.forwardingSearch(searchTypeContainer, true)
      .pipe(finalize(() => this.purchaseOrderLinkSpinner.stop()))
      .subscribe();
  }

  private checkIsOrderNumberLinkEnabled(): void {
    this.isOrderNumberLinkEnabled = this.togglzService.isActive(TogglzType.VMS_ORDER_NUMBER_LINK);
  }

  private getSearchTypeContainer(type: SearchTypeType): SearchTypeContainer {
    let searchState: SearchState = snapshot(this.store, AppStateType.SEARCH_STATE);
    return _.cloneDeep(_.find(searchState.searchTypeContainers, (searchTypeContainer: SearchTypeContainer) => {
      return searchTypeContainer.searchType.type === type;
    }));
  }

  private loadPurchaseOrder(): void {
    if (!this.selection.purchaseOrder && !this.attemptedToLoadPurchaseOrder) {
      this.attemptedToLoadPurchaseOrder = true;
      // We only need to attempt this if we actually have activation order information
      if (this.selection.platform === PlatformType.VMS
        && this.card.activation
        && this.card.activation.order
        && this.card.activation.order.orderId) {
        // Only perform this if the orderId is numeric
        if (!_.isNumber(this.card.activation.order.orderId)) {
          this.logger.warn('Skipping order number lookup as provided orderId is invalid', this.card.activation.order.orderId);
        } else {
          if (this.purchaseOrderSpinner) {
            this.purchaseOrderSpinner.start();
          }
          let orderId: string              = this.card.activation.order.orderId;
          let maplesPartner: MaplesPartner = null;

          if (orderId.indexOf('ID-') !== -1) {
            orderId = orderId.replace('ID-', '');
          } else if (orderId.indexOf('VAN') !== -1) {
            orderId       = orderId.replace('VAN', '');
            maplesPartner = MaplesPartner.VANILLA;
          }

          this.orderService.findOneById(orderId,
              this.selection.getMaplesPlatform(),
              maplesPartner)
            .pipe(finalize(() => {
              if (this.purchaseOrderSpinner) {
                this.purchaseOrderSpinner.stop();
              }
            }))
            .subscribe((order: MaplesOrder) => {
              this.selection.purchaseOrder = order;
              this.store.dispatch(new SetSelectionPurchaseOrderAction(this.selection));
            });
        }
      }
    }
  }

  private loadPurchaseLocation(): void {
    if (!this.selection.purchaseLocation && !this.attemptedToLoadPurchaseLocation) {
      this.attemptedToLoadPurchaseLocation = true;
      // We only need to attempt this if we actually have activation entity information
      if (this.card.activation
        && this.card.activation.entity
        && this.card.activation.entity.type
        && this.card.activation.entity.id) {
        this.purchaseLocationSpinner.start();
        this.locationService.findPurchaseLocation(this.card.activation.entity.type, this.card.activation.entity.id)
          .pipe(finalize(() => this.purchaseLocationSpinner.stop()))
          .subscribe((location: Location) => {
            this.selection.purchaseLocation = location;
            this.store.dispatch(new SetSelectionPurchaseLocationAction(this.selection));
          });
      } else {
        this.logger.warn('Skipped loading purchase location due to missing activation entity data', this.card);
      }
    }
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            switch (state.selection.platform) {
              case PlatformType.VMS:
                this.card = state.selection.selectedCard;
                break;
              default:
                this.card = state.selection.getCard();
                break;
            }
            if (this.card) {
              this.loadPurchaseLocation();
              this.loadPurchaseOrder();
            }
          }
        })
    );
  }

}
