import { Injectable } from '@angular/core';
import { SearchTypeContainer } from "../../core/search/search-type-container";
import { FormGroup } from "@angular/forms";
import { CodexService } from "../../codex/codex.service";
import { Observable } from 'rxjs';
import * as _ from "lodash";
import { CcaFormValidationService } from "../../core/form/cca-form-validation.service";
import { SearchParameterType } from "../../core/search/search-type/search-parameter-type.enum";
import { SearchParameterValueType } from "../../core/search/search-type/search-parameter-value-type.enum";
import { Store } from "@ngrx/store";
import { AppState } from '../../app-state';
import { map } from "rxjs/operators";

@Injectable ( {
  providedIn: 'root'
} )
export class SearchFormValidator {

  constructor ( private codexService: CodexService,
                private formValidationService: CcaFormValidationService,
                private store: Store<AppState> ) {
  }

  /**
   * Runs the validation Codex, updates the form accordingly, and returns the validation results for further use.
   */
  validateAndUpdate ( container: SearchTypeContainer, form: FormGroup ): Observable<any> {
    return this.runValidationCodex ( container, form )
      .pipe ( map ( result => {
        this.applyValidationResults ( container, form, result );
        return result;
      } ) );
  }

  private applyValidationResults ( container: SearchTypeContainer, form: FormGroup, codexSeed: any ): void {
    container.searchType.getAllParameters ().forEach ( parameter => {
      //Handle Identification as special case
      if ( parameter.type === SearchParameterType.IDENTIFICATION ) {
        let isTypeEnabled: boolean    = !!codexSeed.enabledParameters && _.includes ( codexSeed.enabledParameters, SearchParameterType.IDENTIFICATION_TYPE );
        let isTypeRequired: boolean   = !!codexSeed.enabledParameters && _.includes ( codexSeed.requiredParameters, SearchParameterType.IDENTIFICATION_TYPE );
        let isNumberEnabled: boolean  = !!codexSeed.enabledParameters && _.includes ( codexSeed.enabledParameters, SearchParameterType.IDENTIFICATION_NUMBER );
        let isNumberRequired: boolean = !!codexSeed.enabledParameters && _.includes ( codexSeed.requiredParameters, SearchParameterType.IDENTIFICATION_NUMBER );

        let identificationTypeControl   = form.get ( SearchParameterValueType.IDENTIFICATION_TYPE );
        let identificationNumberControl = form.get ( SearchParameterValueType.IDENTIFICATION_NUMBER );

        if ( isTypeEnabled ) {
          identificationTypeControl.enable ();
        } else {
          identificationTypeControl.disable ();
        }

        //Only enable the number field if a type has been selected
        if ( form.value[ SearchParameterValueType.IDENTIFICATION_TYPE ] && isNumberEnabled ) {
          identificationNumberControl.enable ();
        } else {
          identificationNumberControl.disable ();
        }

        identificationTypeControl.setValidators ( this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.IDENTIFICATION_TYPE ) );
        identificationNumberControl.setValidators ( this.formValidationService.getValidatorsForSearchParameter ( SearchParameterType.IDENTIFICATION_NUMBER ) );
      }
      //Everything else is done this way
      else {
        let isEnabled: boolean  = !!codexSeed.enabledParameters && _.includes ( codexSeed.enabledParameters, parameter.type );
        let isRequired: boolean = !!codexSeed.requiredParameters && _.includes ( codexSeed.requiredParameters, parameter.type );

        if ( isEnabled ) {
          form.get ( parameter.value ).enable ();
        } else {
          form.get ( parameter.value ).disable ();
        }

        form.get ( parameter.value ).setValidators ( this.formValidationService.getValidatorsForSearchParameter ( parameter.type, isRequired ) );
      }
    } );
  }

  private buildSeed ( container: SearchTypeContainer, form: FormGroup ): any {
    let formValue = form.value;
    let seed: any = {
      populatedParameters: []
    };

    // Append seed fields
    seed.searchType = container.searchType.type;

    // Copy parameters, but use the parameter's TYPE enum value, not the "value" field as it is in the form
    container.searchType.getAllParameters ().forEach ( parameter => {
      // Handle Identification as special case
      if ( parameter.type === SearchParameterType.IDENTIFICATION ) {
        seed[ SearchParameterType.IDENTIFICATION_TYPE ]   = formValue[ SearchParameterValueType.IDENTIFICATION_TYPE ];
        seed[ SearchParameterType.IDENTIFICATION_NUMBER ] = formValue[ SearchParameterValueType.IDENTIFICATION_NUMBER ];
        if ( formValue[ SearchParameterValueType.IDENTIFICATION_NUMBER ] ) {
          seed.populatedParameters.push ( SearchParameterValueType.IDENTIFICATION_NUMBER );
        }
      }
      //Everything else here
      else {
        seed[ parameter.type ] = formValue[ parameter.value ];
        if ( formValue[ parameter.value ] ) {
          seed.populatedParameters.push ( parameter.type );
        }
      }
    } );

    return seed;
  }

  private runValidationCodex ( container: SearchTypeContainer, form: FormGroup ): Observable<any> {
    let codexName: string = `CCA_SEARCH_PARAMETERS_${container.searchType.type}`;
    let seed: any         = this.buildSeed ( container, form );
    return this.codexService.runOne ( codexName, seed );
  }
}
