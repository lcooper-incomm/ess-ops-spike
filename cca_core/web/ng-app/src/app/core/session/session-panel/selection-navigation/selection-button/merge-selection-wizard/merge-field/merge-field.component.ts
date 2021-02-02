import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { CsCoreAddress } from "@cscore/core-client-model";

export type MergeableFieldType = string | CsCoreAddress;

export interface MergeableField<T extends MergeableFieldType> {
  cachedValue?: T;
  controlName: string;
  isMerged: boolean;
  label: string;
  mergeValue: T;
  type: FieldType;
}

export enum FieldType {
  ADDRESS = 'ADDRESS',
  DATE    = 'DATE',
  TEXT    = 'TEXT',
}

@Component ( {
  selector: 'cca-merge-field',
  templateUrl: './merge-field.component.html',
  styleUrls: [ './merge-field.component.scss' ]
} )
export class MergeFieldComponent<T extends MergeableFieldType> {
  @Input () form: FormGroup;
  @Input () field: MergeableField<T>;

  @Output () merge   = new EventEmitter<void> ();
  @Output () unmerge = new EventEmitter<void> ();

  readonly FieldType = FieldType;

  get canMerge (): boolean {
    const control = this.form.get ( this.field.controlName );
    return control && canMerge ( this.field, control );
  }

  get isAddress (): boolean {
    return this.field.type === FieldType.ADDRESS;
  }
}

/**
 * Indicates that a mergeable field can be merged into a form control
 * @param field
 * @param control
 */
export function canMerge<T extends MergeableFieldType> ( field: MergeableField<T>, control: AbstractControl ): boolean {
  // null and undefined can't be merged
  if ( field.mergeValue == null ) {
    return false;
  } else if ( field.type === FieldType.ADDRESS ) {
    // NOTE: we don't save the country in the backend, so we have to ignore it
    return !CsCoreAddress.isEqualValue ( field.mergeValue as CsCoreAddress, control.value, true );
  } else {
    return field.mergeValue !== control.value;
  }
}
