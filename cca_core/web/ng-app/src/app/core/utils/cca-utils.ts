export function mapToObject ( map: Map<string, any> ): { [ key: string ]: any } {
  let result = {};

  if ( map ) {
    map.forEach ( ( value: any, key: string ) => {
      result[ key ] = value;
    } );
  }

  return result;
}
