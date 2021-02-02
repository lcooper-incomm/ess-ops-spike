import { SearchParameter } from "./search-parameter";

export class SearchTypeParameterGroupParameter {

  id: number;
  isAdvanced: boolean = false;
  isVisible: boolean  = true;
  parameter: SearchParameter;
  priority: number;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.parameter ) {
        this.parameter = new SearchParameter ( data.parameter );
      }
    }
  }
}
