import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';
import { IdentificationType } from 'src/app/core/customer/identification-type';
import { Occupation } from 'src/app/core/customer/occupation';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { ReasonCode } from 'src/app/core/action/product-action-reason-code';
import {
  CanadianIdentificationFormOptions,
  IdentificationFormBuilderService
} from './identification-form-builder/identification-form-builder.service';

@Component ( {
  selector: 'cca-customer-account-identification-form',
  templateUrl: './customer-account-identification-form.component.html',
  styleUrls: [ './customer-account-identification-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerAccountIdentificationFormComponent extends CcaBaseComponent implements OnInit {
  @Input () form: FormGroup;
  @Input () isCanadian: boolean = false;
  @Input () canadianFormOptions: CanadianIdentificationFormOptions;
  @Input () platform: PlatformType;

  @Output () formChange: EventEmitter<boolean> = new EventEmitter ();

  isNoTaxpayerIdReasonDescriptionRequired: boolean = false;

  constructor () {
    super ();
  }

  ngOnInit () {
    this.addSubscription (
      this.form.valueChanges
        .pipe ( debounceTime ( 300 ) )
        .subscribe ( () => {
          this.formChange.emit ( null );
          this.updateConditionalCanadianFields ();
        } )
    );
  }

  compareIdentificationTypes ( a: IdentificationType, b: IdentificationType ): boolean {
    return a && b && a.type === b.type;
  }

  compareNoTaxpayerIdReasons ( a: ReasonCode, b: ReasonCode ): boolean {
    return a && b && a.reasonCode === b.reasonCode;
  }

  compareOccupations ( a: Occupation, b: Occupation ): boolean {
    return a && b && a.type === b.type;
  }

  private updateConditionalCanadianFields (): void {
    if ( this.isCanadian ) {
      const reasonCode: ReasonCode                 = this.form.get ( 'noTaxpayerIdReason' ).value;
      this.isNoTaxpayerIdReasonDescriptionRequired = !!reasonCode && reasonCode.reasonCode === IdentificationFormBuilderService.OTHER_REASON_CODE;
      this.form.get ( 'noTaxpayerIdReasonDescription' ).setValidators ( this.isNoTaxpayerIdReasonDescriptionRequired ? [ Validators.required ] : [] );

      const taxpayerId = this.form.get ( 'taxpayerId' ).value;
      this.form.get ( 'noTaxpayerIdReason' ).setValidators ( !!taxpayerId ? [] : [ Validators.required ] );
      if ( taxpayerId ) {
        this.form.get ( 'noTaxpayerIdReason' ).setValue ( null );
        this.form.get ( 'noTaxpayerIdReason' ).disable ();
      } else {
        this.form.get ( 'noTaxpayerIdReason' ).enable ();
      }
    }
  }
}
