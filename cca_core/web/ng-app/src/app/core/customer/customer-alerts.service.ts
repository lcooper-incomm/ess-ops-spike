import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CustomerAlert, CustomerAlertsInfo } from "./customer-alert";

const build = map ( value => new CustomerAlert ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: CustomerAlert[] = [];
  values.forEach ( value => results.push ( new CustomerAlert ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerAlertsService {

  constructor ( private http: HttpClient ) {
  }

  findAllByCustomerId ( id: string ): Observable<CustomerAlertsInfo> {
    return this.http.get ( `/rest/customer/${id}/alert` )
      .pipe ( map ( ( data: any ) => {
        return new CustomerAlertsInfo ( data );
      } ) );
  }

  updateOne ( customerId: string, alertsInfo: CustomerAlertsInfo, alert: CustomerAlert ): Observable<any> {
    let request = {
      comment: 'Change initiated by CSR in CCA',
      alertInfo: {
        email: alertsInfo.email,
        phone: alertsInfo.phone,
        alerts: [
          alert
        ]
      }
    };

    return this.http.put ( `/rest/customer/${customerId}/alert`, request );
  }
}
