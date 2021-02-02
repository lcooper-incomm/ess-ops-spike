import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Account } from "../account/account";
import { HttpClient } from "../../../../node_modules/@angular/common/http";
import { Logger } from "../../logging/logger.service";
import { SearchTypeContainer } from "./search-type-container";
import { Observable } from "rxjs";
import { SearchParameterValueType } from "./search-type/search-parameter-value-type.enum";

const build = map ( value => new Account ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Account[] = [];
  values.forEach ( value => results.push ( new Account ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class AccountSearchService {

  constructor ( private http: HttpClient,
                private logger: Logger ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<Account[]> {
    return this.http.get ( `/rest/account/${searchTypeContainer.parameters.get ( SearchParameterValueType.ACCOUNT_NUMBER )}` )
      .pipe ( buildAll, this.logSearchPipe );
  }

  private logSearchPipe = map ( ( values: Account[] ) => {
    this.logger.info ( 'Completed Account Search', values );
    return values;
  } );

}
