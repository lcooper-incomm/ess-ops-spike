import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { FeePlan } from "../model/fee-plan";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { PlatformType } from "../platform/platform-type.enum";
import { RequestQueryParam } from "../routing/request-query-param.enum";

const build = map ( value => new FeePlan ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: FeePlan[] = [];
  values.forEach ( value => results.push ( new FeePlan ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerFeePlanService {

  constructor ( private http: HttpClient ) {
  }

  findAllByCustomerId ( id: string, platform: PlatformType = null, partner: string = null ): Observable<FeePlan[]> {
    let params = new HttpParams ();
    if ( platform ) {
      params = params.set ( RequestQueryParam.PLATFORM, platform );
    }
    if ( partner ) {
      params = params.set ( RequestQueryParam.PARTNER, partner );
    }
    return this.http.get ( `/rest/customer/${id}/fee-plan`, { params: params } )
      .pipe (
        catchError ( ( err, caught ) => {
          return of ( [] );
        } ),
        buildAll
      );
  }
}
