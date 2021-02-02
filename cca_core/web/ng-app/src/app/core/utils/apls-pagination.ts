import { SortType } from "./sort-type.enum";

export class AplsPagination {

  page: number;
  resultsPerPage: number;
  sortType: SortType;
  totalPages: number;
  totalResults: number;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.sortType ) {
        this.sortType = SortType[ <string>data.sortType ];
      }
    }
  }
}
