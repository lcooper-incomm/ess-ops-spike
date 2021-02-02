import { Component, Input, OnInit } from '@angular/core';
import { Selection } from 'src/app/core/session/model/selection';
import { FormGroup } from '@angular/forms';
import { Location } from 'src/app/core/node/location/location';
import { MergeableField, FieldType, MergeableFieldType } from '../merge-field/merge-field.component';
import { CsCoreAddressType } from '@cscore/core-client-model';

@Component ( {
  selector: 'cca-selection-to-merchant-component',
  templateUrl: './selection-to-merchant-component.component.html',
  styleUrls: [ './selection-to-merchant-component.component.scss' ]
} )
export class SelectionToMerchantComponentComponent implements OnInit {
  @Input () form: FormGroup;
  @Input () selection: Selection<Location>;

  fields: MergeableField<MergeableFieldType>[] = [];

  ngOnInit (): void {
    this.fields = this.initFields ();
  }

  private initFields (): MergeableField<MergeableFieldType>[] {
    const contact     = this.selection.getLocation ().getFirstContact ();
    const merchant    = this.selection.hierarchy && this.selection.hierarchy.merchants[ 0 ];
    const phoneNumber = contact && contact.phoneNumbers[ 0 ]; // TODO: preferred?
    return [
      {
        controlName: 'merchantName',
        isMerged: false,
        label: 'Merchant Name',
        mergeValue: merchant && merchant.description,
        type: FieldType.TEXT,
      },
      {
        controlName: 'locationName',
        isMerged: false,
        label: 'Location Name',
        mergeValue: this.selection.getLocation ().name,
        type: FieldType.TEXT,
      },
      {
        controlName: 'contactName',
        isMerged: false,
        label: 'Contact Name',
        mergeValue: contact && contact.name,
        type: FieldType.TEXT,
      },
      {
        controlName: 'contactPhone',
        isMerged: false,
        label: 'Contact Phone',
        mergeValue: phoneNumber && phoneNumber.number,
        type: FieldType.TEXT,
      },
      {
        controlName: 'address',
        isMerged: false,
        label: 'Address',
        mergeValue: this.selection.getLocation ().getAddressByType ( CsCoreAddressType.PHYSICAL ),
        type: FieldType.ADDRESS,
      },
    ];
  }
}
