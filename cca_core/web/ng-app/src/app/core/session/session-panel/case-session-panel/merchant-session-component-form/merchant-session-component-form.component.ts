import { Component } from '@angular/core';
import {MerchantComponentService, UpdateMerchantComponentRequest} from './merchant-component.service';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { UpdateMerchantComponentAction } from '../../../action/session-actions';
import { AutoSavingSessionComponentForm } from '../auto-saving-session-component-form';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

@Component ( {
  selector: 'cca-merchant-session-component-form',
  templateUrl: './merchant-session-component-form.component.html',
  styleUrls: [ './merchant-session-component-form.component.scss' ]
} )
export class MerchantSessionComponentFormComponent extends AutoSavingSessionComponentForm {
  constructor ( private merchantComponentService: MerchantComponentService,
                store: Store<AppState> ) {
    super ( store );
  }

  protected autoSave ( formValue: UpdateMerchantComponentRequest ): Observable<void> {
    formValue.id = this.session.merchantComponent.id;
    return this.merchantComponentService.updateOne ( formValue )
      .pipe (
        tap ( merchantComponent => this.store.dispatch ( new UpdateMerchantComponentAction ( merchantComponent ) ) ),
        mapTo ( null ),
      );
  }
}
