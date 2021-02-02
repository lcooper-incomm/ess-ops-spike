import { getSessionStatusTypeDisplayValue, SessionStatusType } from "./session-status-type.enum";

export class SessionStatus {

  displayValue: string;
  value: SessionStatusType;

  constructor ( data: any ) {
    if ( data ) {
      this.value        = SessionStatusType[ <string>data ];
      this.displayValue = getSessionStatusTypeDisplayValue ( this.value );
    }
  }
}
