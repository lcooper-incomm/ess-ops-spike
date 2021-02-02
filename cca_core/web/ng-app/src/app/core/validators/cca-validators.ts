import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Session} from "../session/model/session";
import {Comment} from "../model/comment";
import * as _ from "lodash";
import * as moment from 'moment';

export class CcaValidators {

  static needsCommentFromUser ( userId: number, session: Session ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      const hasComment = !!_.find ( session.comments, function ( comment: Comment ) {
        return comment.createdBy.id === userId;
      } );
      return (hasComment || (control.valid && control.value)) ? null : { 'needscommentfromuser': true };
    };
  };

  static lengthEquals ( value: number ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      const isValid: boolean = !control.value || control.value.length === value;
      return isValid ? null : { 'lengthequals': { value } };
    };
  };

  static panVms (): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      const isValid: boolean = !control.value || (control.value.length === 4 || (control.value.length >= 15 && control.value.length <= 19));
      return isValid ? null : { 'panvms': true };
    };
  };

  static ssn ( lastFourOnly: boolean = false ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      const isValid: boolean = !control.value || control.value.length === 4 || (!lastFourOnly && control.value.length === 9);
      return isValid ? null : { 'ssn': lastFourOnly ? 'Must be 4 digits' : 'Must be either 4 or 9 digits' };
    };
  }

  static equals ( value: string, errorMessage?: string ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      const isValid = !control.value || control.value === value;
      return isValid ? null : {
        'equals': {
          value: value,
          message: errorMessage || `Must equal ${value}`
        }
      };
    };
  }

  static notEquals ( value: string, errorMessage?: string ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      const isValid = !control.value || control.value !== value;
      return isValid ? null : {
        'notequals': {
          value: value,
          message: errorMessage || `Must not equal ${value}`
        }
      };
    };
  }

  static date (): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      // Check the pattern, AND make sure it parses to a valid date
      const patternValidator = Validators.pattern ( '[0-1]{1}[0-9]{1}/[0-3]{1}[0-9]{1}/[1-2]{1}[0-9]{3}' );
      const isPatternValid   = !patternValidator ( control );
      // We shouldn't need to check !control.value here, but without it, the search parameters form breaks. Don't know why ¯\_(ツ)_/¯
      const isDateValid      = !control.value || !!Date.parse ( control.value );
      return isPatternValid && isDateValid ? null : { 'date': { format: 'MM/DD/YYYY' } };
    };
  }

  /**
   * Make sure the control date is beyond the input date.  If the input date is null or not provided,
   * it uses the current date.
   *
   * @param checkDate
   */
  static futureDate(checkDate?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        let begin = (checkDate) ? moment(checkDate).startOf('day') : moment().startOf('day');
        let value = moment(control.value).startOf('day');
        if (begin && value) {
          return value.isAfter(begin) ? null : {'futureDate': {message: 'Date must be a future date.'}};
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check the pattern, AND make sure it parses to a valid date
      const patternValidator = Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
      const isPatternValid   = !patternValidator(control);
      return isPatternValid ? null : {'email': 'Must be a valid email address'};
    };
  }

  static ivrDnis(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Pattern must be phone numbers comma and space delimited
      const patternValidator = Validators.pattern('^(()|([0])|((\\d{10})((, )?\\d{10}){0,}))$');
      const isPatternValid   = !patternValidator(control);
      return isPatternValid ? null : {'ivrDnis': 'Must be 10 digit phone numbers comma space delimited'};
    };
  }
}
