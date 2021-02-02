export class CustomerVelocity {

  remaining: string;
  total: string;
  type: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
