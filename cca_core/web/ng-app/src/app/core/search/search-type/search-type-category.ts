import { SearchType } from "./search-type";

export class SearchTypeCategory {

  id: number;
  name: string;

  searchTypes: SearchType[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.searchTypes = [];

      if ( data.searchTypes ) {
        data.searchTypes.forEach ( searchType => this.searchTypes.push ( new SearchType ( searchType ) ) );
      }
    }
  }
}
