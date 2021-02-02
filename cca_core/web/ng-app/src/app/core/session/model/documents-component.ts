import { DocumentsComponentDocument } from "./documents-component-document";

export class DocumentsComponent {

  id: number;
  documents: DocumentsComponentDocument[];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.documents = [];

      if ( data.documents ) {
        data.documents.forEach ( document => this.documents.push ( new DocumentsComponentDocument ( document ) ) );
      }
    }
  }
}
