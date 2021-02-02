import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { CsCoreAddress } from "@cscore/core-client-model";
import { CcaFormValidationService } from "./cca-form-validation.service";
import { SearchParameterType } from "../search/search-type/search-parameter-type.enum";
import { DeliveryMethodCode } from "../model/minion/task/delivery-method";
import { CcaValidators } from '../validators/cca-validators';

@Injectable ( {
  providedIn: 'root'
} )
export class CcaFormBuilder {

  constructor ( private formValidationService: CcaFormValidationService ) {
  }

  accountNumber ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.ACCOUNT_NUMBER, isRequired ) );
  }

  address ( address: CsCoreAddress | null, isRequired: boolean = false ): FormGroup {
    let controls: any = {
      line1: new FormControl ( address && address.line1, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.ADDRESS_LINE_1, isRequired ) ),
      line2: new FormControl ( address && address.line2, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.ADDRESS_LINE_2 ) ),
      city: new FormControl ( address && address.city, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.CITY, isRequired ) ),
      state: new FormControl ( address && address.state, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.STATE_PROVINCE, isRequired ) ),
      postalCode: new FormControl ( address && address.postalCode, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.POSTAL_CODE, isRequired ) ),
      country: new FormControl ( address && address.country, [] )
    };

    return new FormGroup ( controls );
  }

  can ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.CAN, isRequired ) );
  }

  cardId ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.CARD_ID, isRequired ) );
  }

  comment ( value: string, isRequired: boolean = false ): FormControl {
    let validators: ValidatorFn[] = [ Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ];
    if ( isRequired ) {
      validators.push ( Validators.required );
    }
    return new FormControl ( value, validators )
  }

  controlNumberVrn ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.REVERSE_VRN_BY_CONTROL_NUMBER, isRequired ) );
  }

  date ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.DATE_OF_BIRTH, isRequired ) );
  }

  deliveryMethod ( value: DeliveryMethodCode | null, email?: string, fax?: string, isRequired: boolean = false ): FormGroup {
    return new FormGroup ( {
      deliveryMethod: new FormControl ( value, isRequired ? Validators.required : null ),
      email: this.emailAddress ( email ),
      fax: this.phoneNumber ( fax ),
    } )
  }

  emailAddress ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.EMAIL_ADDRESS, isRequired ) );
  }

  lastFour ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.LAST_FOUR, isRequired ) );
  }

  pan ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PAN, isRequired ) );
  }

  panVms ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PAN_VMS, isRequired ) );
  }

  phoneNumber ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PHONE_NUMBER, isRequired ) );
  }

  pin ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PIN, isRequired ) );
  }

  postalCode ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.POSTAL_CODE, isRequired ) );
  }

  preAuthKey ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PRE_AUTH_KEY, isRequired ) );
  }

  proxyNumber ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.PROXY_NUMBER, isRequired ) );
  }

  serialNumber ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.SERIAL_NUMBER, isRequired ) );
  }

  ssn ( value: string, lastFourOnly: boolean = false, isRequired: boolean = false ): FormControl {
    const validators = [ CcaValidators.ssn ( lastFourOnly ) ];
    if ( isRequired ) {
      validators.push ( Validators.required );
    }
    return new FormControl ( value, validators );
  }

  transactionId ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.TRANSACTION_ID, isRequired ) );
  }

  van ( value: string, isRequired: boolean = false ): FormControl {
    return new FormControl ( value, this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.VAN, isRequired ) );
  }
}
