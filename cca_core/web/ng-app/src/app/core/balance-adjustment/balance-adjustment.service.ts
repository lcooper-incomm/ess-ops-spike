import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { BalanceAdjustmentActivity } from "../auth/balance-adjustment-activity";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CsCoreCurrency, CsCoreCurrencyUtil } from '@cscore/gringotts';
import { TransactionType } from '../transaction/transaction-type.enum';

const buildBalanceAdjustmentActivity = map ( value => new BalanceAdjustmentActivity ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class BalanceAdjustmentService {

  constructor ( private http: HttpClient ) {
  }

  findBalanceAdjustmentActivity (): Observable<BalanceAdjustmentActivity> {
    return this.http.get<BalanceAdjustmentActivity> ( '/rest/user/balanceAdjustmentActivity' )
      .pipe ( buildBalanceAdjustmentActivity );
  }

  static computeResultingBalance ( availableBalance: CsCoreCurrency, amount: number, adjustmentType: TransactionType ): CsCoreCurrency | null {
    const adjustmentScalar = this.getAdjustmentScalar ( adjustmentType );
    const adjustment       = adjustmentScalar && adjustmentScalar * amount;
    return adjustment && availableBalance ? CsCoreCurrencyUtil.add ( availableBalance, CsCoreCurrencyUtil.buildWithDescriptor ( adjustment, availableBalance.descriptor ) ) : null;
  }

  static getAdjustmentScalar ( adjustmentType: TransactionType ): number | null {
    switch ( adjustmentType ) {
      case TransactionType.CREDIT:
        return 1;
      case TransactionType.DEBIT:
        return -1;
      default:
        return null;
    }
  }
}
