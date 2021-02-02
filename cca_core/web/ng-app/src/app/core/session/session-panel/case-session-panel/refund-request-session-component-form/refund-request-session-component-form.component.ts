import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { RefundRequestComponentService } from './refund-request-component.service';
import { UpdateRefundRequestComponentAction } from "../../../action/session-actions";
import { AutoSavingSessionComponentForm } from '../auto-saving-session-component-form';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

@Component ( {
  selector: 'cca-refund-request-session-component-form',
  templateUrl: './refund-request-session-component-form.component.html',
  styleUrls: [ './refund-request-session-component-form.component.scss' ]
} )
export class RefundRequestSessionComponentFormComponent extends AutoSavingSessionComponentForm {
  constructor ( private refundRequestComponentService: RefundRequestComponentService,
                store: Store<AppState> ) {
    super ( store );
  }

  protected autoSave ( formValue: any ): Observable<void> {
    formValue.id = this.session.refundRequestComponent.id;
    return this.refundRequestComponentService.updateOne ( formValue )
      .pipe (
        tap ( refundRequestComponent => this.store.dispatch ( new UpdateRefundRequestComponentAction ( refundRequestComponent ) ) ),
        mapTo ( null ),
      );
  }
}
