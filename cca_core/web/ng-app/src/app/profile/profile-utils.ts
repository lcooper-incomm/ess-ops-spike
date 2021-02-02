import * as _ from "lodash";

export function filterByString ( obj: any, str: string ) {
  str         = str.toLowerCase ();
  let newData = [];

  obj.map ( it => {
    _.startsWith ( it.displayName.toLowerCase (), str ) ? newData.push ( it ) : null;
  } );

  return newData;
}

export function orderBy ( users: any, str: string ) {
  return users.sort ( ( a, b ) => (a[ str ] || "").toString ().localeCompare ( (b[ str ] || "").toString () ) );
}
