import { Component, OnInit } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ActivateFastcardWizard } from '../activate-fastcard-wizard';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { IdentifierType } from 'src/app/core/session/model/identifier-type.enum';
import { CardService } from 'src/app/core/card/card.service';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { finalize, tap, filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Card } from 'src/app/core/card/card';
import { GenericOption } from 'src/app/core/model/generic-option';
import { BillableOption } from '../../aps/aps-models';
import { ApsService } from '../../aps/aps.service';
import { ActivateFastcardRequest } from '../../aps/aps-request';
import { ToastFactory } from 'src/app/toast/toast-factory.service';
import { Logger } from 'src/app/logging/logger.service';
import { IncommStatusType } from 'src/app/core/status/incomm-status/incomm-status-type.enum';
import {SecurityService} from "../../../../core/security/security.service";

export type MerchantId = string;

@Component ( {
  selector: 'cca-activate-fastcard-form-page',
  templateUrl: './activate-fastcard-form-page.component.html',
  styleUrls: [ './activate-fastcard-form-page.component.scss' ],
} )
export class ActivateFastcardFormPageComponent extends WizardPage<ActivateFastcardWizard> implements OnInit {
  key: string           = 'form-page';
  wizardForm: FormGroup = this.formBuilder.group ( {
    cardIdentifierType: [ null ],
    cardIdentifier: [ null ],
  } );

  closeButtonText: string = 'Cancel';

  isCloseable: boolean = true;
  isNextable: boolean  = true;

  isCardValid: boolean = false;
  isVariable: boolean  = false;
  searching: boolean   = false;

  cardTypes: GenericOption<IdentifierType>[]       = ApsService.getActivationIdentifierTypeOptions ();
  activationTypes: GenericOption<BillableOption>[] = ApsService.getActivationBillingOptions ();
  reasons: string[]                         = ApsService.getActivationReasons ();

  constructor (
    private formBuilder: FormBuilder,
    private cardService: CardService,
    private toast: ToastFactory,
    private logger: Logger,
    private securityService: SecurityService
  ) {
    super ();
    this.initForm ();
  }

  ngOnInit () {
    this.onFormFieldChange ( 'cardIdentifierType', ( option: GenericOption<IdentifierType> ) => {
      const cardIdentifierControl = this.wizardForm.get ( 'cardIdentifier' );
      cardIdentifierControl.setValue ( null );
      cardIdentifierControl.setValidators ( ActivateFastcardFormPageComponent.getIdentifierValidators ( option.value ) );
      this.isCardValid = false;
    } );
    this.onFormFieldChange ( 'cardIdentifier', () => this.isCardValid = false );
    this.onFormFieldChange ( 'activationType', ( activationType: GenericOption<BillableOption> ) => {
      this.wizard.model.billable = activationType.value === 'billable';
    } );
  }

  get hasRangeError (): boolean {
    return this.wizardForm.get ( 'cardIdentifier' ).hasError ( 'minlength' ) || this.wizardForm.get ( 'cardIdentifier' ).hasError ( 'maxlength' );
  }

  get identifierRange (): { min: number, max: number } | null {
    const cardIdentifierType: GenericOption<IdentifierType> = this.getCardIdentifierType ();
    return cardIdentifierType && ActivateFastcardFormPageComponent.getIdentifierRange ( cardIdentifierType.value );
  }

  get identifierPlaceholder (): string {
    const cardIdentifierType: GenericOption<IdentifierType> = this.getCardIdentifierType ();
    return !cardIdentifierType ? 'Card Number' : cardIdentifierType.displayValue;
  }

  onNext (): Observable<string> {
    const [ request, merchantId ] = this.buildRequest ();
    this.wizard.model.request     = request;
    this.wizard.model.merchantId  = merchantId;
    return of ( 'confirmation-page' );
  }

  get searchEnabled (): boolean {
    return this.getCardIdentifier () && this.wizardForm.get ( 'cardIdentifier' ).valid && !this.searching && !this.isCardValid;
  }

