import { CsCoreCurrency } from "@cscore/gringotts";
import { CustomerAccountType } from "./customer-account-type.enum";

export class AccountBalanceDetail {

  accountNumber: string;
  availableBalance: CsCoreCurrency;
  completedTransfers: string;
  interestRate: string;
  ledgerBalance: CsCoreCurrency;
  onHoldAmount: CsCoreCurrency;
  proxyNumber: string;
  remainingTransfers: string;
  routingNumber: string;
  type: CustomerAccountType;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.availableBalance ) {
        this.availableBalance = new CsCoreCurrency ( data.availableBalance );
      }
      if ( data.ledgerBalance ) {
        this.ledgerBalance = new CsCoreCurrency ( data.ledgerBalance );
      }
      if ( data.onHoldAmount ) {
        this.onHoldAmount = new CsCoreCurrency ( data.onHoldAmount );
      }
      if ( data.type ) {
        this.type = CustomerAccountType[ <string> data.type ];
      }
    }
  }
}
