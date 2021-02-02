import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from "@angular/forms";
import { SearchParameterType } from "../search/search-type/search-parameter-type.enum";
import { CcaValidators } from "../validators/cca-validators";

@Injectable ( {
  providedIn: 'root'
} )
export class CcaFormValidationService {

  constructor () {
  }

  getValidatorsForSearchParameter ( parameterType: string, isRequired: boolean = false ): ValidatorFn[] {
    let validators: ValidatorFn[] = [];

    switch ( parameterType ) {
      case SearchParameterType.ACCOUNT_NUMBER:
        validators.push ( Validators.minLength ( 6 ) );
        break;
      case SearchParameterType.CAN:
        validators.push ( Validators.minLength ( 9 ) );
        break;
      case SearchParameterType.CARD_ID:
        validators.push ( Validators.minLength ( 19 ) );
        break;
      case SearchParameterType.REVERSE_VRN_BY_CONTROL_NUMBER:
        validators.push ( Validators.minLength ( 19 ) );
        break;
      case SearchParameterType.DATE_OF_BIRTH:
      case SearchParameterType.START_DATE:
      case SearchParameterType.END_DATE:
        validators.push ( CcaValidators.date () );
        break;
      case SearchParameterType.EMAIL_ADDRESS:
        validators.push ( Validators.email );
        validators.push ( Validators.maxLength(50));
        break;
      case SearchParameterType.LAST_FOUR:
        validators.push ( CcaValidators.lengthEquals ( 4 ) );
        break;
      case SearchParameterType.PAN_VMS:
        validators.push ( CcaValidators.panVms () );
        break;
      case SearchParameterType.PHONE_NUMBER:
        validators.push ( CcaValidators.lengthEquals ( 10 ) );
        break;
      case SearchParameterType.PIN:
        validators.push ( Validators.minLength ( 10 ) );
        break;
      case SearchParameterType.POSTAL_CODE:
        validators.push ( Validators.minLength ( 3 ) );
        validators.push ( Validators.maxLength ( 7 ) );
        break;
      case SearchParameterType.PRE_AUTH_KEY:
        validators.push ( Validators.minLength ( 9 ) );
        break;
      case SearchParameterType.PROXY_NUMBER:
        validators.push ( Validators.minLength ( 9 ) );
        break;
      case SearchParameterType.SERIAL_NUMBER:
        validators.push ( Validators.minLength ( 9 ) );
        break;
      case SearchParameterType.TRANSACTION_ID:
        validators.push ( Validators.minLength ( 9 ) );
        break;
      case SearchParameterType.PAN:
      case SearchParameterType.VAN:
      case SearchParameterType.BOL_CARD_NUMBER:
        validators.push ( Validators.minLength ( 16 ) );
        validators.push ( Validators.maxLength ( 19 ) );
        break;
      default:
        break;
    }

    if ( isRequired ) {
      validators.push ( Validators.required );
    }

    return validators;
  }

}
