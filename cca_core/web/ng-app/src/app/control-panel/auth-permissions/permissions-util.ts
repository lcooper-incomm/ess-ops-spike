import * as _ from "lodash";

export function organizePermissionsIntoCategories ( permissions ) {
  let list       = [];
  let categories = _.uniqBy ( _.map ( permissions, 'category' ), 'id' );

  _.forEach ( categories, function ( category ) {
    category.permissions = _.filter ( permissions, function ( permission ) {
      return permission.category.id === category.id;
    } );
    list.push ( category );
  } );

  return list;
}
