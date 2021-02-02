import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from "rxjs";
import {ActionService} from "./action-service";
import {SecurityService} from "../../core/security/security.service";
import {WizardRunner} from "../../core/wizard/wizard-runner/wizard-runner.service";
import {Session} from "../../core/session/model/session";
import {Selection} from "../../core/session/model/selection";
import {ActionToolbarButtonStatus} from "../../core/action-toolbar/action-toolbar-button-status";

@Injectable ( {
  providedIn: 'root'
} )
export class AccountActionService extends ActionService {

  constructor ( securityService: SecurityService ) {
    super ( securityService );
  }

  doAllChecksForSelection ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus[]> {
    return of([]);
  }

}
