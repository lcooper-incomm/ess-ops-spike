import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod, DeliveryMethodCode } from 'src/app/core/model/minion/task/delivery-method';
import { CsCoreAddress } from "@cscore/core-client-model";
import { GenericOption } from 'src/app/core/model/generic-option';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';
import { SearchParameterType } from '../../../search/search-type/search-parameter-type.enum';
import { CcaFormValidationService } from 'src/app/core/form/cca-form-validation.service';

@Component ( {
  selector: 'cca-delivery-method-form',
  templateUrl: './delivery-method-form.component.html',
  styleUrls: [ './delivery-method-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class DeliveryMethodFormComponent extends CcaBaseComponent implements OnInit {
  @Input () address: CsCoreAddress;
  @Input () email: string;
  @Input () form: FormGroup;
  @Input () isVmsGiftCard: boolean;
  @Input () isGreenCard: boolean;

  readonly DeliveryMethod                    = DeliveryMethodCode;
  readonly deliveryMethodControlName: string = 'deliveryMethod';
  readonly emailControlName: string          = 'email';
  readonly faxControlName: string            = 'fax';

  deliveryMethodOptions: GenericOption<DeliveryMethod>[] = [
    {
      code: DeliveryMethodCode.EMAIL,
      displayValue: 'Email',
    },
    {
      code: DeliveryMethodCode.FAX,
      displayValue: 'Fax',
    },
    {
      code: DeliveryMethodCode.MAIL,
      displayValue: 'Mail',
    },
  ].map ( method => {
    return {
      displayValue: method.displayValue,
      value: method,
    };
  } );

  constructor ( private formValidationService: CcaFormValidationService ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToDeliveryMethod ();
  }

  get deliveryMethod (): DeliveryMethod {
    return this.form.get ( this.deliveryMethodControlName ).value;
  }

  private subscribeToDeliveryMethod (): void {
    this.addSubscription ( this.form.get ( this.deliveryMethodControlName ).valueChanges
      .subscribe ( ( deliveryMethod: DeliveryMethod ) => {
        // change which FormControls are required based on DeliveryMethod selected.
        this.form.get ( this.emailControlName ).clearValidators ();
        this.form.get ( this.faxControlName ).clearValidators ();

        if ( deliveryMethod.code === DeliveryMethodCode.EMAIL && (this.isVmsGiftCard || this.isGreenCard) ) {
          this.form.get ( this.emailControlName ).setValidators ( this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.EMAIL_ADDRESS, true ) );
        } else if ( deliveryMethod.code === DeliveryMethodCode.FAX ) {
          this.form.get ( this.faxControlName ).setValidators ( this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PHONE_NUMBER, true ) );
        }

        this.form.get ( this.emailControlName ).updateValueAndValidity ();
        this.form.get ( this.faxControlName ).updateValueAndValidity ();
      } )
    );
  }
}
