import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchTypeType} from "../../core/search/search-type/search-type-type.enum";
import {SearchTypeContainer} from "../../core/search/search-type-container";
import {SearchParameter} from "../../core/search/search-type/search-parameter";
import {SearchParameterType} from "../../core/search/search-type/search-parameter-type.enum";
import {CcaFormBuilder} from '../../core/form/cca-form-builder.service';
import {SearchParameterValueType} from "../../core/search/search-type/search-parameter-value-type.enum";
import {SearchTypeParameterGroupParameter} from "../../core/search/search-type/search-type-parameter-group-parameter";

@Injectable ( {
  providedIn: 'root'
} )
export class SearchParameterFormBuilder {

  constructor ( private formBuilder: CcaFormBuilder ) {
  }

  build ( searchTypeContainer: SearchTypeContainer ): FormGroup {
    let controls: any = {};

    if ( searchTypeContainer ) {
      searchTypeContainer.searchType.parameterGroups.forEach ( group => {
        group.parameters.forEach ( ( parameter: SearchTypeParameterGroupParameter ) => {
          //The IDENTIFICATION parameter actually consists of two separate parameters combined into one UI component
          switch ( parameter.parameter.type ) {
            case SearchParameterType.IDENTIFICATION:
              this.appendIdentificationControls ( controls, searchTypeContainer );
              break;
            default:
              controls[ parameter.parameter.value ] = this.buildFormControl ( parameter.parameter, searchTypeContainer );
              break;
          }
        } );
      } );

      //Add Advanced checkbox if necessary
      if ( searchTypeContainer.searchType.hasAdvancedParameter () ) {
        controls.showAdvanced = new FormControl ( searchTypeContainer.parameters.get ( 'showAdvanced' ), [] );
      }
      //Add Partner if necessary
      if ( searchTypeContainer.searchType.partners.length ) {
        controls.partner = new FormControl ( searchTypeContainer.parameters.get ( 'partner' ), [ Validators.required ] );
      } else if ( searchTypeContainer.searchType.type === SearchTypeType.BOL_ORDER ) {
        controls.bolPartner = new FormControl ( searchTypeContainer.parameters.get ( SearchParameterValueType.BOL_PARTNER ), [ Validators.required ] );
      }
      if (searchTypeContainer.searchType.type === SearchTypeType.ALDER) {
        controls.alderSearchType = new FormControl( searchTypeContainer.parameters.get ( SearchParameterValueType.ALDER_SEARCH_TYPE), [Validators.required] );
      }
      if (searchTypeContainer.searchType.type === SearchTypeType.ENCOR) {
        controls.encorProgram = new FormControl( searchTypeContainer.parameters.get ( SearchParameterValueType.ENCOR_PROGRAM), [Validators.required] );
      }
      // Add Session Class if necessary
      if ( searchTypeContainer.searchType.type === SearchTypeType.SESSION ) {
        controls.sessionClass = new FormControl ( searchTypeContainer.parameters.get ( 'sessionClass' ), [ Validators.required ] );
      }
      // Add Recent Activity Only checkbox if necessary
      if ( searchTypeContainer.searchType.type === SearchTypeType.FASTCARD_FASTPIN ) {
        controls.recentActivity = new FormControl ( searchTypeContainer.parameters.get ( 'recentActivity' ), [] );
      }
    }

    return new FormGroup ( controls );
  }

  private appendIdentificationControls ( controls: any, container: SearchTypeContainer ): void {
    let identificationType = container.parameters[ SearchParameterValueType.IDENTIFICATION_TYPE ];

    controls[ SearchParameterValueType.IDENTIFICATION_TYPE ]   = new FormControl ( identificationType, [] );
    controls[ SearchParameterValueType.IDENTIFICATION_NUMBER ] = new FormControl ( container.parameters[ SearchParameterValueType.IDENTIFICATION_NUMBER ], [] );

    //Disable the ID if we don't have a TYPE
    if ( !identificationType ) {
      controls[ SearchParameterValueType.IDENTIFICATION_NUMBER ].disable ();
    }
  }

  private buildFormControl ( parameter: SearchParameter, container: SearchTypeContainer ): FormControl {
    let formControl: FormControl;
    let currentValue = container.parameters.get ( parameter.value );

    switch ( parameter.type ) {
      case SearchParameterType.ACCOUNT_NUMBER:
        formControl = this.formBuilder.accountNumber ( currentValue );
        break;
      case SearchParameterType.CAN:
        formControl = this.formBuilder.can ( currentValue );
        break;
      case SearchParameterType.CARD_ID:
        formControl = this.formBuilder.cardId ( currentValue );
        break;
      case SearchParameterType.CUSTOMER_PHONE:
      case SearchParameterType.PHONE_NUMBER:
        formControl = this.formBuilder.phoneNumber ( currentValue );
        break;
      case SearchParameterType.DATE_OF_BIRTH:
      case SearchParameterType.END_DATE:
      case SearchParameterType.START_DATE:
        formControl = this.formBuilder.date ( currentValue );
        break;
      case SearchParameterType.EMAIL_ADDRESS:
      case SearchParameterValueType.RECIPIENT_EMAIL_ADDRESS:
        formControl = this.formBuilder.emailAddress ( currentValue );
        break;
      case SearchParameterType.LAST_FOUR:
        formControl = this.formBuilder.lastFour ( currentValue );
        break;
      case SearchParameterType.PAN:
      case SearchParameterType.BOL_CARD_NUMBER:
        formControl = this.formBuilder.pan ( currentValue );
        break;
      case SearchParameterType.PAN_VMS:
        formControl = this.formBuilder.panVms ( currentValue );
        break;
      case SearchParameterType.PRE_AUTH_KEY:
        formControl = this.formBuilder.preAuthKey ( currentValue );
        break;
      case SearchParameterType.POSTAL_CODE:
        formControl = this.formBuilder.postalCode ( currentValue );
      case SearchParameterType.SERIAL_NUMBER:
        formControl = this.formBuilder.serialNumber ( currentValue );
        break;
      case SearchParameterType.SSN:
        formControl = this.formBuilder.ssn ( currentValue );
        break;
      case SearchParameterType.TRANSACTION_ID:
        formControl = this.formBuilder.transactionId ( currentValue );
        break;
      case SearchParameterType.VAN:
        formControl = this.formBuilder.van ( currentValue );
        break;
      default:
        formControl = new FormControl ( currentValue, [] );
        break;
    }

    return formControl;
  }

  private isParameterVisibleForPartner (): void {

  }
}
