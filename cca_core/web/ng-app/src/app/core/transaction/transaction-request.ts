export class TransactionRequest {

  code: string;
  description: string;
  descriptor: TransactionRequestDescriptor;
  entryMode: string;
  userCode: string;
  posEntryMode: string;
  reason: string;
  submissionIndicator: string;
  type: string;
  userName: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.descriptor ) {
        this.descriptor = new TransactionRequestDescriptor ( data.descriptor );
      }
    }
  }
}

export class TransactionRequestDescriptor {

  id: number;
  x95Code: string;
  requestCode: string;
  requestValue: string;
  transactionType: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
