import { Injectable } from '@angular/core';
import { CsCoreCurrency } from "@cscore/gringotts";
import { Selection } from '../session/model/selection';
import { Customer } from '../customer/customer';

@Injectable ( {
  providedIn: 'root'
} )
export class CardUpgradeUtilityService {

  constructor () {
  }

  getUpgradeFeeDisplayValue ( selection: Selection<Customer> ): string {
    let feeValue = null;

    let amount = this.getAmount ( selection );
    if ( amount ) {
      feeValue = amount.displayValue;
    }
    return feeValue;
  }

  getUpgradeFeeValue ( selection: Selection<Customer> ): number {
    let feeValue = null;

    let amount = this.getAmount ( selection );
    if ( amount ) {
      feeValue = amount.value
    }

    return feeValue;
  }

  private getAmount ( selection: Selection<Customer> ): CsCoreCurrency {
    let amount: CsCoreCurrency;

    const activeFeePlan = selection.getActiveFeePlan ();
    if ( activeFeePlan ) {
      let description = activeFeePlan.description;//'INTERNATIONAL ATM CASH WDL FEE'//
      //Check to see if the description exists in the feeDetails and if so get the feeValue
      const feeDetail = activeFeePlan.getFeeDetailByDescription ( description );
      if ( feeDetail ) {
        amount = feeDetail.amount;
      }
    }

    return amount;
  }

  getCardBalance ( selection: Selection<Customer> ): number {
    return selection.getCustomer ().accounts.spending.availableBalance.value;
  }

  hasSufficientFunds ( feeValue: number, balance: number ): boolean {
    return feeValue < balance;
  }
}