  validateCard (): void {
    this.searching                                   = true;
    const cardIdentifierType: GenericOption<IdentifierType> = this.getCardIdentifierType ();
    const cardIdentifier: string                     = this.getCardIdentifier ();
    if ( cardIdentifierType && cardIdentifier ) {
      this.addSubscription (
        this.cardService
        .findOne ( cardIdentifierType.value, cardIdentifier, this.securityService.getCurrentUser().prefDefaultDataSource )
        .pipe (
          tap ( null, err => this.handleCardSearchError ( err ) ),
          map ( card => this.validate ( card ) ),
          filter ( val => !!val ),
          finalize ( () => this.searching = false ),
        )
          .subscribe ( ( card: Card ) => {
            this.isCardValid = true;
            this.isVariable  = card.alerts && card.alerts.isVariable;
            if ( this.isVariable ) {
              this.wizardForm.get ( 'amount' ).setValidators ( Validators.required );
            }
          } )
      );
    } else {
      this.logger.error ( 'cardIdentifierType and cardIdentifier should not have been null' );
    }
  }

  private buildRequest(): [ActivateFastcardRequest, MerchantId] {
    // Form data
    const activationType = this.getActivationType().value;
    const amount         = this.getAmount ();
    const comment        = this.getComment ();
    const identifier     = this.getCardIdentifier ();
    const identifierType = this.getCardIdentifierType ().value;
    const note           = this.getReason ();

    // Finalize billing data
    const billable         = activationType === BillableOption.BILLABLE;
    const overrideMerchant = !billable;
    const billingData      = billable ? ApsService.getApsLocationFromSelection ( this.wizard.model.selection ) : ApsService.getIncommApsLocation ();

    const data = {
      amount,
      comment,
      identifier,
      identifierType,
      note,
      overrideMerchant,
      ...billingData,
    };

    return [ new ActivateFastcardRequest ( data ), billingData.merchantId ];
  }

  private getActivationType (): GenericOption<BillableOption> {
    return this.getValueFromForm ( 'activationType' );
  }

  private getAmount(): string|null {
    return this.getValueFromForm ( 'amount' );
  }

  private getCardIdentifier (): string {
    return this.getValueFromForm ( 'cardIdentifier' );
  }

  private getCardIdentifierType (): GenericOption<IdentifierType> {
    return this.getValueFromForm ( 'cardIdentifierType' );
  }

  private getComment(): string {
    return this.getValueFromForm ( 'comment' );
  }

  private static getIdentifierRange ( identifierType: IdentifierType ): { min: number, max: number } | null {
    switch ( identifierType ) {
      case IdentifierType.VAN:
        return { min: 16, max: 19 };
      case IdentifierType.SERIALNUMBER:
        return { min: 9, max: 11 };
      case IdentifierType.PIN:
        return { min: 10, max: 29 };
      default:
        return { min: 1, max: 1 };
    }
  }

  private getReason (): string {
    return this.getValueFromForm ( 'reason' );
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      activationType: [ this.activationTypes[ 0 ], Validators.required ],
      amount: [ null ],
      cardIdentifier: [ null, Validators.required ],
      cardIdentifierType: [ null, Validators.required ],
      comment: [ null, Validators.required ],
      reason: [ null, Validators.required ],
    } );
  }

  private handleCardSearchError ( err: any ) {
    this.logger.error ( err );
    this.toast.error ( 'An error occured while attempting to validate card' );
  }

  private validate ( card: Card | null ) {
    const error = ActivateFastcardFormPageComponent.checkForError ( card );
    if ( error ) {
      this.toast.warn ( error );
      return null;
    } else {
      return card;
    }
  }

  private static checkForError ( card: Card | null ): string | null {
    // Must exist
    if ( !card ) {
      return 'Card not found';
    }
    // Must be on Incomm or SEJ platform
    else if ( card.platform !== PlatformType.INCOMM &&  card.platform !== PlatformType.SEJ ) {
      return 'Only cards on the Incomm and SEJ platform are supported';
    }
    // Must not already be active
    else {
      const status = card.getStatusByPlatform ( card.platform );
      if ( status && status.name === IncommStatusType.ACTIVE ) {
        return 'Card is already active';
      }
    }
  }

  private static getIdentifierValidators ( identifierType: IdentifierType ): ValidatorFn[] {
    const range = ActivateFastcardFormPageComponent.getIdentifierRange ( identifierType );
    return [ Validators.minLength ( range.min ), Validators.maxLength ( range.max ) ];
  }
}
