import { CardsComponentCardType } from "./cards-component-card-type.enum";
import { CsCoreCurrency } from "@cscore/gringotts";

export class CardsComponentCard {

  id: number;
  cardSet: number;
  cardType: CardsComponentCardType;
  incommLoadAmount: CsCoreCurrency;
  isActivated: boolean            = false;
  isApproved: boolean             = false;
  isAwaitingItActivation: boolean = false;
  isCheckIssued: boolean          = false;
  isDeactivated: boolean          = false;
  isDenied: boolean               = false;
  isFundsRemoved: boolean         = false;
  isItActivated: boolean          = false;
  isLoaded: boolean               = false;
  isNeedingCheckIssued: boolean   = false;
  isNeedingReplacement: boolean   = false;
  isReplaced: boolean             = false;
  isSeekingApproval: boolean      = false;
  isShipped: boolean              = false;
  lastFour: string;
  merchantLoadAmount: CsCoreCurrency;
  note: string;
  recoveredAmount: CsCoreCurrency;
  selectionId: number;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.cardType ) {
        this.cardType = CardsComponentCardType[ <string> data.cardType ];
      }
      if ( data.incommLoadAmount ) {
        this.incommLoadAmount = new CsCoreCurrency ( data.incommLoadAmount );
      }
      if ( data.merchantLoadAmount ) {
        this.merchantLoadAmount = new CsCoreCurrency ( data.merchantLoadAmount );
      }
      if ( data.recoveredAmount ) {
        this.recoveredAmount = new CsCoreCurrency ( data.recoveredAmount );
      }
    }
  }

  needsWork (): boolean {
    var isComplete = true;

    switch ( this.cardType ) {
      case CardsComponentCardType.ACTIVE:
        isComplete = this.isDeactivated && this.isFundsRemoved;
        break;
      case CardsComponentCardType.INACTIVE:
        isComplete = (this.isAwaitingItActivation && this.isItActivated)
          || (this.isSeekingApproval && this.isDenied)
          || (this.isSeekingApproval && this.isApproved && this.isActivated)
          || (this.isSeekingApproval && this.isApproved && this.isNeedingReplacement && this.isReplaced)
          || (this.isSeekingApproval && this.isApproved && this.isNeedingCheckIssued && this.isCheckIssued);
        break;
      case CardsComponentCardType.REPLACEMENT:
        isComplete = this.isLoaded && this.isShipped;
        break;
    }
    return !isComplete;
  }
}
