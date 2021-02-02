import { SearchTypeType } from "./search-type-type.enum";
import { SelectionType } from "../../session/model/selection-type.enum";
import { PlatformType } from "../../platform/platform-type.enum";
import { SearchTypeParameterGroup } from "./search-type-parameter-group";
import { Partner } from "../../session/selection/partner";
import { Permission } from "../../auth/permission";
import { SearchParameter } from "./search-parameter";
import { SearchTypeCategory } from "./search-type-category";
import {MaplesPlatform} from '@cscore/maples-client-model';

export class SearchType {

  id: number;
  category: SearchTypeCategory;
  defaultQuickSearchParameterId: number;
  name: string;
  platform: PlatformType;
  selectionType: SelectionType;
  type: SearchTypeType;

  parameterGroups: SearchTypeParameterGroup[] = [];
  partners: Partner[]                         = [];
  permissions: Permission[]                   = [];
  quickSearchParameters: SearchParameter[]    = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.platform              = PlatformType[ <string> data.platform ];
      this.selectionType         = SelectionType[ <string> data.selectionType ];
      this.type                  = SearchTypeType[ <string> data.type ];
      this.parameterGroups       = [];
      this.partners              = [];
      this.permissions           = [];
      this.quickSearchParameters = [];

      if ( data.category ) {
        this.category = new SearchTypeCategory ( data.category );
      }
      if ( data.parameterGroups ) {
        data.parameterGroups.forEach ( group => this.parameterGroups.push ( new SearchTypeParameterGroup ( group ) ) );
      }
      if ( data.partners ) {
        data.partners.forEach ( partner => this.partners.push ( new Partner ( partner ) ) );
      }
      if ( data.permissions ) {
        data.permissions.forEach ( permission => this.permissions.push ( new Permission ( permission ) ) );
      }
      if ( data.quickSearchParameters ) {
        data.quickSearchParameters.forEach ( parameter => this.quickSearchParameters.push ( new SearchParameter ( parameter ) ) );
      }
    }
  }

  getAllParameters (): SearchParameter[] {
    let parameters: SearchParameter[] = [];

    this.parameterGroups.forEach ( group => {
      parameters.push.apply ( parameters, group.parameters.map ( groupParameter => groupParameter.parameter ) );
    } );

    return parameters;
  }

  hasAdvancedParameter (): boolean {
    let result = false;

    this.parameterGroups.forEach ( group => {
      group.parameters.forEach ( parameter => {
        if ( parameter.isAdvanced ) {
          result = true;
        }
      } );
    } );

    return result;
  }

  getMaplesPlatform(): MaplesPlatform {
    for (let key in MaplesPlatform) {
      if (MaplesPlatform[key] === this.platform) {
        return <MaplesPlatform><any>this.platform;
      }
    }
    return null;
  }
}
