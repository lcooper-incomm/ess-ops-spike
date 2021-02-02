export class AccountAlerts {

  isBillable: boolean = false;
  isMultiUse: boolean = false;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
