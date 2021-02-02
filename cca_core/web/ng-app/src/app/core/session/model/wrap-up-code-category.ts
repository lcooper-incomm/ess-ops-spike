import { WrapUpCode } from "./wrap-up-code";

export class WrapUpCodeCategory {

  id: number;
  displayName: string;
  i3Name: string;
  isActive: boolean = false;
  wrapUpCodes: WrapUpCode[];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.wrapUpCodes = [];

      if ( data.wrapUpCodes ) {
        data.wrapUpCodes.forEach ( wrapUpCode => this.wrapUpCodes.push ( new WrapUpCode ( wrapUpCode ) ) );
      }
    }
  }
}
