import { CsCoreCode } from "@cscore/core-client-model";

export class OpCode extends CsCoreCode {

  descriptor: OpCodeDescriptor;
  flag: string;

  constructor ( data: any ) {
    super ( data );
    if ( data.descriptor ) {
      this.descriptor = new OpCodeDescriptor ( data.descriptor );
    }
  }
}

export class OpCodeDescriptor {

  id: number;
  code: string;
  requestValue: string;
  responseValue: string;
  transactionType: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
