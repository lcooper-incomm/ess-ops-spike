import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Logger } from "../../logging/logger.service";
import { Issue } from '../issue/issue';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { SearchTypeContainer } from "./search-type-container";
import { SearchParameterValueType } from "./search-type/search-parameter-value-type.enum";
import { mapToObject } from "../utils/cca-utils";

const build = map ( value => new Issue ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Issue[] = [];
  values.forEach ( value => results.push ( new Issue ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class IssueSearchService {

  constructor ( private http: HttpClient,
                private logger: Logger ) {
  }

  findOne ( issueId: string ): Observable<Issue> {
    return this.http.get ( `/rest/issue/${issueId}` )
      .pipe ( build, this.logFindOnePipe );
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<Issue[]> {
    //If searching by issueId, wrap findOne()
    if ( searchTypeContainer.parameters.get ( SearchParameterValueType.ISSUE_ID ) ) {
      return this.findOne ( searchTypeContainer.parameters.get ( SearchParameterValueType.ISSUE_ID ) )
        .pipe ( map ( ( value: Issue ) => {
          let results = [];
          if ( value ) {
            results.push ( value );
          }
          return results;
        } ) )
    }
    //Else, search normally
    else {
      return this.http.post ( '/rest/issue/search', mapToObject ( searchTypeContainer.parameters ) )
        .pipe ( buildAll, this.logSearchPipe );
    }
  }

  private logFindOnePipe = map ( ( value: Issue ) => {
    this.logger.info ( 'Completed Issue Lookup', value );
    return value;
  } );

  private logSearchPipe = map ( ( values: Issue[] ) => {
    this.logger.info ( 'Completed Issue Search', values );
    return values;
  } );

}
