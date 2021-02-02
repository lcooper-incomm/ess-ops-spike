import { CustomerAccountLimitAmounts } from "./customer-account-limit-amounts";
import * as _ from "lodash";

export class CustomerAccountLimit {

  id: string;
  amounts: CustomerAccountLimitAmounts;
  groupName: string;

  velocities: CustomerVelocity[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.velocities = [];

      if ( data.amounts ) {
        this.amounts = new CustomerAccountLimitAmounts ( data.amounts );
      }
      if ( data.velocities ) {
        data.velocities.forEach ( velocity => this.velocities.push ( new CustomerVelocity ( velocity ) ) );
      }
    }
  }

  getVelocityByType ( type: string ): CustomerVelocity {
    return _.find ( this.velocities, ( velocity: CustomerVelocity ) => {
      return velocity.type === type;
    } );
  }
}

export class CustomerVelocity {

  count: CustomerVelocityCount;
  type: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.count ) {
        this.count = new CustomerVelocityCount ( data.count );
      }
    }
  }
}

export class CustomerVelocityCount {

  remaining: string;
  total: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
