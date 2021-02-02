import { KeyValue } from "@angular/common";

export class KeyValuePair implements KeyValue<string, any> {
  key: string;
  value: any;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
