import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { LawEnforcementComponentService } from "./law-enforcement-component.service";
import { UpdateLawEnforcementComponentAction } from "../../../action/session-actions";
import { AutoSavingSessionComponentForm } from '../auto-saving-session-component-form';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

@Component ( {
  selector: 'cca-law-enforcement-session-component-form',
  templateUrl: './law-enforcement-session-component-form.component.html',
  styleUrls: [ './law-enforcement-session-component-form.component.scss' ]
} )
export class LawEnforcementSessionComponentFormComponent extends AutoSavingSessionComponentForm {
  constructor ( private lawEnforcementComponentService: LawEnforcementComponentService,
                store: Store<AppState> ) {
    super ( store );
  }

  protected autoSave ( formValue: any ): Observable<void> {
    formValue.id = this.session.lawEnforcementComponent.id;
    return this.lawEnforcementComponentService.updateOne ( formValue )
      .pipe (
        tap ( lawEnforcementComponent => this.store.dispatch ( new UpdateLawEnforcementComponentAction ( lawEnforcementComponent ) ) ),
        mapTo ( null ),
      );
  }
}
