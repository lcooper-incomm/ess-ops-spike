import { CsCoreCurrency } from "@cscore/gringotts";
import { CsCorePhoneNumber } from "@cscore/core-client-model";

export class CustomerAlert {

  id: string;
  description: string;
  name: string;
  type: string;
  value: CsCoreCurrency;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.value ) {
        this.value = new CsCoreCurrency ( data.value );
      }
    }
  }
}

export enum CustomerAlertType {
  BOTH   = 'BOTH',
  EMAIL  = 'EMAIL',
  MOBILE = 'MOBILE',
  OFF    = 'OFF'
}

export class CustomerAlertsInfo {
  email: string;
  phone: CsCorePhoneNumber;

  alerts: CustomerAlert[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.alerts = [];

      if ( data.phone ) {
        this.phone = new CsCorePhoneNumber ( data.phone );
      }
      if ( data.alerts ) {
        data.alerts.forEach ( ( alert ) => this.alerts.push ( new CustomerAlert ( alert ) ) );
      }
    }
  }
}
