import { SessionType } from "./session-type";
import { SessionClassType } from "../session-class-type.enum";

export class SessionClass {

  displayName: string;
  name: string;

  sessionTypes: SessionType[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.setDisplayName ();

      for ( let i = 0; i < this.sessionTypes.length; i++ ) {
        this.sessionTypes[ i ] = new SessionType ( this.sessionTypes[ i ] );
      }
    }
  }

  getType (): SessionClassType {
    return SessionClassType[ <string> this.name ];
  }

  private setDisplayName (): void {
    switch ( this.name ) {
      case 'CALL_CENTER':
        this.displayName = 'Call';
        break;
      case 'CASE':
        this.displayName = 'Case';
        break;
      case 'GENERAL':
        this.displayName = 'General';
        break;
      default:
        this.displayName = this.name;
        break;
    }
  }
}
