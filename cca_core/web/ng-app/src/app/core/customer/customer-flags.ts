export class CustomerFlags {

  allowCrossBinTransfer: boolean                   = false;
  isRegistered: boolean                            = false;
  isUpgradeEligible: boolean                       = false;
  isTokenProvisioningPermanentFraudOverrideEnabled: boolean = false;
  isTokenProvisioningOneTimeFraudOverrideEnabled: boolean = false;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
