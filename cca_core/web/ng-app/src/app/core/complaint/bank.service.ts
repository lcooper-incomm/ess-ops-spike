import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Bank } from "./bank";
import { map } from "rxjs/operators";

const buildAll = map ( ( values: any[] ) => {
  let views: Bank[] = [];
  if ( values ) {
    values.forEach ( value => views.push ( new Bank ( value ) ) );
  }
  return views;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class BankService {

  constructor ( private http: HttpClient ) {
  }

  findAll (): Observable<Bank[]> {
    return this.http.get ( '/rest/bank' )
      .pipe ( buildAll );
  }
}
