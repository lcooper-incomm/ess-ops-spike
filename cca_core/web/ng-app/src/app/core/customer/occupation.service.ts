import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Occupation } from "./occupation";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { Observable, of } from "rxjs";
import { SupportState } from "../support/support-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { LoadOccupationsAction } from "../support/support-actions";

const buildAll = map ( ( values: any[] ) => {
  let results: Occupation[] = [];
  values.forEach ( value => results.push ( new Occupation ( {
    name: value.description,
    type: value.code
  } ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class OccupationService {

  constructor ( private http: HttpClient,
                private store: Store<AppState> ) {
  }

  findAll (): Observable<Occupation[]> {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    if ( supportState.occupations.length ) {
      return of ( supportState.occupations );
    } else {
      return this.http.get ( '/rest/occupation' )
        .pipe ( map ( ( values: any[] ) => {
          let results: Occupation[] = [];
          values.forEach ( value => results.push ( new Occupation ( {
            name: value.description,
            type: value.code
          } ) ) );
          this.store.dispatch ( new LoadOccupationsAction ( results ) );
          return results;
        } ) );
    }
  }
}
