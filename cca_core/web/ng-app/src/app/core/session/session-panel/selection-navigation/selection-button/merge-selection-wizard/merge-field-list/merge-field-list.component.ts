import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CsCoreAddress } from "@cscore/core-client-model";
import { Selection, SelectionDataType } from 'src/app/core/session/model/selection';
import { MergeableField, canMerge, FieldType, MergeableFieldType } from '../merge-field/merge-field.component';

@Component ( {
  selector: 'cca-merge-field-list',
  templateUrl: './merge-field-list.component.html',
  styleUrls: [ './merge-field-list.component.scss' ]
} )
export class MergeFieldListComponent<T extends SelectionDataType> {
  @Input () componentLabel: string                       = 'Case Component';
  @Input () fields: MergeableField<MergeableFieldType>[] = [];
  @Input () form: FormGroup;
  @Input () selection: Selection<T>;

  get canMergeAll (): boolean {
    return this.fields.some ( field => this.canMergeField ( field ) );
  }

  mergeAll (): void {
    this.fields
      .filter ( field => this.canMergeField ( field ) )
      .forEach ( field => this.merge ( field ) );
  }

  merge ( field: MergeableField<MergeableFieldType> ): void {
    if ( !field.isMerged ) {
      field.cachedValue = this.form.get ( field.controlName ).value;
      this.setFormValue ( field, field.mergeValue );
      field.isMerged = true;
    }
  }

  unmerge ( field: MergeableField<MergeableFieldType> ): void {
    if ( field.isMerged ) {
      this.setFormValue ( field, field.cachedValue );
      field.cachedValue = null;
      field.isMerged    = false;
    }
  }

  private setFormValue ( field: MergeableField<MergeableFieldType>, value: MergeableFieldType ): void {
    if ( field.type === FieldType.ADDRESS ) {
      const address = value as CsCoreAddress;
      this.form.get ( field.controlName ).get ( 'line1' ).setValue ( address && address.line1 );
      this.form.get ( field.controlName ).get ( 'line2' ).setValue ( address && address.line2 );
      this.form.get ( field.controlName ).get ( 'city' ).setValue ( address && address.city );
      this.form.get ( field.controlName ).get ( 'state' ).setValue ( address && address.state );
      this.form.get ( field.controlName ).get ( 'postalCode' ).setValue ( address && address.postalCode );
      this.form.get ( field.controlName ).get ( 'country' ).setValue ( address && address.country );
    } else {
      this.form.get ( field.controlName ).setValue ( value );
    }
  }

  private canMergeField ( field: MergeableField<MergeableFieldType> ): boolean {
    const control = this.form.get ( field.controlName );
    return !field.isMerged && control && canMerge ( field, control );
  }
}
