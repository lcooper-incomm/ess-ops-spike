import * as _ from "lodash";
import {KeyValuePair} from '../model/key-value-pair';
import {CsCoreAddress} from "@cscore/core-client-model";

export function containsOneIgnoreCase ( stringsToSearch: string[], valueToFind: string ): boolean {
  // returns a boolean representing whether the input array contains a given string value, ignoring case
  if ( stringsToSearch && valueToFind ) {
    return !!_.find ( stringsToSearch, ( target: string ) => {
      return target.toLowerCase () === valueToFind.toLowerCase ();
    } );
  }
}

export function convertBooleanToYesNo ( bool: boolean ): string {
  let str;
  bool ? str = 'Yes' : str = 'No';
  return str;
}

export function filterArrayByKeyValueString ( obj: any, str: string ) {
  str         = str.toLowerCase ();
  let newData = [];

  obj.map ( it => {
    let value;
    let key;
    let searchStr;

    it.key ? key = it.key.toLowerCase ().trim () : null;
    it.value ? value = it.value.toString ().toLowerCase ().trim () : null;

    // Don't filter against undefined
    value !== undefined ? searchStr = key.concat ( value ) : searchStr = key;

    if ( searchStr.includes ( str ) ) {
      newData.push ( it );
    }
  } );
  return newData;
}

export function padLeft ( value: string, size: number ): string {
  return _.padEnd ( value, size );
}

export function prettyPrintCardNumber ( value: string ): string {
  let pieces: string[] = [];

  //Format the card number with spaces every four characters
  for ( let i = 0; i < value.length; i++ ) {
    if ( i % 4 === 0 ) {
      pieces.push ( ' ' );
    }
    pieces.push ( value.substr ( i, 1 ) );
  }

  return pieces.join ( '' );
}

export function truncate ( value: string, size: number ): string {
  return _.truncate ( value, { length: size } );
}

export function tenDigitPhoneNumber ( value: string ): string {
  let newValue;

  // Strip the leading Country Code 1 from an 11 digit number and return a normalized 10 digit phone number without Country Code.
  value.length === 11 && value.charAt ( 0 ) === '1' ? newValue = value.substring ( 1 ) : newValue = value;
  return newValue
}

export function buildKeyValueTooltipText ( rows: KeyValuePair[], keyValueGap: number = 2, truncatedLength: number = 30 ) {
  const keys: string[] = rows.map ( row => row.key );
  const keyPadLength   = Math.max ( ...keys.map ( key => key.length ) ) + keyValueGap;
  return rows.map ( row => padLeft ( row.key, keyPadLength ) + truncate ( row.value, truncatedLength ) ).join ( '\n' );
}

export function maskSSNLastFour ( ssnLastFour: string ) {
  return '***-**-' + ssnLastFour;
}

/**
 * Formats an address as a two-line address, i.e. an address of the format:
 *  Address Line 1
 *  City, State PostalCode
 *
 * If any parts are missing, part of the address will be returned
 *
 * @param address The address to format
 * @returns Returns an array containing each line of the address
 */
export function formatAs2LineAddress ( address: CsCoreAddress ): string[] {
  if(!address) {
    return [];
  }

  const line1 = address.line1;
  const line2 = join ( [ address.city, address.state, address.postalCode ], [ '', ', ', ' ' ] );
  return [ line1, line2 ].filter ( line => !!line );
}

/**
 * Joins an array of strings together with a different separator for each element of the array
 *
 * Each separator comes *before* its corresponding part.
 * If either part in a pair is falsy, the separator will be ignored
 *
 * @param array The array to join
 * @param separators The element separators
 * @returns Returns the joined string
 */
export function join ( array: (string | null)[], separators: string[] ): string {
  return array.reduce ( ( result: string, part: string, index: number ) => {
    // Join this part with result so far, only using separator if both are truthy
    const separator = result && part ? separators[ index ] : '';
    return [ result, part ].join ( separator );
  }, '' );
}

export function orderBy(obj: any, str: string) {
  return obj.sort((a, b) => (a[str] || "").toString().localeCompare((b[str] || "").toString()));
}

export function lastChar(str: string): string {
  let lastChar = str.charAt(str.length - 1)
  return lastChar
}

export function removeCharFromString(str: string): string {
  return str.split('/').join('')
}
