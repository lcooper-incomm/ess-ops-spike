import { Component, Input, OnInit } from '@angular/core';
import { Selection } from 'src/app/core/session/model/selection';
import { Customer } from 'src/app/core/customer/customer';
import { Card } from 'src/app/core/card/card';
import { SelectionType } from 'src/app/core/session/model/selection-type.enum';
import { FormGroup } from '@angular/forms';
import { DateService } from 'src/app/core/date/date.service';
import { MergeableField, FieldType, MergeableFieldType } from '../merge-field/merge-field.component';

@Component ( {
  selector: 'cca-selection-to-customer-component',
  templateUrl: './selection-to-customer-component.component.html',
  styleUrls: [ './selection-to-customer-component.component.scss' ]
} )
export class SelectionToCustomerComponentComponent implements OnInit {
  @Input () form: FormGroup;
  @Input () selection: Selection<Customer | Card>;

  fields: MergeableField<MergeableFieldType>[] = [];

  constructor ( private dateService: DateService ) {
  }

  ngOnInit (): void {
    this.fields = this.initFields ();
  }

  get customer (): Customer {
    return this.isCustomerSelection ? this.selection.getCustomer () : this.selection.getCard ().customer;
  }

  get isCustomerSelection (): boolean {
    return this.selection.type === SelectionType.CUSTOMER;
  }

  private initFields (): MergeableField<MergeableFieldType>[] {
    const baseFields = [
      {
        controlName: 'firstName',
        isMerged: false,
        label: 'First Name',
        mergeValue: this.customer.firstName,
        type: FieldType.TEXT,
      },
      {
        controlName: 'lastName',
        isMerged: false,
        label: 'Last Name',
        mergeValue: this.customer.lastName,
        type: FieldType.TEXT,
      },
    ];

    // Only show these fields if the selection is a customer selection (i.e. Fsapi)
    if ( this.isCustomerSelection ) {
      const phoneNumber = this.customer.getPreferredPhone ();

      const customerSelectionFields = [
        {
          controlName: 'dateOfBirth',
          isMerged: false,
          label: 'Date of Birth',
          mergeValue: this.customer.dateOfBirth && this.dateService.convertYYYYMMDDToMMDDYYYY ( this.customer.dateOfBirth ),
          type: FieldType.DATE,
        },
        {
          controlName: 'email',
          isMerged: false,
          label: 'Email',
          mergeValue: this.customer.emailAddress,
          type: FieldType.TEXT,
        },
        {
          controlName: 'phone',
          isMerged: false,
          label: 'Phone',
          mergeValue: phoneNumber && phoneNumber.number,
          type: FieldType.TEXT,
        },
        {
          controlName: 'address',
          isMerged: false,
          label: 'Address',
          mergeValue: this.customer.getPreferredAddress (),
          type: FieldType.ADDRESS,
        },
      ];

      return [ ...baseFields, ...customerSelectionFields ];
    } else {
      return baseFields;
    }
  }
}
