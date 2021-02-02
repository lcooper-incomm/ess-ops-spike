import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import {
  RequestFsapiC2cTransferWizard,
  RequestFsapiC2cTransferWizardPageType
} from "../request-fsapi-c2c-transfer-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { SpinnerSize } from "../../../../core/spinner/spinner-size.enum";
import { CustomerSearchService } from "../../../../core/search/customer-search.service";
import { SearchParameterValueType } from "../../../../core/search/search-type/search-parameter-value-type.enum";
import { finalize } from "rxjs/operators";
import { SearchTypeContainer } from "../../../../core/search/search-type-container";
import { SearchState } from "../../../../core/search/search-state";
import { snapshot } from "../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../app-state-type.enum";
import { SearchTypeType } from "../../../../core/search/search-type/search-type-type.enum";
import * as _ from "lodash";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Customer } from "../../../../core/customer/customer";
import { FsapiStatusType } from "../../../../core/status/fsapi-status/fsapi-status-type.enum";
import { Observable, of } from "rxjs";
import { FsapiC2cRequest } from "../../../../core/c2c-transfer/fsapi-c2c-request";
import { CcaFormBuilder } from "../../../../core/form/cca-form-builder.service";
import { CsCoreCurrency } from "@cscore/gringotts";
import { PlatformType } from 'src/app/core/platform/platform-type.enum';

@Component ( {
  selector: 'cca-request-fsapi-c2c-transfer-form-page',
  templateUrl: './request-fsapi-c2c-transfer-form-page.component.html',
  styleUrls: [ './request-fsapi-c2c-transfer-form-page.component.scss' ]
} )
export class RequestFsapiC2cTransferFormPageComponent extends WizardPage<RequestFsapiC2cTransferWizard> implements OnInit {

  isValidated: boolean  = false;
  key: string           = RequestFsapiC2cTransferWizardPageType.FORM_PAGE;
  SpinnerSize           = SpinnerSize;
  validationError: string;
  wizardForm: FormGroup = new FormGroup ( {} );

  @ViewChild ( 'validateSpinner' )
  validateSpinner: SpinnerComponent;

  constructor ( private customerSearchService: CustomerSearchService,
                private formBuilder: CcaFormBuilder,
                private store: Store<AppState> ) {
    super ();
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    this.wizard.model.request = this.buildRequest ();
    this.prepareTransferAmount ();
    return of ( RequestFsapiC2cTransferWizardPageType.CONFIRM_PAGE );
  }

  validateToCard (): void {
    this.validateSpinner.start ();
    this.isValidated     = false;
    this.validationError = null;

    let cardNumber = this.wizardForm.get ( 'toCard' ).value;
    let fromCard = this.wizard.model.fromCard.identifiers.pan;

    let searchTypeContainer = this.getSearchTypeContainer ();
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.PAN_GPR, cardNumber );
    searchTypeContainer.parameters.set ( SearchParameterValueType.PLATFORM, this.wizard.model.selection.platform );
    searchTypeContainer.parameters.set ( SearchParameterValueType.PARTNER, this.wizard.model.selection.partner.type );

    this.customerSearchService.search ( searchTypeContainer )
      .pipe ( finalize ( () => {
        this.validateSpinner.stop ();
        this.wizardForm.get ( 'isValidated' ).setValue ( this.isValidated );
      } ) )
      .subscribe ( ( results: Customer[] ) => {
        /*
        CCA-5030 This isn't the first time we've seen FSAPI return duplicate results. I've reported this issue to them,
        but in the meantime, it's easy enough for CCA to band-aid this. If we get more than one result back, make sure
        they aren't duplicate before failing the validation...
         */
        if ( results && results.length > 1 ) {
          results = _.uniqBy ( results, ( customer: Customer ) => customer.id );
        }

        if ( results && results.length === 1 ) {
          let customer = results[ 0 ];

          //Target card must be active
          let activeCard = customer.getCardByStatus ( FsapiStatusType.ACTIVE );
          if ( !activeCard ) {
            activeCard = customer.getCardByStatus ( FsapiStatusType.ACTIVE_UNREGISTERED );
          }
          //Target card can't be THIS card
          if ( activeCard && activeCard.identifiers.panLastFour === this.wizard.model.fromCard.identifiers.panLastFour ) {
            this.validationError = 'Select a Card that is NOT on this Account.';
            return;
          }
          //Target card can't be expired
          if ( activeCard && activeCard.expirationDate && activeCard.expirationDate.value < new Date () ) {
            this.validationError = 'Card is expired, and not eligible for Card-to-Card Transfer.';
            return;
          }

          let isMatch = activeCard && activeCard.identifiers.panLastFour === cardNumber.slice ( -4 );
          if ( !isMatch ) {
            this.validationError = 'Card is not eligible for Card-to-Card Transfer.';
          } else {
            //Target card must also be from same BIN
            let fromBin = fromCard.substring ( 0, 6 );
            let toBin   = activeCard.identifiers.pan.substring ( 0, 6 );
            if ( fromBin === toBin ) {
              this.wizard.model.toCard     = activeCard;
              this.wizard.model.toCustomer = customer;
              this.isValidated             = true;
            } else {
              this.validationError = 'Card is not from the same BIN, and is not eligible for Card-to-Card Transfer.';
            }
          }
        } else {
          this.validationError = 'Card Number is not valid.';
        }
      } );
  }

  private buildRequest (): FsapiC2cRequest {
    let formValue = this.wizardForm.getRawValue ();

    let request            = new FsapiC2cRequest ();
    request.amount         = Number ( Number ( formValue.amount ).toFixed ( 2 ) );
    request.comment        = formValue.comment;
    request.fromCustomerId = this.wizard.model.selection.getCustomer ().id;
    request.platform       = this.wizard.model.selection.platform;
    request.selectionId    = this.wizard.model.selection.id;
    request.sessionId      = this.wizard.model.session.id;
    request.toCustomerId   = this.wizard.model.toCustomer.id;
    request.transferFee    = this.wizard.model.transferFee ? this.wizard.model.transferFee.value : 0;

    return request;
  }

  private getSearchTypeContainer (): SearchTypeContainer {
    const searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    const searchTypeType           = this.wizard.model.selection.platform === PlatformType.CCL ? SearchTypeType.CCL_GIFT : SearchTypeType.VMS_GPR;
    const searchTypeContainer      = searchState.searchTypeContainers.find ( container => container.searchType.type === searchTypeType );
    return _.cloneDeep ( searchTypeContainer );
  }

  private initForm (): void {
    let transferFee           = this.wizard.model.transferFee ? this.wizard.model.transferFee.value : 0;
    let availableBalance      = this.wizard.model.selection.getCustomer ().accounts.spending.availableBalance ? this.wizard.model.selection.getCustomer ().accounts.spending.availableBalance.value : 0.00;
    let maximumTransferAmount = availableBalance - transferFee;

    this.wizardForm = new FormGroup ( {
      amount: new FormControl ( null, [ Validators.required, Validators.min ( 0.01 ), Validators.max ( maximumTransferAmount ) ] ),
      comment: this.formBuilder.comment ( null, true ),
      isValidated: new FormControl ( false, [ Validators.requiredTrue ] ),
      toCard: new FormControl ( null, [ Validators.required, Validators.minLength ( 15 ), Validators.maxLength ( 19 ) ] )
    } );
  }

  private prepareTransferAmount (): void {
    let amount                       = new CsCoreCurrency ();
    amount.value                     = this.wizard.model.request.amount;
    amount.displayValue              = `$${amount.value.toFixed ( 2 )}`;
    this.wizard.model.transferAmount = amount;
  }
}
