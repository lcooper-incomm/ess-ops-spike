import { Injectable } from '@angular/core';
import { EditCustomerAccountSnapshot } from '../edit-customer-account-snapshot';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { EditCustomerAccountFieldType } from './edit-customer-account-field-type.enum';
import { EditCustomerAccountChangeItem } from './edit-customer-account-change-item';

@Injectable ( {
  providedIn: 'root'
} )
export class CustomerAccountChangeBuilder {

  static buildChange (
    oldSnapshot: EditCustomerAccountSnapshot,
    newSnapshot: EditCustomerAccountSnapshot,
    fieldName: string,
    label: string,
    fieldType: EditCustomerAccountFieldType,
    actionType: UpdateAccountActionType,
    displayValue?: string,
  ): EditCustomerAccountChangeItem | null {
    const oldValue: string = oldSnapshot[ fieldName ];
    const newValue: string = newSnapshot[ fieldName ];
    if ( newValue !== oldValue ) {
      return new EditCustomerAccountChangeItem ( {
        actionType,
        displayValue: displayValue || newValue,
        fieldType,
        label,
        value: newValue,
      } );
    } else {
      return null;
    }
  }
}
