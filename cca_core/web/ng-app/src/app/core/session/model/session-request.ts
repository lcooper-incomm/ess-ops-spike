import {FlatPrivacyRequestComponent} from "./privacy-request-component";

export class SessionRequest {

  sessionClass: string;
  sessionType: string;
  status: string = 'ACTIVE';
  privacyRequestComponent: FlatPrivacyRequestComponent;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
