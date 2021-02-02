import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuditActivityType } from "./audit-activity-type.enum";
import { IdentifierType } from "../session/model/identifier-type.enum";
import { PlatformType } from "../platform/platform-type.enum";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { map } from "rxjs/operators";
import { AuditActivity } from "./audit-activity";
import { AuditCardReplacementActivity } from "./audit-card-replacement-activity";

const build = map ( value => new AuditActivity ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: AuditActivity[] = [];
  values.forEach ( value => results.push ( new AuditActivity ( value ) ) );
  return results;
} );

const buildCardReplacementActivity = map ( value => value ? new AuditCardReplacementActivity ( value ) : null );

@Injectable ( {
  providedIn: 'root'
} )
export class AuditService {

  constructor ( private http: HttpClient ) {
  }

  addOne ( type: AuditActivityType ): Observable<any> {
    let request = {
      activityDate: new Date (),
      type: type
    };

    return this.http.post ( '/rest/audit', request );
  }

  findLastCardReplacementActivity ( identifierType: IdentifierType, identifier: string, platform: PlatformType ): Observable<AuditCardReplacementActivity> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.IDENTIFIER_TYPE, identifierType )
      .set ( RequestQueryParam.IDENTIFIER, identifier )
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.get ( '/rest/audit/last-card-replacement-activity', { params: params } )
      .pipe ( buildCardReplacementActivity );
  }
}
