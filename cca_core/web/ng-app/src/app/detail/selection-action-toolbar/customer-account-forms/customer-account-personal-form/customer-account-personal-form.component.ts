import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component ( {
  selector: 'cca-customer-account-personal-form',
  templateUrl: './customer-account-personal-form.component.html',
  styleUrls: [ './customer-account-personal-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerAccountPersonalFormComponent {
  @Input () form: FormGroup;
}
