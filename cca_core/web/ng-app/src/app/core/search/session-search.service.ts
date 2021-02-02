import { Injectable } from '@angular/core';
import { SearchTypeContainer } from "./search-type-container";
import { Observable } from "rxjs";
import { Session } from "../session/model/session";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Logger } from "../../logging/logger.service";
import { SessionService } from "../session/session.service";

const build = map ( value => new Session ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Session[] = [];
  values.forEach ( value => results.push ( new Session ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class SessionSearchService {

  constructor ( private http: HttpClient,
                private logger: Logger,
                private sessionService: SessionService ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<Session[]> {
    let request: any = {
      sessionClass: searchTypeContainer.parameters.get ( 'sessionClass' )
    };

    if ( searchTypeContainer.parameters.get ( 'sid' ) ) {
      request.sid = searchTypeContainer.parameters.get ( 'sid' );
    } else if ( searchTypeContainer.parameters.get ( 'serialNumber' ) ) {
      request.identifierType = 'SERIALNUMBER';
      request.identifier     = searchTypeContainer.parameters.get ( 'serialNumber' );
    } else if ( searchTypeContainer.parameters.get ( 'van' ) ) {
      request.identifierType = 'VAN';
      request.identifier     = searchTypeContainer.parameters.get ( 'van' );
    }

    return this.http.post ( '/rest/session/search', request )
      .pipe ( buildAll, this.postProcessPipe, this.logSearchPipe );
  }

  private logSearchPipe = map ( ( values: Session[] ) => {
    this.logger.info ( 'Completed Session Search', values );
    return values;
  } );

  private postProcessPipe = map ( ( values: Session[] ) => {
    values.forEach ( ( session: Session ) => this.sessionService.postProcessSession ( session ) );
    return values;
  } );
}
