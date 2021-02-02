export class JiraUser {

  displayName: string;
  emailAddress: string;
  isActive: boolean = false;
  key: string;
  name: string;
  timeZone: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.isActive = !!data.active;
    }
  }

}
