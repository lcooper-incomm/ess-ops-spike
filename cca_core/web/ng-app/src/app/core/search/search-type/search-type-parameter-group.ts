import { SearchTypeParameterGroupParameter } from "./search-type-parameter-group-parameter";

export class SearchTypeParameterGroup {

  id: number;
  name: string;
  priority: number;
  isVisible: boolean = true;

  parameters: SearchTypeParameterGroupParameter[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.parameters = [];

      if ( data.parameters ) {
        data.parameters.forEach ( parameter => this.parameters.push ( new SearchTypeParameterGroupParameter ( parameter ) ) );
      }
    }
  }

  /**
   * Are all parameters in this group advanced?
   */
  isAdvanced (): boolean {
    let isAdvanced = true;

    this.parameters.forEach ( parameter => {
      if ( !parameter.isAdvanced ) {
        isAdvanced = false;
      }
    } )

    return isAdvanced;
  }
}
