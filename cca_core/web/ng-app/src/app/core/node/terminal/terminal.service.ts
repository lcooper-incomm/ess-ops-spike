import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Terminal } from "./terminal";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericMessageView } from "../../generic-message-view";

const build = map ( value => new Terminal ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Terminal[] = [];
  values.forEach ( value => results.push ( new Terminal ( value ) ) );
  return results;
} );

const buildMessage = map ( value => new GenericMessageView ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class TerminalService {

  constructor ( private http: HttpClient ) {
  }

  findAllByLocationId ( locationId: string ): Observable<Terminal[]> {
    return this.http.get ( `/rest/location/${locationId}/terminal` )
      .pipe ( buildAll );
  }

  getChallengePassword ( terminalKey: string ): Observable<GenericMessageView> {
    return this.http.get ( `/rest/terminal/challenge/${terminalKey}` )
      .pipe ( buildMessage );
  }
}
