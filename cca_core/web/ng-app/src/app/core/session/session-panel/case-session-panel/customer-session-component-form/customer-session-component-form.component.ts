import { Component } from '@angular/core';
import { CustomerComponentService } from "./customer-component.service";
import { AppState } from "../../../../../app-state";
import { Store } from '@ngrx/store';
import { CustomerComponent } from "../../../model/customer-component";
import { UpdateCustomerComponentAction } from '../../../action/session-actions';
import { AutoSavingSessionComponentForm } from '../auto-saving-session-component-form';
import { tap, mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component ( {
  selector: 'cca-customer-session-component-form',
  templateUrl: './customer-session-component-form.component.html',
  styleUrls: [ './customer-session-component-form.component.scss' ]
} )
export class CustomerSessionComponentFormComponent extends AutoSavingSessionComponentForm {

  callbackTimeOptions: string[]  = [
    'Morning (8AM - 11AM)',
    'Afternoon (11AM - 3PM)',
    'Evening (3PM - 6PM)',
    'Night (6PM - 9PM)',
    'Outside Business Hours (9PM - 8AM)'
  ];
  contactMethodOptions: string[] = [
    'Email',
    'Phone'
  ];
  languageOptions: string[]      = [
    'English',
    'French',
    'Spanish'
  ];

  constructor ( private customerComponentService: CustomerComponentService,
                store: Store<AppState> ) {
    super ( store );
  }

  protected autoSave ( formValue: any ): Observable<void> {
    let request: CustomerComponent = new CustomerComponent ( formValue );
    request.id                     = this.session.customerComponent.id;
    return this.customerComponentService.updateOne ( request )
      .pipe (
        tap ( customerComponent => this.store.dispatch ( new UpdateCustomerComponentAction ( customerComponent ) ) ),
        mapTo ( null ),
      );
  }
}
