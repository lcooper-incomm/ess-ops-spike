import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Selection, SelectionDataType } from '../model/selection';
import { map } from "rxjs/operators";
import { Logger } from "../../../logging/logger.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { SetSelectionDescriptionAction } from "../action/session-actions";
import * as _ from "lodash";
import { RequestQueryParam } from "../../routing/request-query-param.enum";

const build = map ( value => new Selection ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Selection<any>[] = [];
  values.forEach ( value => results.push ( new Selection ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class SelectionService {

  constructor ( private http: HttpClient,
                private logger: Logger,
                private store: Store<AppState> ) {
  }

  addOne ( sessionId: number, selection: Selection<SelectionDataType> ): Observable<Selection<SelectionDataType>> {
    var request = _.cloneDeep ( selection );
    delete request.data;
    delete request.selectedCard;

    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, selection.platform );

    return this.http.post ( `/rest/session/${sessionId}/selection`, request, { params: params } )
      .pipe ( build );
  }

  removeOne ( selectionId: number ): Observable<any> {
    if( selectionId ) {
      return this.http.delete(`/rest/selection/${selectionId}`);
    }
    return of( null );
  }

  updateDescription ( request: Selection<SelectionDataType> ): Observable<Selection<SelectionDataType>> {
    let newDescription = request.buildDescription ();
    if ( !newDescription ) {
      return of ( request );
    }

    //We only need to call the server if the description really is new or changed
    if ( !request.description || request.description !== newDescription ) {
      request.description = newDescription;
      return this.updateOne ( request )
        .pipe ( map ( selection => {
          this.store.dispatch ( new SetSelectionDescriptionAction ( selection ) );
          return selection;
        } ) );
    } else {
      return of ( request );
    }
  }

  updateOne ( selection: Selection<SelectionDataType> ): Observable<Selection<SelectionDataType>> {
    let request = _.omit ( selection, [
      'data',
      'alerts',
      'feePlans',
      'relatedCases',
      'hierarchy',
      'purchaseLocation',
      'purchaseOrder',
      'terminals'
    ] );
    return this.http.put ( '/rest/selection/' + request.id, request )
      .pipe ( build );
  }

}
