import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { map } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { AppStateType } from "../app-state-type.enum";
import { CodexState } from "./codex-state";
import { LoadCodexAction } from "./action/load-codex-action";
import { Logger } from "../logging/logger.service";
import { snapshot } from "../core/store-utils/store-utils";
import { Codex, CodexRunner } from "@cscore/codex";

const build = map ( value => new Codex ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CodexService {

  constructor ( private codexRunner: CodexRunner,
                private http: HttpClient,
                private logger: Logger,
                private store: Store<AppState> ) {
  }

  loadOne ( name: string ): Observable<Codex> {
    //Try first from codexState
    const codexState: CodexState = snapshot ( this.store, AppStateType.CODEX_STATE );
    const codex: Codex           = codexState.codexIndex.get ( name );
    if ( codex ) {
      return of ( codex );
    }
    //And if we don't find it there, load from server
    else {
      return this.findOne ( name )
        .pipe ( map ( ( codex: Codex ) => {
          this.store.dispatch ( new LoadCodexAction ( codex ) );
          return codex;
        } ) );
    }
  }

  runOne<T> ( name: string, seed: T ): Observable<T> {
    return this.loadOne ( name )
      .pipe ( map ( ( codex: Codex ) => {
        if ( !codex ) {
          const message = `No Codex found with this name: ${name}`;
          this.logger.error ( message );
          throw new Error ( message );
        }
          return this.codexRunner.run ( codex, seed );
        }
      ) );
  }

  private findOne ( id: number | string ): Observable<Codex> {
    return this.http.get ( '/rest/codex/' + id )
      .pipe ( build );
  }

}
