import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  MaplesAccountAdjustBalanceRequest,
  MaplesAccountChangeStatusRequest,
  MaplesAccountCode,
  MaplesResultMessageResponse,
  MaplesActionsAdjustBalance,
  MaplesPlatform
} from '@cscore/maples-client-model';
import {Account} from './account';
import {Logger} from '../../logging/logger.service';
import {RequestQueryParam} from '../routing/request-query-param.enum';

const build = map ( value => new Account ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class AccountService {

  constructor ( private http: HttpClient,
                private logger: Logger ) {
  }

  findOneByAccountNumber ( accountNumber: string ): Observable<Account> {
    return this.http.get ( `/rest/account/${accountNumber}` )
      .pipe (
        map ( ( results: any[] ) => {
          if ( results.length === 1 ) {
            return results[ 0 ];
          } else {
            this.logger.error ( 'Expected single result for Account lookup', results );
            return null;
          }
        } ),
        build
      );
  }
}
