import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { CustomerComponent } from "../../../model/customer-component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const build = map ( value => new CustomerComponent ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerComponentService {

  constructor ( private http: HttpClient ) {
  }

  updateOne ( request: CustomerComponent ): Observable<CustomerComponent> {
    return this.http.put<CustomerComponent> ( '/rest/customer-component/' + request.id, request )
      .pipe ( build );
  }
}
