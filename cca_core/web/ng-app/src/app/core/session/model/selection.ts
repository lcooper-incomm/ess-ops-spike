import {Partner} from "../selection/partner";
import {PlatformType} from "../../platform/platform-type.enum";
import {SelectionType} from "./selection-type.enum";
import {Identifier} from "./identifier";
import {Card} from "../../card/card";
import {Location} from "../../node/location/location";
import {
  MaplesAccount, MaplesAccountCode,
  MaplesAccountDocument,
  MaplesAccountNoteQuery,
  MaplesAccountNotification,
  MaplesCard, MaplesCardHistory,
  MaplesCustomer,
  MaplesIdentificationType,
  MaplesOrder,
  MaplesOrderItem,
  MaplesOrderItemCard,
  MaplesOrderPayment,
  MaplesOrderShipment,
  MaplesOrderTransaction,
  MaplesPartner,
  MaplesPlatform,
  MaplesRule,
  MaplesStatus,
  MaplesTransaction,
  MaplesTransactionQuery
} from "@cscore/maples-client-model";
import {Customer} from "../../customer/customer";
import {Account} from "../../account/account";
import {IdentifierType} from "./identifier-type.enum";
import * as _ from "lodash";
import {FeePlan} from "../../model/fee-plan";
import {SelectionAlert} from "../../../detail/selection-alerts-panel/selection-alert";
import {Session} from "./session";
import {Hierarchy} from "../../node/hierarchy/hierarchy";
import {Terminal} from "../../node/terminal/terminal";
import {DetailTabType} from "../../../detail/detail-tab-type.enum";
import {Comment} from "../../model/comment";
import {Page} from "../../model/page";
import {CustomerAlertsInfo} from "../../customer/customer-alert";
import {CustomerAccountLimit} from "../../customer/customer-account-limit";
import {Transactions} from "../../transaction/transactions";
import {CompositeTransactionRequest} from "../../../detail/details-panel/transaction-history-tab/composite-transaction-request";
import {TransactionSearchRequest} from "../../../detail/details-panel/transaction-history-tab/transaction-search-request";
import {Transaction} from "../../transaction/transaction";
import {OrderRelatedJobView} from "../../order/order-related-job-view";
import {AuditCardReplacementActivity} from "../../audit/audit-card-replacement-activity";
import {Issue} from "../../issue/issue";
import {ServeCardStatus} from '../../model/account/serve-card-status.enum';
import { flatten } from "lodash";

export type SelectionDataType = Account | Card | Customer | MaplesAccount | MaplesCustomer | Issue | Location | MaplesOrder;

export class Selection<T extends SelectionDataType> {

  id: number;
  data: T;
  description: string;
  externalSessionId: string;
  iconName: string;
  identifiers: Identifier[]                  = [];
  isFailedToLoad: boolean                    = false;
  isMissingDescriptionOnInitialLoad: boolean = false;
  partner: Partner;
  platform: PlatformType;
  selectedCard: Card; // I really hope this concept goes away if we properly display cards as children of customers...
  selectedCustomerAccountCard: MaplesCard; // Until we move FSAPI requests to MAPLES, customer account cards and customer cards are different models
  selectedShipment: MaplesOrderShipment;
  selectedTab: DetailTabType;
  simplePartner: MaplesPartner;
  type: SelectionType;

  comments: Page<Comment>;

  /*
  I don't like putting all these here, but these are the secondary pieces of data we need on the Details page. I probably
  ought to create subclasses of Selection for each type, but that has other consequences. So, I'm putting all this stuff
  here so it's in a centralized place, and can each be updated independently of each other. I specifically did not put
  this inside the "data" models, so that we would not have issues with losing this secondary stuff if we refreshed the
  core selection "data".
   */
  accountDocuments: MaplesAccountDocument[]            = [];
  accountNotifications: MaplesAccountNotification[]    = [];
  accountStatusCodesAccount: MaplesAccountCode[] = [];
  accountStatusCodesAddress: MaplesAccountCode[] = [];
  accountStatusCodesFundingSource: MaplesAccountCode[] = [];
  alerts: SelectionAlert[]                       = [];
  allowedStatuses: string[]                      = [];
  blockedMerchants: MaplesRule[]                 = [];
  cardHistory: MaplesCardHistory[]               = [];
  commentQuery: MaplesAccountNoteQuery;
  customerAlerts: CustomerAlertsInfo;
  feePlans: FeePlan[]                            = [];
  lastReplacementActivity: AuditCardReplacementActivity;
  limits: CustomerAccountLimit[]                 = [];
  hierarchy: Hierarchy;
  orders: MaplesOrder[]                          = [];
  orderItems: MaplesOrderItem[]                        = [];
  orderShipments: MaplesOrderShipment[]                = [];
  orderTransactions: MaplesOrderTransaction[]    = [];
  primaryAccount: MaplesAccount;
  purchaseLocation: Location;
  purchaseOrder: MaplesOrder;
  relatedCases: Session[]                        = [];
  relatedJobs: OrderRelatedJobView[]          = [];
  reserveAccounts: MaplesAccount[]             = [];
  subAccounts: MaplesAccount[]                 = [];
  associatedAccounts: MaplesAccount[]          = [];
  terminals: Terminal[]                          = [];
  transactionRequests: CompositeTransactionRequest;
  transactions: Transactions;
  maplesTransactions: MaplesTransaction[]        = [];
  maplesScheduledTransactions: MaplesTransaction[]        = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.identifiers = [];

