import { TokenDevice } from "./token-device";
import { Token } from "./token";

export class TokenDetail extends Token {

  device: TokenDevice;

  constructor ( data: any ) {
    super ( data );
    if ( data ) {
      if ( data.device ) {
        this.device = new TokenDevice ( data.device );
      }
    }
  }
}
