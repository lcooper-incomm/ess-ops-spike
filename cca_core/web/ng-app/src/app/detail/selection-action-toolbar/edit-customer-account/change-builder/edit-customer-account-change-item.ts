import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { EditCustomerAccountFieldType } from './edit-customer-account-field-type.enum';

export class EditCustomerAccountChangeItem {
  actionType: UpdateAccountActionType;
  displayValue: string;
  fieldType: EditCustomerAccountFieldType;
  label: string;
  value: any;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
