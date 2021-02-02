import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {mapTo, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AutoSavingSessionComponentForm} from "../auto-saving-session-component-form";
import {AppState} from "../../../../../app-state";
import {PrivacyRequestComponent} from "../../../model/privacy-request-component";
import {SessionService} from "../../../session.service";
import {UpdatePrivacyRequestComponentAction} from "../../../action/session-actions";

@Component({
  selector: 'cca-privacy-request-session-component-form',
  templateUrl: './privacy-request-session-component-form.component.html',
  styleUrls: ['./privacy-request-session-component-form.component.scss']
})
export class PrivacyRequestSessionComponentFormComponent extends AutoSavingSessionComponentForm {

  constructor ( store: Store<AppState>,
                private sessionService: SessionService) {
    super ( store );
  }

  protected autoSave ( formValue: any ): Observable<void> {
    let request: PrivacyRequestComponent = new PrivacyRequestComponent ( formValue );
    request.id = this.session.privacyRequestComponent.id;
    return this.sessionService.updateOnePrivacyRequestComponent ( request )
      .pipe (
        tap ( response => this.store.dispatch ( new UpdatePrivacyRequestComponentAction ( response ) ) ),
        mapTo ( null ),
      );
    return of(null);
  }
}
