import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MaplesOrderNotification } from "@cscore/maples-client-model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MaplesPartner } from "@cscore/maples-client-model";
import { RequestQueryParam } from "../../../core/routing/request-query-param.enum";
import { PlatformType } from "../../../core/platform/platform-type.enum";

const build = map ( value => new MaplesOrderNotification ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class OrderNotificationsService {

  constructor ( private http: HttpClient ) {
  }

  public findOne ( id: number, partner: MaplesPartner = null ): Observable<MaplesOrderNotification> {
    let params = this.buildParameters ( partner );
    return this.http.get ( `/rest/order/notification/${id}`, { params: params } )
      .pipe ( build );
  }

  public resendOne ( id: number, partner: MaplesPartner ): Observable<MaplesOrderNotification> {
    let params = this.buildParameters ( partner );
    return this.http.post ( `/rest/order/notification/${id}`, null, { params: params } )
      .pipe ( build );
  }

  private buildParameters ( partner: MaplesPartner ): HttpParams {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, partner ? PlatformType.BOL : PlatformType.ECOMM );
    if ( partner ) {
      params = params.set ( RequestQueryParam.PARTNER, partner );
    }
    return params;
  }
}
