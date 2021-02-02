import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Property } from '../model/property';
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { SupportState } from "../support/support-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import * as _ from "lodash";
import { PropertyType } from "../model/property-type.enum";
import { GenericMessageView } from "../generic-message-view";

const build = map ( value => new Property ( value ) );

const buildMessageView = map ( value => new GenericMessageView ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Property[] = [];
  values.forEach ( value => results.push ( new Property ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class PropertyService {

  constructor ( private http: HttpClient,
                private store: Store<AppState> ) {
  }

  findAll (): Observable<Property[]> {
    return this.http.get<Property[]> ( '/rest/property' )
      .pipe ( buildAll );
  }

  findOneValueFromSnapshot ( systemName: PropertyType, isArray: boolean = false ): any {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    if ( supportState ) {
      let property = _.find ( supportState.properties, ( property: Property ) => {
        return property.systemName === systemName;
      } );
      if ( property ) {
        if ( isArray ) {
          let values = [];
          let parts  = property.value.split ( ',' );
          parts.forEach ( ( part: string ) => {
            values.push ( part.trim () );
          } );
          return values;
        }
        return property.value;
      }
    }
    return null;
  }

  getLoggingLevel ( level ): Observable<GenericMessageView> {
    return this.http.get<GenericMessageView> ( `/rest/property/${level}` )
      .pipe ( buildMessageView );
  }

  update ( id, request ): Observable<Property> {
    return this.http.put<Property> ( `/rest/property/${id}`, request )
      .pipe ( build );
  }

  updateLoggingInformationLevel ( level ): Observable<Property> {
    return this.http.put<Property> ( `/rest/property/logging-information-level/${level}`, null )
      .pipe ( build );
  }

  updateLoggingLevel ( level ): Observable<Property> {
    return this.http.put<Property> ( `/rest/property/logging-level/${level}`, null )
      .pipe ( build );
  }

  updateLoggingMaskingLevel ( level ): Observable<Property> {
    return this.http.put<Property> ( `/rest/property/logging-masking-level/${level}`, null )
      .pipe ( build );
  }

}
