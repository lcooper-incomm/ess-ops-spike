import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { PlatformType } from "./platform-type.enum";
import { Observable, of } from "rxjs";
import { PlatformStatusValue } from "./platform-status-value";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { SupportState } from "../support/support-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { LoadPlatformStatusValuesAction } from "../support/support-actions";

const build = map ( value => new PlatformStatusValue ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: PlatformStatusValue[] = [];
  values.forEach ( value => results.push ( new PlatformStatusValue ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class PlatformStatusValueService {

  constructor ( private http: HttpClient,
                private store: Store<AppState> ) {
  }

  findAll ( platform: PlatformType = null ): Observable<PlatformStatusValue[]> {
    if ( platform ) {
      let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
      let values                     = supportState.platformStatusValues.get ( platform );
      if ( values && values.length ) {
        return of ( values );
      }
    }

    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.get ( '/rest/platform-status', { params: params } )
      .pipe (
        buildAll,
        map ( ( values: PlatformStatusValue[] ) => {
          if ( platform ) {
            this.store.dispatch ( new LoadPlatformStatusValuesAction ( values ) );
          }
          return values;
        } )
      );
  }
}
