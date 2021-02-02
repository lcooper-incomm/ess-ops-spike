export class CustomerAccountLimitCounts {

  dailyCount: string;
  weeklyCount: string;
  monthlyCount: string;
  yearlyCount: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
