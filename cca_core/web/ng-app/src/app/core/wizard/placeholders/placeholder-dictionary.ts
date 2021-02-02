import { Selection } from "../../session/model/selection";
import { User } from "../../user/user";
import { Account } from "../../account/account";
import { Card } from "../../card/card";
import { Customer } from "../../customer/customer";
import { Location } from "../../node/location/location";
import { MaplesOrder } from "@cscore/maples-client-model";
import { PlaceholderKey } from "./placeholder-key.enum";
import { SelectionType } from "../../session/model/selection-type.enum";
import { PlatformType } from "../../platform/platform-type.enum";

export class PlaceholderDictionary {

  private placeholders: Map<string, string> = new Map<string, string> ();

  /**
   * So long as value is not falsy, adds a placeholder mapping for the given key and value.
   */
  addPlaceholder ( key, value: string ): void {
    if ( !!value ) {
      this.placeholders.set ( key, value );
    }
  }

  addPlaceholdersForSelection ( selection: Selection<any> ): void {
    if ( selection ) {
      switch ( selection.type ) {
        case SelectionType.ACCOUNT:
          this.addPlaceholdersForAccount ( selection.getAccount () );
          break;
        case SelectionType.CUSTOMER:
          this.addPlaceholdersForCustomer ( selection.getCustomer () );
          break;
        case SelectionType.LOCATION:
          this.addPlaceholdersForLocation ( selection.getLocation () );
          break;
        case SelectionType.ORDER:
          this.addPlaceholdersForOrder ( selection.getOrder () );
          break;
        case SelectionType.CARD:
          this.addPlaceholdersForCard ( selection.getCard () );
          break;
      }
    }
  }

  addPlaceholdersForUser ( user: User ): void {
    if ( user ) {
      this.addPlaceholder ( PlaceholderKey.USER_COMPANY, user.company );
      this.addPlaceholder ( PlaceholderKey.USER_DEPARTMENT, user.department );
      this.addPlaceholder ( PlaceholderKey.USER_DISPLAY_NAME, user.displayName );
      this.addPlaceholder ( PlaceholderKey.USER_EMAIL_ADDRESS, user.email );
      this.addPlaceholder ( PlaceholderKey.USER_FIRST_NAME, user.firstName );
      this.addPlaceholder ( PlaceholderKey.USER_LAST_NAME, user.lastName );
      this.addPlaceholder ( PlaceholderKey.USER_MOBILE_PHONE, user.mobile ? user.mobile.number : null );
      this.addPlaceholder ( PlaceholderKey.USER_PHONE, user.phone ? user.phone.number : null );
      this.addPlaceholder ( PlaceholderKey.USER_TITLE, user.title );
      this.addPlaceholder ( PlaceholderKey.USER_USERNAME, user.username );
    }
  }

  applyPlaceholders ( value: string ): string {
    if ( value ) {
      this.placeholders.forEach ( ( placeholderValue: string, key: string ) => {
        let placeholder = `\\|\\|${key}\\|\\|`;
        let regex       = new RegExp ( placeholder, 'g' );
        value           = value.replace ( regex, placeholderValue );
      } );
    }

    return value;
  }

  clear(): void {
    this.placeholders.clear();
  }

  private addPlaceholdersForAccount ( account: Account ): void {
    if ( account ) {
      this.addPlaceholder ( PlaceholderKey.ACCOUNT_ACCOUNT_NUMBER, account.identifiers.van16 );
      this.addPlaceholder ( PlaceholderKey.ACCOUNT_CREATED_DATE, account.createDate ? account.createDate.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ACCOUNT_DESCRIPTION, account.description );
      this.addPlaceholder ( PlaceholderKey.ACCOUNT_PLATFORM, account.platform );
      this.addPlaceholder ( PlaceholderKey.ACCOUNT_STATUS, account.status ? account.status.name : null );
    }
  }