      if ( data.identifiers ) {
        data.identifiers.forEach ( identifier => this.identifiers.push ( new Identifier ( identifier ) ) );
      }
      if ( data.partner ) {
        this.partner = new Partner ( data.partner );
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.simplePartner ) {
        this.simplePartner = MaplesPartner[ <string>data.simplePartner ];
      }
      if ( data.type ) {
        this.type = SelectionType[ <string>data.type ];
      }

      this.iconName = Selection.getIconName ( this.type );

      if ( !this.description ) {
        this.isMissingDescriptionOnInitialLoad = true;
      }
    }
  }

  static getIconName ( type: SelectionType = null ): string {
    let iconName: string;

    switch ( type ) {
      case SelectionType.ACCOUNT:
        iconName = 'university';
        break;
      case SelectionType.CUSTOMER:
        iconName = 'user';
        break;
      case SelectionType.CUSTOMER_ACCOUNT:
        iconName = 'money-check-alt';
        break;
      case SelectionType.LOCATION:
        iconName = 'map-marker-alt';
        break;
      case SelectionType.MAPLES_CUSTOMER:
        iconName = 'shopping-cart';
        break;
      case SelectionType.ORDER:
        iconName = 'shopping-cart';
        break;
      case SelectionType.CARD:
        iconName = 'credit-card';
        break;
      default:
        iconName = 'question';
        break;
    }

    return iconName;
  }

  buildDescription (): string {
    let description: string;

    switch ( this.type ) {
      case SelectionType.ACCOUNT:
        description = this.getAccount ().description;
        break;
      case SelectionType.CUSTOMER:
        if ( this.platform === PlatformType.VMS ) {
          description = this.getCustomer ().isVmsGiftCard ? this.getCustomer ().productType : this.getCustomer ().getDisplayName ();
        } else if ( this.platform === PlatformType.CCL ) {
          description = this.getCustomer ().productName;
        }
        break;
      case SelectionType.CUSTOMER_ACCOUNT:
        const customer = this.getCustomerAccount ().customer;
        description    = customer.getDisplayName ();
        break;
      case SelectionType.LOCATION:
        description = this.getLocation ().name;
        if ( this.getLocation ().merchant && this.getLocation ().merchant.name ) {
          description += ' - ' + this.getLocation ().merchant.name;
        }
        break;
      case SelectionType.MAPLES_CUSTOMER:
        description = this.getMaplesCustomer().getIdentification(MaplesIdentificationType.MEMBER);
        description += ' (' + this.getMaplesCustomer().getDisplayName() + ')';
        break;
      case SelectionType.ORDER:
        description = `${this.getOrder ().number} (${this.getOrder ().customer.getDisplayName ()})`;
        break;
      case SelectionType.CARD:
        // Pick the Card description by this hierarchy
        description = this.getCard ().productDescription;
        if ( !description ) {
          description = this.getCard ().productGroup;
        }
        if ( !description ) {
          description = this.getCard ().productType;
        }
        if ( !description ) {
          description = this.getCard ().identifiers.serialNumber;
        }
        break;
    }

    return description;
  }

  getAccount (): Account {
    return <Account>this.data;
  }

  getActiveFeePlan (): FeePlan {
    return this.feePlans.find ( feePlan => feePlan.isActive );
  }

  getAllCardsInOrder (): MaplesOrderItemCard[] {
    return this.orderItems ? flatten(this.orderItems.map(item => item.cards)) : [];
  }

  /**
   * Given a serialNumber, search shipments for the items, then cards serial numbers trying to find a match.
   * Return the match if found.
   *
   * @param serialNumber
   */
  getShipmentForCard(card: MaplesOrderItemCard): MaplesOrderShipment {
    return this.orderShipments && this.orderShipments.find((shipment: MaplesOrderShipment) => {
      return shipment.items.some((shipmentItem: MaplesOrderItem) => {
        // Shipment matches if it contains a matching MaplesOrderItem.id or matching MaplesOrderItemCard.serialNumber
        return (card.parentItem && shipmentItem.id === card.parentItem.id)
          || shipmentItem.cards.some((shipmentCard: MaplesOrderItemCard) => shipmentCard.serialNumber === card.serialNumber);
      });
    });
  }

  getCard (): Card {
    return <Card>this.data;
  }

  /**
   * If the card is active, return the card status on the account.  Otherwise return the status on the card.
   */
  getMaplesCardStatus(card: MaplesCard): MaplesStatus {
    let platformStatus: MaplesStatus = card.getPlatformStatus();
    let status: MaplesStatus = this.getCustomerAccount().getCardStatus();

    if (status && platformStatus.name === ServeCardStatus.ACTIVE) {
      return status;
    } else if (platformStatus) {
      return platformStatus;
    } else {
      return null;
    }
  }

  getCustomer (): Customer {
    return <Customer>this.data;
  }

  getCustomerAccount (): MaplesAccount {
    return <MaplesAccount>this.data;
  }

  getDefaultTransactionSearchRequest (): TransactionSearchRequest {
    return this.transactionRequests ? this.transactionRequests.current : null;
  }

  getDefaultMaplesTransactionSearchRequest (): MaplesTransactionQuery {
    return this.transactionRequests ? this.transactionRequests.maplesCurrent : null;
  }

  getDefaultMaplesScheduledTransactionSearchRequest(): MaplesTransactionQuery {
    return this.transactionRequests ? this.transactionRequests.maplesScheduled : null;
  }

  getIdentifierByType ( type: IdentifierType ): Identifier {
    return this.identifiers.find ( identifier => identifier.type === type );
  }

  getLocation (): Location {
    return <Location>this.data;
  }

  getMaplesCustomer (): MaplesCustomer {
    return <MaplesCustomer>this.data;
  }

  getOrder (): MaplesOrder {
    return <MaplesOrder>this.data;
  }

  getPrimaryIdentifier(expectedType: IdentifierType = null): Identifier {
    // If there's only one identifier, use it
    if (this.identifiers.length === 1) {
      return this.identifiers[0];
    } else {
      // Look for expected type, then preferred type, then first identifier
      return this.getIdentifierByType(expectedType) || this.getPreferredIdentifier() || this.identifiers[0];
    }
  }

  getSelectedTransactions (): Transaction[] {
    if ( this.transactions ) {
      return this.transactions.transactions.filter ( transaction => transaction.isSelected );
    } else {
      return [];
    }
  }

  getPaymentTransactions(): MaplesOrderPayment[] {
    if (this.getOrder().payment && this.getOrder().payments.length === 0) {
      this.getOrder().payments.push(this.getOrder().payment);
    }
    for (let payment of this.getOrder().payments) {
      payment['transaction'] = this.orderTransactions.find(
        transaction => payment.transactionId === transaction.processor.transactionId
          || payment.authorizationCode === transaction.authorizationCode
      );
    }

    return this.getOrder().payments;
  }

  getOrderTransaction(payment: MaplesOrderPayment): MaplesOrderTransaction {
    return this.orderTransactions.find(
      transaction => payment.transactionId === transaction.processor.transactionId
        || payment.authorizationCode === transaction.authorizationCode
    );
  }

  linkTransactionsToPayments(): void {
    if (this.getOrder().payment && this.getOrder().payments.length === 0) {
      this.getOrder().payments.push(this.getOrder().payment);
    }
    for (let payment of this.getOrder().payments) {
      payment['transaction'] = this.orderTransactions.find(
        transaction => payment.transactionId === transaction.processor.transactionId
          || payment.authorizationCode === transaction.authorizationCode
      );
    }
  }

  setDefaultSelectedTab (): void {
    switch ( this.type ) {
      case SelectionType.ORDER:
        this.selectedTab = DetailTabType.ORDER_ITEMS;
        break;
      case SelectionType.CUSTOMER_ACCOUNT:
        this.selectedTab = DetailTabType.MAPLES_TRANSACTION_HISTORY;
        break;
      case SelectionType.MAPLES_CUSTOMER:
        this.selectedTab = DetailTabType.COMMENTS;
        break;
      default:
        this.selectedTab = DetailTabType.TRANSACTION_HISTORY;
        break;
    }
  }

  /**
   * If the PlatformType is a MaplesPlatform, cast it, otherwise return null.
   *
   * @param platform The old PlatformType.
   */
  getMaplesPlatform(): MaplesPlatform {
    for (let key in MaplesPlatform) {
      if (MaplesPlatform[key] === this.platform) {
        return <MaplesPlatform><any>this.platform;
      }
    }
    return null;
  }

  private getAccountNumber(): string {
    switch (this.type) {
      case SelectionType.ACCOUNT:
        return this.getAccount().identifiers.van16;
      case SelectionType.CUSTOMER:
        return this.getCustomer().identifiers.accountNumber;
    }
  }

  private getIdentifierValue(identifierType: IdentifierType): string {
    switch (identifierType) {
      case IdentifierType.ACCOUNT_NUMBER:
        return this.getAccountNumber();
      case IdentifierType.CUSTOMERID:
        return this.getCustomer().id
      case IdentifierType.ACCOUNT_ID:
        return this.getCustomerAccount().id;
      case IdentifierType.LOCATIONID:
        return this.getLocation().id;
      case IdentifierType.MEMBER_NUMBER:
        return this.getMaplesCustomer().getIdentification(MaplesIdentificationType.MEMBER);
      case IdentifierType.ORDER_NUMBER:
        return this.getOrder().number
      case IdentifierType.ORDER_ID:
        return this.getOrder().id
      case IdentifierType.VAN:
        return this.getCard().identifiers.van
      case IdentifierType.SERIALNUMBER:
        return this.getCard().identifiers.serialNumber
      case IdentifierType.PIN:
        return this.getCard().identifiers.pin
    }
  }

  /**
   * Gets the first prioritized identifier that has a value
   */
  private getPreferredIdentifier (): Identifier {
    return this.getPrioritizedIdentifierTypes ()
      .map ( identifierType => this.getIdentifierByType ( identifierType ) )
      .filter ( identifier => !!identifier )[0];
  }

  /**
   * Returns identifier types for this selection type, in order of priority
   */
  private getPrioritizedIdentifierTypes(): IdentifierType[] {
    switch (this.type) {
      case SelectionType.ACCOUNT:
        return [IdentifierType.ACCOUNT_NUMBER];
      case SelectionType.CUSTOMER:
        return [IdentifierType.CUSTOMERID, IdentifierType.ACCOUNT_NUMBER];
      case SelectionType.CUSTOMER_ACCOUNT:
        return [IdentifierType.ACCOUNT_ID];
      case SelectionType.LOCATION:
        return [IdentifierType.LOCATIONID];
      case SelectionType.MAPLES_CUSTOMER:
        return [IdentifierType.MEMBER_NUMBER]
      case SelectionType.ORDER:
        return [IdentifierType.ORDER_ID, IdentifierType.ORDER_NUMBER];
      case SelectionType.CARD:
        // Prefer VAN for Lottery platform
        return this.platform === PlatformType.LOTTERY
          ? [IdentifierType.VAN, IdentifierType.SERIALNUMBER, IdentifierType.PIN]
          : [IdentifierType.SERIALNUMBER, IdentifierType.PIN, IdentifierType.VAN];
      default:
        return [];
    }
  }

  /**
   * Builds identifiers for a new selection
   * @param selection
   */
  static buildIdentifiers(selection: Selection<SelectionDataType>): Identifier[] {
    const identifiers = selection.getPrioritizedIdentifierTypes().map(identifierType => {
      return new Identifier({
        type: identifierType,
        value: selection.getIdentifierValue(identifierType),
      });
    });

    switch (selection.type) {
      case SelectionType.ACCOUNT:
      case SelectionType.LOCATION:
      case SelectionType.MAPLES_CUSTOMER:
        return identifiers;
      // Add platform/partner field for some types
      case SelectionType.CUSTOMER_ACCOUNT:
        return identifiers.map(identifier => new Identifier({ ...identifier, platform: selection.platform }));
      case SelectionType.CUSTOMER:
        return identifiers.map(identifier => new Identifier({ ...identifier, partner: selection.partner && selection.partner.type }));
      case SelectionType.ORDER:
        return identifiers.map(identifier => new Identifier({ ...identifier, partner: selection.simplePartner }));
      // Only build a single identifier for cards
      case SelectionType.CARD:
        return identifiers.slice(0, 1);
    }
  }
}
