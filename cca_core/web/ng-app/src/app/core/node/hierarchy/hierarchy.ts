import { BusinessUnit } from "../business-unit";
import { Location } from "../location/location";
import { Terminal } from "../terminal/terminal";
import { Merchant } from "../merchant";

export class Hierarchy {

  businessUnit: BusinessUnit;
  location: Location;
  terminal: Terminal;

  merchants: Merchant[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.merchants = [];

      if ( data.businessUnit ) {
        this.businessUnit = new BusinessUnit ( data.businessUnit );
      }
      if ( data.location ) {
        this.location = new Location ( data.location );
      }
      if ( data.terminal ) {
        this.terminal = new Terminal ( data.terminal );
      }

      if ( data.merchants ) {
        data.merchants.forEach ( merchant => this.merchants.push ( new Merchant ( merchant ) ) );
      }
    }
  }
}
