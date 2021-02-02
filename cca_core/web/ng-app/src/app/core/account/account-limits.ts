export class AccountLimits {

  dailyLimit: string;
  monthlyLimit: string;
  totalLimit: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
