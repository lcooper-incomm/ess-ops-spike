import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditCustomerAccountChangeItem } from '../change-builder/edit-customer-account-change-item';
import { GenericOption } from 'src/app/core/model/generic-option';
import { UpdateAccountReasonType } from 'src/app/core/customer/update-account-request';

@Component ( {
  selector: 'cca-edit-customer-confirmation-form',
  templateUrl: './edit-customer-confirmation-form.component.html',
  styleUrls: [ './edit-customer-confirmation-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerConfirmationFormComponent {
  @Input () changes: EditCustomerAccountChangeItem[] = [];
  @Input () form: FormGroup;
  @Input () isReasonRequired: boolean                = false;

  reasonOptions: GenericOption<UpdateAccountReasonType>[] = [
    { value: UpdateAccountReasonType.DIVORCE, displayValue: 'Divorce' },
    { value: UpdateAccountReasonType.MARRIAGE, displayValue: 'Marriage' },
    { value: UpdateAccountReasonType.WRONG_DATE_OF_BIRTH, displayValue: 'Wrong Date of Birth' },
  ];
}
