import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Hierarchy } from "./hierarchy";
import { map } from "rxjs/operators";

const build = map ( value => new Hierarchy ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Hierarchy[] = [];
  values.forEach ( value => results.push ( new Hierarchy ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class HierarchyService {

  constructor ( private http: HttpClient ) {
  }

  findOne ( nodeTypeName: string, nodeId: string, isLegacy: Boolean = false ): Observable<Hierarchy> {
    let params = new HttpParams ()
      .set ( 'isLegacy', isLegacy.toString () );

    return this.http.get ( `/rest/hierarchy/${nodeTypeName}/${nodeId}`, { params: params } )
      .pipe ( build );
  }
}
