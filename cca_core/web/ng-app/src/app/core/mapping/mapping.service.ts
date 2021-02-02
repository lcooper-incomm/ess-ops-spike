import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActionReasonCodeMapping, ActionReasonCodeMappingType } from "./action-reason-code-mapping";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PlatformType } from "../platform/platform-type.enum";
import { RequestQueryParam } from "../routing/request-query-param.enum";

const build = map ( ( value: any ) => new ActionReasonCodeMapping ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: ActionReasonCodeMapping[] = [];
  values.forEach ( value => results.push ( new ActionReasonCodeMapping ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class MappingService {

  constructor ( private http: HttpClient ) {
  }

  addOne ( request: ActionReasonCodeMapping ): Observable<ActionReasonCodeMapping> {
    return this.http.post ( '/rest/mapping/action-reason-code', request )
      .pipe ( build );
  }

  deleteOne ( id: number ): Observable<any> {
    return this.http.delete ( `/rest/mapping/action-reason-code/${id}` );
  }

  findAll ( type: ActionReasonCodeMappingType = null, platform: PlatformType = null ): Observable<ActionReasonCodeMapping[]> {
    let params = new HttpParams ()
      .set ( 'type', type )
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.get ( '/rest/mapping/action-reason-code', { params: params } )
      .pipe ( buildAll );
  }

  findOne ( id: number ): Observable<ActionReasonCodeMapping> {
    return this.http.get ( `/rest/mapping/action-reason-code/${id}` )
      .pipe ( build );
  }

  updateOne ( request: ActionReasonCodeMapping ): Observable<ActionReasonCodeMapping> {
    return this.http.put ( `/rest/mapping/action-reason-code/${request.id}`, request )
      .pipe ( build );
  }
}