  private addPlaceholdersForCard ( card: Card ): void {
    if ( card ) {
      this.addPlaceholder ( PlaceholderKey.CARD_AVAILABLE_BALANCE, card.amounts.availableBalance ? card.amounts.availableBalance.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CARD_CARD_NUMBER, card.identifiers.pan );
      this.addPlaceholder ( PlaceholderKey.CARD_CARDHOLDER_NAME, card.customer ? card.customer.getDisplayName () : null );
      this.addPlaceholder ( PlaceholderKey.CARD_CURRENT_BALANCE, card.amounts.currentBalance ? card.amounts.currentBalance.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CARD_DENOMINATION, card.amounts.denomination ? card.amounts.denomination.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CARD_INCOMM_STATUS, card.getStatusByPlatform ( PlatformType.INCOMM ) ? card.getStatusByPlatform ( PlatformType.INCOMM ).name : null );
      this.addPlaceholder ( PlaceholderKey.CARD_INITIAL_LOAD_AMOUNT, card.amounts.initialLoadAmount ? card.amounts.initialLoadAmount.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CARD_PENDING_AMOUNT, card.amounts.pendingAmount ? card.amounts.pendingAmount.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CARD_PIN, card.identifiers.pin );
      this.addPlaceholder ( PlaceholderKey.CARD_PLATFORM, card.platform );
      this.addPlaceholder ( PlaceholderKey.CARD_PLATFORM_STATUS, card.getStatusByPlatform ( card.platform ) ? card.getStatusByPlatform ( card.platform ).name : null );
      this.addPlaceholder ( PlaceholderKey.CARD_PRODUCT_CATEGORY, card.productCategory );
      this.addPlaceholder ( PlaceholderKey.CARD_PRODUCT_DESCRIPTION, card.productDescription );
      this.addPlaceholder ( PlaceholderKey.CARD_PRODUCT_GROUP, card.productGroup );
      this.addPlaceholder ( PlaceholderKey.CARD_PRODUCT_OWNER, card.productOwner );
      this.addPlaceholder ( PlaceholderKey.CARD_PRODUCT_TYPE, card.productType );
      this.addPlaceholder ( PlaceholderKey.CARD_SERIAL_NUMBER, card.identifiers.serialNumber );
      this.addPlaceholder ( PlaceholderKey.CARD_VAN, card.identifiers.van );
    }
  }

  private addPlaceholdersForCustomer ( customer: Customer ): void {
    if ( customer ) {
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_ACCOUNT_BALANCE, customer.accounts.spending.ledgerBalance ? customer.accounts.spending.ledgerBalance.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_ACCOUNT_NUMBER, customer.identifiers.accountNumber );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_AVAILABLE_BALANCE, customer.accounts.spending.availableBalance ? customer.accounts.spending.availableBalance.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_DISPLAY_NAME, customer.getDisplayName () );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_EMAIL_ADDRESS, customer.emailAddress );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_FIRST_NAME, customer.firstName );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_LAST_NAME, customer.lastName );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_ON_HOLD_AMOUNT, customer.accounts.spending.onHoldAmount ? customer.accounts.spending.onHoldAmount.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_ONLINE_USER_ID, customer.identifiers.onlineUserId );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_PRODUCT_CODE, customer.productCode );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_PRODUCT_NAME, customer.productName );
      this.addPlaceholder ( PlaceholderKey.CUSTOMER_PRODUCT_TYPE, customer.productType );
    }
  }

  private addPlaceholdersForLocation ( location: Location ): void {
    if ( location ) {
      this.addPlaceholder ( PlaceholderKey.LOCATION_NAME, location.name );
    }
  }

  private addPlaceholdersForOrder ( order: MaplesOrder ): void {
    if ( order ) {
      this.addPlaceholder ( PlaceholderKey.ORDER_CREATED_DATE, order.createdDate ? order.createdDate.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_DISCOUNT_AMOUNT, order.totals.discounted ? order.totals.discounted.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_GRAND_TOTAL, order.totals.grandTotal ? order.totals.grandTotal.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_INVOICED_TAX_AMOUNT, order.totals.tax ? order.totals.tax.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_NUMBER, order.number );
      this.addPlaceholder ( PlaceholderKey.ORDER_PURCHASE_FEES_AMOUNT, order.totals.purchaseFees ? order.totals.purchaseFees.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_PURCHASER_NAME, order.customer ? order.customer.getDisplayName () : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_REFUNDED_AMOUNT, order.totals.refunded ? order.totals.refunded.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_REFUNDED_FEES_AMOUNT, order.totals.refundedPurchaseFees ? order.totals.refundedPurchaseFees.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_REFUNDED_SHIPPING_AMOUNT, order.totals.refundedShippingFees ? order.totals.refundedShippingFees.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_SHIPPING_AMOUNT, order.totals.shippingFees ? order.totals.shippingFees.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_SUBTOTAL, order.totals.subtotal ? order.totals.subtotal.displayValue : null );
      this.addPlaceholder ( PlaceholderKey.ORDER_HANDLING_FEES_AMOUNT, order.totals.handlingFees ? order.totals.handlingFees.displayValue : null );
    }
  }
}
