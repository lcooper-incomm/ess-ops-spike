import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ReceiptComponent } from "../../../model/receipt-component";
import { map } from "rxjs/operators";
import { ReceiptComponentCard } from "../../../model/receipt-component-card";

const build = map ( value => new ReceiptComponent ( value ) );

const buildCard = map ( value => new ReceiptComponentCard ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class ReceiptComponentService {

  constructor ( private http: HttpClient ) {
  }

  addOneCard ( componentId: number, request: any ): Observable<ReceiptComponentCard> {
    return this.http.post ( '/rest/receipt-component/' + componentId + '/card', request )
      .pipe ( buildCard );
  }

  deleteOneCard ( id: number ): Observable<any> {
    return this.http.delete ( '/rest/receipt-component/card/' + id );
  }

  updateOne ( request: any ): Observable<ReceiptComponent> {
    return this.http.put ( '/rest/receipt-component/' + request.id, request )
      .pipe ( build );
  }

  updateOneCard ( request: any ): Observable<ReceiptComponentCard> {
    return this.http.put ( '/rest/receipt-component/card/' + request.id, request )
      .pipe ( buildCard );
  }
}
