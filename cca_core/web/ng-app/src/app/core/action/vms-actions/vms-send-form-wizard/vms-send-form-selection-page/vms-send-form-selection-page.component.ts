import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../wizard/wizard-page";
import { FormTypeOption, VmsSendFormWizard } from "../vms-send-form-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GenericOption } from "../../../../model/generic-option";
import { CcaFormBuilder } from "../../../../form/cca-form-builder.service";
import { Observable, of } from "rxjs";
import { DeliveryMethodCode } from 'src/app/core/model/minion/task/delivery-method';
import { WizardWidth } from "../../../../wizard/wizard-width.enum";
import { CsCoreAddress, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { FeeDetail } from "../../../../model/fee-detail";
import { MonthGenericOptionService } from "../../../../form/month-generic-option.service";
import { Card } from "../../../../card/card";
import { FsapiStatusType } from "../../../../status/fsapi-status/fsapi-status-type.enum";
import * as _ from "lodash";
import { CsCoreCurrency, CsCoreCurrencyCode, CsCoreCurrencyUtil } from "@cscore/gringotts";
import { pairwise } from 'rxjs/operators';

@Component ( {
  selector: 'cca-vms-send-form-select-form-page',
  templateUrl: './vms-send-form-selection-page.component.html',
  styleUrls: [ './vms-send-form-selection-page.component.scss' ]
} )
export class VmsSendFormSelectionPageComponent extends WizardPage<VmsSendFormWizard> implements OnInit {

  addressForm: FormGroup;
  closeButtonText: string = 'Cancel';
  currentMonth: number    = new Date ().getMonth ();
  currentYear: number     = new Date ().getFullYear ();
  isBackable: boolean     = false;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  key: string             = 'selection-page';
  nextButtonText: string  = 'Submit';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private formBuilder: CcaFormBuilder,
                private monthOptionService: MonthGenericOptionService ) {
    super ();
    this.width = WizardWidth.MEDIUM;
  }

  formTypeOptions: GenericOption<FormTypeOption>[] = [];
  monthOptions: GenericOption<number>[]            = this.monthOptionService.monthOptions_en ();
  yearOptions: GenericOption<number>[]             = [];

  onLoad (): Observable<any> {
    this.populateFormTypeOptions ();
    if ( this.formTypeOptions.length === 1 ) {
      this.wizardForm.get ( 'formType' ).setValue ( this.formTypeOptions[ 0 ].value );
      this.wizardForm.get ( 'formType' ).disable ();
    }
    return of ( null );
  }

  onNext (): Observable<any> {
    const deliveryMethodForm = this.wizardForm.get ( 'deliveryMethod' );

    if ( this.wizard.model.selectedFormType === FormTypeOption.ACCOUNT_STATEMENT ) {
      this.wizard.model.selectedMonth = this.wizardForm.get ( 'monthSelect' ).value;
      this.wizard.model.selectedYear  = this.wizardForm.get ( 'yearSelect' ).value;
      this.wizard.model.waiveFee      = this.wizardForm.get ( 'waiveFee' ).value;

      if ( this.wizard.model.selection.getCustomer ().isVmsGiftCard ) {
        this.wizard.model.missingFirstName = this.wizardForm.get ( 'missingFirstName' ).value;
        this.wizard.model.missingLastName  = this.wizardForm.get ( 'missingLastName' ).value;
        this.wizard.model.confirmedAddress = new CsCoreAddress ( this.addressForm.value );
      }
    }

    // these pieces always need to get saved on the model
    this.wizard.model.deliveryMethod   = deliveryMethodForm.get ( 'deliveryMethod' ).value;
    this.wizard.model.selectedFormType = this.wizardForm.get ( 'formType' ).value;

    // save data specific to delivery method
    switch ( this.wizard.model.deliveryMethod.code ) {
      case DeliveryMethodCode.EMAIL:
        if ( !this.wizard.model.email ) {
          this.wizard.model.email = deliveryMethodForm.get ( 'email' ).value;
        }
        break;
      case DeliveryMethodCode.FAX:
        if ( !this.wizard.model.faxNumber ) {
          this.wizard.model.faxNumber = new CsCorePhoneNumber ( {
            number: deliveryMethodForm.get ( 'fax' ).value,
            type: CsCorePhoneNumberType.FAX
          } );
        }
        break;
      case DeliveryMethodCode.MAIL:
        if ( !this.wizard.model.confirmedAddress ) {
          this.wizard.model.confirmedAddress = new CsCoreAddress ( this.addressForm.value );
        }
        break;
    }

    return of ( 'confirm-page' );
  }

  ngOnInit () {
    this.initForm ();
    // populate options arrays
    this.populateYearOptions ();
  }

  private determineFeeIfAny (): CsCoreCurrency {
    let feeDetail: FeeDetail              = null;
    let paperStatementFee: CsCoreCurrency = null;

    if ( this.wizard.model.selection.getActiveFeePlan () ) {
      feeDetail = this.wizard.model.selection.getActiveFeePlan ().getFeeDetailByDescription ( 'PAPER STATEMENT FEE' );
    }
    if ( feeDetail ) {
      paperStatementFee = feeDetail.amount;
    }

    return paperStatementFee;
  }

  isMonthDisabled ( month: number ): boolean {
    return this.wizardForm.get ( 'yearSelect' ).value === this.currentYear && month > this.currentMonth;
  }

  private initForm (): void {
    this.wizard.model.email            = this.wizard.model.selection.getCustomer ().emailAddress;
    this.wizard.model.faxNumber        = this.wizard.model.selection.getCustomer ().getPhoneNumberByType ( CsCorePhoneNumberType.FAX );
    this.wizard.model.confirmedAddress = this.wizard.model.selection.getCustomer ().getPreferredAddress ();

    this.wizardForm = new FormGroup ( {
      deliveryMethod: this.formBuilder.deliveryMethod ( null, this.wizard.model.email, this.wizard.model.faxNumber && this.wizard.model.faxNumber.number, true ),
      formType: new FormControl ( null, [ Validators.required ] ),
      missingFirstName: new FormControl ( this.wizard.model.missingFirstName ),
      missingLastName: new FormControl ( this.wizard.model.missingLastName ),
      monthSelect: new FormControl ( null ),
      waiveFee: new FormControl ( this.wizard.model.waiveFee ),
      yearSelect: new FormControl ( null )
    } );

    // We assume that GPR customers will always have an address
    // For Gift Card customers, add an address form if there is no address
    if ( this.wizard.model.selection.getCustomer ().isVmsGiftCard && !this.wizard.model.confirmedAddress ) {
      this.addressForm = this.formBuilder.address ( null, true );
      this.wizardForm.addControl ( 'address', this.addressForm );
    }

    this.wizardForm.get ( 'monthSelect' ).setValue ( this.currentMonth );
    this.wizardForm.get ( 'yearSelect' ).setValue ( this.currentYear );

    this.subscribeToDeliveryMethod ();
    this.subscribeToFormType ();
    this.subscribeToWaiveFee ();
    this.subscribeToYearSelect ();
  }

  private populateFormTypeOptions (): void {
    this.formTypeOptions = [];

    //Account statement is only available if there's an "active" card on the account
    let activeCard = _.find ( this.wizard.model.selection.getCustomer ().cards, ( card: Card ) => {
      return _.includes ( [ FsapiStatusType.ACTIVE, FsapiStatusType.ACTIVE_UNREGISTERED ], card.getFsapiStatus () );
    } );

    if ( activeCard ) {
      this.formTypeOptions.push ( this.wizard.model.optionFormAccountStatement );
    }

    // customer-action.service.ts will only allow the "Send Forms" action for VMS Gift if the card is in ACTIVE or ACTIVE_UNREGISTERED status
    if ( this.wizard.model.selection.selectedCard.isVmsGiftCard ) {
      // if selected card is VMS Gift, autoselect Account Statement
      this.wizardForm.get ( 'formType' ).setValue ( FormTypeOption.ACCOUNT_STATEMENT );
    } else {
      // only make Direct Deposit available for GPR cards
      this.formTypeOptions.push ( this.wizard.model.optionFormDirectDeposit );
    }
  }

  private populateYearOptions (): void {
    let earliestActivationDate: Date;
    this.wizard.model.selection.getCustomer ().cards.forEach ( ( card: Card ) => {
      if ( card.activation && card.activation.activationDate &&
        (!earliestActivationDate || card.activation.activationDate.value < earliestActivationDate) ) {
        earliestActivationDate = card.activation.activationDate.value;
      }
    } );

    // if there is an activation date, build years from activation date to current year
    if ( earliestActivationDate ) {
      let activationDate = new Date ( earliestActivationDate );
      let activationYear = activationDate.getFullYear ();
      while ( activationYear <= this.currentYear ) {
        this.yearOptions.push ( { value: activationYear, displayValue: activationYear.toString () } );
        activationYear++;
      }
    }

    // else build last 6 years
    else {
      let startYear = this.currentYear - 6;
      while ( startYear <= this.currentYear ) {
        this.yearOptions.push ( { value: startYear, displayValue: startYear.toString () } );
        startYear++;
      }
    }
  }

  private subscribeToDeliveryMethod (): void {
    const deliveryMethodForm = this.wizardForm.get ( 'deliveryMethod' );
    this.addSubscription (
      deliveryMethodForm.get ( 'deliveryMethod' ).valueChanges
        .pipe ( pairwise () )
        .subscribe ( ( [ previous, current ]: DeliveryMethodCode[] ) => {
          if ( current === DeliveryMethodCode.EMAIL ) {
            this.wizardForm.get ( 'waiveFee' ).setValue ( true );
            this.wizardForm.get ( 'waiveFee' ).disable ();
          }
          // Was EMAIL but isn't anymore
          else if ( previous === DeliveryMethodCode.EMAIL ) {
            this.wizardForm.get ( 'waiveFee' ).setValue ( false );
            this.wizardForm.get ( 'waiveFee' ).enable ();
          }
        } )
    );
  }

  private subscribeToFormType (): void {
    this.addSubscription (
      this.wizardForm.get ( 'formType' ).valueChanges
        .subscribe ( ( value: FormTypeOption ) => {
          this.wizard.model.selectedFormType = value;
          if ( this.wizard.model.selection.getCustomer ().isVmsGiftCard ) {
            this.wizardForm.get ( 'missingFirstName' ).enable ();
            this.wizardForm.get ( 'missingFirstName' ).setValidators ( [ Validators.required ] );
            this.wizardForm.get ( 'missingLastName' ).enable ();
            this.wizardForm.get ( 'missingLastName' ).setValidators ( [ Validators.required ] );
          } else {
            this.wizardForm.get ( 'missingFirstName' ).disable ();
            this.wizardForm.get ( 'missingFirstName' ).clearValidators ();
            this.wizardForm.get ( 'missingLastName' ).disable ();
            this.wizardForm.get ( 'missingLastName' ).clearValidators ();
          }

          // toggle the validators on date range FormControls based on which FormType was selected
          if ( this.wizard.model.selectedFormType === FormTypeOption.ACCOUNT_STATEMENT ) {
            this.wizardForm.get ( 'monthSelect' ).enable ();
            this.wizardForm.get ( 'monthSelect' ).setValidators ( [ Validators.required ] );
            this.wizardForm.get ( 'yearSelect' ).enable ();
            this.wizardForm.get ( 'yearSelect' ).setValidators ( [ Validators.required ] );
          } else {
            this.wizardForm.get ( 'monthSelect' ).disable ();
            this.wizardForm.get ( 'monthSelect' ).clearValidators ();
            this.wizardForm.get ( 'yearSelect' ).disable ();
            this.wizardForm.get ( 'yearSelect' ).setValidators ( null );
          }
        } )
    );
  }

  private subscribeToYearSelect (): void {
    this.onFormFieldChange<number> ( 'yearSelect', year => {
      if ( year === this.currentYear && this.wizardForm.get ( 'monthSelect' ).value > this.currentMonth ) {
        this.wizardForm.get ( 'monthSelect' ).setValue ( null );
      }
    } )
  }

  private subscribeToWaiveFee (): void {
    this.addSubscription ( this.wizardForm.get ( 'waiveFee' ).valueChanges
      .subscribe ( ( waiveFee: boolean = false ) => {
        if ( waiveFee ) {
          this.wizard.model.statementFee = CsCoreCurrencyUtil.buildWithCode ( 0.00, CsCoreCurrencyCode.USD );
        } else {
          this.wizard.model.statementFee = this.determineFeeIfAny ();
        }
      } )
    );
  }
}
