import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ProductCode } from "../../services/services/order-new-card/order-new-card-wizard/order-new-card-form-page/order-new-card-form-page.component";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { map } from "rxjs/operators";

const buildAll = map ( ( values: any[] ) => {
  let results: ProductCode[] = [];
  values.forEach ( value => results.push ( new ProductCode ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class FsapiProductCodeService {

  constructor ( private http: HttpClient ) {
  }

  getActiveProductCodes ( partner ): Observable<ProductCode[]> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PARTNER, partner );

    return this.http.get ( `/rest/vms-product-code/active`, { params: params } )
      .pipe ( buildAll );
  }

}
