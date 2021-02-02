export class IssueStatus {

  id: string;
  category: IssueStatusCategory;
  description: string;
  name: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.statusCategory ) {
        this.category = new IssueStatusCategory ( data.statusCategory );
      }
    }
  }
}

export class IssueStatusCategory {
  id: number;
  colorName: string;
  key: string;
  name: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

}
