import { FlatCardHolder } from './greencard-action-request-models';
import { CsCoreCurrency } from "@cscore/gringotts";

export abstract class GreencardActionResponse {
  protected constructor ( data?: { [ key: string ]: string } ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class ActivateGiftCardReplacementResponse extends GreencardActionResponse {
  cardStatus: CardStatus;
  reason: string;
  serialNumber: string;
  success: boolean;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );
  }
}

export class ActivateB2bCardResponse extends ActivateGiftCardReplacementResponse {
  pin: string;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );
  }
}

export class AdjustGreencardBalanceResponse extends GreencardActionResponse {
  amounts: GreencardBalanceAdjustmentAmounts;
  reason: string;
  success: boolean;
  serialNumber: string;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );

    if ( data && data.amounts ) {
      this.amounts = new GreencardBalanceAdjustmentAmounts ( data.amounts );
    }
  }
}

export class GreencardBalanceAdjustmentAmounts extends GreencardActionResponse {
  available: CsCoreCurrency;
  pending: CsCoreCurrency;

  constructor ( data?: { [ key: string ]: string } ) {
    super ( data );

    if ( data ) {
      if ( data.available ) {
        this.available = new CsCoreCurrency ( data.available );
      }
      if ( data.pending ) {
        this.pending = new CsCoreCurrency ( data.pending );
      }
    }
  }
}

export class ProgramLimits extends GreencardActionResponse {
  availableBalance: CsCoreCurrency;
  dailyLimit: CsCoreCurrency;
  isSuccess: boolean = false;
  lifeHighAvailableBalance: CsCoreCurrency;
  overallLimit: CsCoreCurrency;
  pendingBalance: CsCoreCurrency;
  serialNumber: string;
  transactionLimit: CsCoreCurrency;
  velocityLimit: CsCoreCurrency;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );
    if ( data ) {
      if ( data.availableBalance ) {
        this.availableBalance = new CsCoreCurrency ( data.availableBalance );
      }
      if ( data.dailyLimit ) {
        this.dailyLimit = new CsCoreCurrency ( data.dailyLimit );
      }
      if ( data.lifeHighAvailableBalance ) {
        this.lifeHighAvailableBalance = new CsCoreCurrency ( data.lifeHighAvailableBalance );
      }
      if ( data.overallLimit ) {
        this.overallLimit = new CsCoreCurrency ( data.overallLimit );
      }
      if ( data.pendingBalance ) {
        this.pendingBalance = new CsCoreCurrency ( data.pendingBalance );
      }
      if ( data.transactionLimit ) {
        this.transactionLimit = new CsCoreCurrency ( data.transactionLimit );
      }
      if ( data.velocityLimit ) {
        this.velocityLimit = new CsCoreCurrency ( data.velocityLimit );
      }
    }
  }
}

export class GiftCardReplacementResponse extends GreencardActionResponse {
  cardHolder: FlatCardHolder;
  cardStatus: CardStatus;
  reason: string;
  replacedSerialNumber: string;
  serialNumber: string;
  success: boolean;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );
  }
}

export interface CardStatus {
  code: string;
  description: string;
}

export class ReleasePreAuthResponse extends GreencardActionResponse {
  accLogId: string;
  isSuccess: boolean;
  reason: string;
  releasedAmount: CsCoreCurrency;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );

    if ( data && data.releasedAmount ) {
      this.releasedAmount = new CsCoreCurrency ( data.releasedAmount );
    }
  }
}

export class StatusChangeResponse extends GreencardActionResponse {
  cardStatus: CardStatus;

  constructor ( data ) {
    super ( data );

  }
}

export interface TransferCardResponse {
  parentPANNumber: string;
  childPANNumber: string;
  success: boolean;
  parentCardStatus: string;
  childCardStatus: string;
  childCardBalance: string;
  reason: string;
}
