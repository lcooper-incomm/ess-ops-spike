import { Injectable } from '@angular/core';
import { PlatformType } from "../platform/platform-type.enum";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { MaplesPartner } from "@cscore/maples-client-model";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { MaplesQuote } from '@cscore/maples-client-model';

const build = map ( value => value ? new MaplesQuote ( value ) : null );

@Injectable ( {
  providedIn: 'root'
} )
export class QuoteService {

  constructor ( private http: HttpClient ) {
  }

  findOneById ( identifier: string, platform: PlatformType, partner: MaplesPartner = null ): Observable<MaplesQuote> {
    let params = new HttpParams ()
      .set ( 'platform', platform );

    if ( partner ) {
      params = params.set ( RequestQueryParam.PARTNER, partner );
    }

    return this.http.get ( `/rest/quote/${identifier}`, { params: params } )
      .pipe ( build );
  }
}
