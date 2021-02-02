import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { PlatformType } from "../platform/platform-type.enum";
import { map } from "rxjs/operators";
import { CsCoreStatus } from "../model/cs-core-status";

const build = map ( value => value ? new CsCoreStatus ( value ) : null );

@Injectable ( {
  providedIn: 'root'
} )
export class LookupService {

  constructor ( private http: HttpClient ) {
  }

  cardNumberLookup ( identifierType, identifier, platform: PlatformType ): Observable<string[]> {
    let params = new HttpParams ()
      .set ( 'platform', platform );
    return this.http.get<string[]> ( `/rest/lookup/card-number/${identifierType}/${identifier}`, { params: params } );
  }

  cardStatusLookup ( identifierType, identifier, platform: PlatformType ): Observable<CsCoreStatus> {
    let params = new HttpParams ()
      .set ( 'platform', platform );
    return this.http.get<CsCoreStatus> ( `/rest/lookup/status/${identifierType}/${identifier}`, { params: params } )
      .pipe ( build );
  }

}
