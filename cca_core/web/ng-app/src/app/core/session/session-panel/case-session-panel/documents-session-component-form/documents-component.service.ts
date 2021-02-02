import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { DocumentsComponentDocument } from "../../../model/documents-component-document";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const buildDocument = map ( value => new DocumentsComponentDocument ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class DocumentsComponentService {

  constructor ( private http: HttpClient ) {
  }

  addOneDocument ( componentId: number, request: any ): Observable<DocumentsComponentDocument> {
    return this.http.post<DocumentsComponentDocument> ( '/rest/documents-component/' + componentId + '/document', request )
      .pipe ( buildDocument );
  }

  deleteOneDocument ( documentId: number ): Observable<any> {
    return this.http.delete ( '/rest/documents-component/document/' + documentId );
  }

  updateOneDocument ( document: DocumentsComponentDocument ): Observable<DocumentsComponentDocument> {
    return this.http.put ( '/rest/documents-component/document/' + document.id, document )
      .pipe ( buildDocument );
  }
}
