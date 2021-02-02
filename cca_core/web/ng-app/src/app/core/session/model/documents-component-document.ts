export class DocumentsComponentDocument {

  id: number;
  link: string;
  name: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

}
