import { AccountAlerts } from "./account-alerts";
import { AccountAmounts } from "./account-amounts";
import { AccountFees } from "./account-fees";
import { AccountIdentifiers } from "./account-identifiers";
import { AccountLimits } from "./account-limits";
import { AccountNodes } from "./account-nodes";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { PlatformType } from "../platform/platform-type.enum";
import { CsCoreStatus } from "../model/cs-core-status";
import { Transaction } from "../transaction/transaction";
import { CsCoreCurrency } from "@cscore/gringotts";
import { AccountFeeType } from "./account-fee-type.enum";

export class Account {

  alerts: AccountAlerts;
  amounts: AccountAmounts;
  createDate: CsCoreTimestamp;
  description: string;
  fees: AccountFees;
  identifiers: AccountIdentifiers;
  limits: AccountLimits;
  nodes: AccountNodes;
  platform: PlatformType;
  status: CsCoreStatus;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      this.alerts      = new AccountAlerts ( data.alerts );
      this.amounts     = new AccountAmounts ( data.amounts );
      this.fees        = new AccountFees ( data.fees );
      this.identifiers = new AccountIdentifiers ( data.identifiers );
      this.limits      = new AccountLimits ( data.limits );
      this.nodes       = new AccountNodes ( data.nodes );

      if ( data.createDate ) {
        this.createDate = new CsCoreTimestamp ( data.createDate );
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.status ) {
        this.status = new CsCoreStatus ( data.status );
      }
    }
  }

  /**
   * We are, for some inexplicable reason, left to calculate both the transaction fee AND transaction total on our own.
   * To do so, we need both the Account and the Transaction, as the AccountFees dictates what the fee is. If it's a
   * CONVENIENCE_FEE or FIXED_TRANSACTION_FEE, it's a flat rate. But if it's a PERCENTAGE_TRANSACTION_FEE, we need to
   * calculate from the percentage on the Account against the Transaction's authorizedAmount...
   */
  getTransactionFee ( transaction: Transaction ): CsCoreCurrency {
    let fee: CsCoreCurrency;

    switch ( this.fees.type ) {
      case AccountFeeType.CONVENIENCE_FEE:
        fee = this.fees.convenienceFee;
        break;
      case AccountFeeType.FIXED_TRANSACTION_FEE:
        fee = this.fees.fixedTransactionFee;
        break;
      case AccountFeeType.PERCENTAGE_TRANSACTION_FEE:
        if ( transaction.amounts.authorizedAmount ) {
          const percentage = this.fees.percentageTransactionFee;
          const amount     = transaction.amounts.authorizedAmount.value;
          if ( amount ) {
            let feeAmount = amount * (percentage / 100);
            fee           = new CsCoreCurrency ( {
              displayValue: `$${feeAmount.toFixed ( 2 )}`,
              value: feeAmount
            } );
          }
        }
        break;
      default:
        break;
    }

    return fee;
  }
}
