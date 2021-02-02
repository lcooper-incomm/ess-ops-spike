import { CsCoreTimestamp } from "@cscore/core-client-model";
import { FeeDetail } from "./fee-detail";

export class FeePlan {

  id: string;
  description: string;
  isActive: boolean = false;
  effectiveDate: CsCoreTimestamp;

  feeDetails: FeeDetail[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.feeDetails = [];
      if ( data.effectiveDate ) {
        this.effectiveDate = new CsCoreTimestamp ( data.effectiveDate );
      }

      if ( data.feeDetails ) {
        data.feeDetails.forEach ( ( detail: any ) => this.feeDetails.push ( new FeeDetail ( detail ) ) );
      }
    }
  }

  getFeeDetailByDescription ( description: string ): FeeDetail {
    return this.feeDetails.find ( ( feeDetail: FeeDetail ) => {
      return feeDetail.description === description;
    } );
  }

  getFeeDetailByType ( type: string ): FeeDetail {
    return this.feeDetails.find ( ( feeDetail: FeeDetail ) => {
      return feeDetail.type === type;
    } );
  }
}

/**
 * This more closely matches the APLS FeePlan model, and is used only as a request object, not a response object.
 */
export class FlatFeePlan {

  id: string;
  effectiveDate: number;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
