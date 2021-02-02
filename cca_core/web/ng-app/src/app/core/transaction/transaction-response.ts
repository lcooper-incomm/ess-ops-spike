export class TransactionResponse {

  action: string;
  code: string;
  description: string;
  descriptor: TransactionResponseDescriptor;
  duration: string;
  isPin: boolean           = false;
  isInternational: boolean = false;
  message: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.descriptor ) {
        this.descriptor = new TransactionResponseDescriptor ( data.descriptor );
      }
    }
  }
}

export class TransactionResponseDescriptor {

  id: number;
  responseCode: string;
  responseValue: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
