import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";
import { SecurityService } from "../../security/security.service";
import { Permission } from "../../auth/permission";
import { SessionClassType } from "../../session/session-class-type.enum";

@Component ( {
  selector: 'cca-session-class-search-field',
  templateUrl: './session-class-search-field.component.html',
  styleUrls: [ './session-class-search-field.component.scss' ]
} )
export class SessionClassSearchFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'sessionClass';
  @Input ()
  placeholder: string = 'Session Class';

  options: SessionClassOption[] = [];

  constructor ( private securityService: SecurityService ) {
    super ();
  }

  ngOnInit () {
    if ( this.securityService.hasPermission ( Permission.SEARCH_SESSIONS_ALL ) ) {
      this.options.push ( {
        value: 'ALL',
        displayValue: 'All'
      } );
    }
    if ( this.securityService.hasAnyPermission ( [ Permission.SEARCH_SESSIONS_ALL, Permission.SEARCH_SESSIONS_CALL_CENTER ] ) ) {
      this.options.push ( {
        value: SessionClassType.CALL_CENTER,
        displayValue: 'Call'
      } );
    }
    if ( this.securityService.hasAnyPermission ( [ Permission.SEARCH_SESSIONS_ALL, Permission.SEARCH_SESSIONS_CASE ] ) ) {
      this.options.push ( {
        value: SessionClassType.CASE,
        displayValue: 'Case'
      } );
    }
    if ( this.securityService.hasAnyPermission ( [ Permission.SEARCH_SESSIONS_ALL, Permission.SEARCH_SESSIONS_GENERAL ] ) ) {
      this.options.push ( {
        value: SessionClassType.GENERAL,
        displayValue: 'General'
      } );
    }
  }

}

export class SessionClassOption {
  value: string;
  displayValue: string;
}
