export class LawEnforcementComponent {

  id: number;
  agency: string;
  badgeNumber: string;
  caseNumber: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
