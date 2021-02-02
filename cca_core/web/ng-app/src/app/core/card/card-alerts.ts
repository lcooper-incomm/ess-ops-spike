export class CardAlerts {

  isActive: boolean                 = false;
  isB2B: boolean                    = false;
  isB2C: boolean                    = false;
  isBinReplacementEligible: boolean = false;
  isDigitalProduct: boolean         = false;
  isDisabled: boolean               = false;
  isHidden: boolean                 = false;
  isMultipack: boolean              = false;
  isPassthru: boolean               = false;
  isPinSet: boolean                 = false;
  isRenewable: boolean              = false;
  isShipped: boolean                = false;
  isStarterCard: boolean            = false;
  isVariable: boolean               = false;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
