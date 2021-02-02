export class GenericOption<T> {
  value: T;
  displayValue: string;
  group?: string;
  description?: string;
  sortOrder?: number = 0;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export function filterGenericOptionDisplayValueArray ( obj: GenericOption<any>[], str: string ): GenericOption<any>[] {
  str = str.toLowerCase ();
  return obj.filter ( it => {
    let displayValue = it.displayValue ? it.displayValue.toLowerCase ().trim () : null;
    let value        = it.value ? it.value.toString ().toLowerCase ().trim () : null;

    return it.value ? displayValue.concat ( value ).includes ( str ) : null;
  } );
}
