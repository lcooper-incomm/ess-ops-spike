import { PropertyType } from "./property-type.enum";

export class Property {

  id: number;
  description: string;
  displayName: string;
  systemName: PropertyType;
  value: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.systemName ) {
        this.systemName = PropertyType[ <string>data.systemName ];
      }
    }
  }
}
