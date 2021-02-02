import { SearchParameterType } from "./search-parameter-type.enum";
import { SearchParameterValueType } from "./search-parameter-value-type.enum";
import { SearchTypeContainer } from "../search-type-container";

export class SearchParameter {

  id: number;
  name: string;
  parentSearchTypeContainer: SearchTypeContainer;
  type: string;
  value: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

  getType (): SearchParameterType {
    return SearchParameterType[ <string> this.type ];
  }

  getValue (): SearchParameterValueType {
    return SearchParameterValueType[ <string> this.value ];
  }
}
