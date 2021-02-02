import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { PlatformType } from "../platform/platform-type.enum";
import { Observable } from "rxjs";
import { CustomerAccountLimit } from "./customer-account-limit";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { map } from "rxjs/operators";

const build = map ( value => new CustomerAccountLimit ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: CustomerAccountLimit[] = [];
  values.forEach ( value => results.push ( new CustomerAccountLimit ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerAccountLimitService {

  constructor ( private http: HttpClient ) {
  }

  findAllByCustomerId ( customerId: string, platform: PlatformType ): Observable<CustomerAccountLimit[]> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.get ( `/rest/customer/${customerId}/limit` )
      .pipe ( buildAll );
  }
}
