import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {RequestQueryParam} from "../../../core/routing/request-query-param.enum";
import {CardStatusResponseValue} from "./card-status-response-value";
import {map} from "rxjs/operators";

const build = map ( value => new CardStatusResponseValue ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class OrderItemsService {

  constructor ( private http: HttpClient ) {
  }

  public findStatus ( serialNumber: string ): Observable<CardStatusResponseValue> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PARTNER, 'INCOMM' )
      .set ( RequestQueryParam.PLATFORM, 'VMS' );
    return this.http.get ( `/rest/card/status/serialNumber/${serialNumber}`, { params: params } )
      .pipe ( build );
  }
}
