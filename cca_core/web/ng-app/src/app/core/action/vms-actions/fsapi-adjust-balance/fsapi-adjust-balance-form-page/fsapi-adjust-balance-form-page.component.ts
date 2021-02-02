import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from 'src/app/core/customer/customer';
import { GenericOption } from 'src/app/core/model/generic-option';
import { TransactionType } from 'src/app/core/transaction/transaction-type.enum';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { FsapiAdjustBalanceWizard } from '../fsapi-adjust-balance-wizard';
import { ProductActionReasonCodeService } from '../../../product-action-reason-code.service';
import { ProductActionReasonCodeType } from '../../../product-action-reason-code-type.enum';
import { ReasonCode } from '../../../product-action-reason-code';
import * as _ from "lodash";

@Component ( {
  selector: 'cca-fsapi-adjust-balance-form-page',
  templateUrl: './fsapi-adjust-balance-form-page.component.html',
  styleUrls: [ './fsapi-adjust-balance-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class FsapiAdjustBalanceFormPageComponent extends WizardPage<FsapiAdjustBalanceWizard> {
  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  adjustmentTypes: GenericOption<TransactionType>[] = [
    {
      displayValue: 'Credit (+)',
      value: TransactionType.CREDIT,
    },
    {
      displayValue: 'Debit (-)',
      value: TransactionType.DEBIT,
    },
  ];

  reasons: GenericOption<ReasonCode>[] = [];

  private allReasons: ReasonCode[] = [];

  constructor ( private actionReasonService: ProductActionReasonCodeService, private formBuilder: FormBuilder ) {
    super ();
  }

  onLoad (): Observable<any> {
    return this.loadReasons ();
  }

  onNext (): Observable<string> {
    this.wizard.model.adjustmentType = this.getAdjustmentType ();
    this.wizard.model.amount         = this.getAmount ();
    this.wizard.model.comment        = this.getComment ();
    this.wizard.model.reason         = this.getReason ();
    return of ( 'confirmation-page' );
  }

  ngOnInit(): void {
    this.initForm ();
  }

  get accountNumber (): string | null {
    return this.customer && this.customer.accounts.spending.accountNumber;
  }

  get availableBalance (): string | null {
    return this.customer && this.customer.accounts.spending.availableBalance.displayValue;
  }

  get customer (): Customer | null {
    return this.wizard.model.selection.getCustomer ();
  }

  private getAdjustmentType (): TransactionType | null {
    return this.getValueFromForm<TransactionType> ( 'adjustmentType' );
  }

  private getAmount (): number {
    return parseFloat ( this.getValueFromForm<string> ( 'amount' ) );
  }

  private getComment (): string {
    return this.getValueFromForm<string> ( 'comment' );
  }

  private getReason (): ReasonCode {
    return this.getValueFromForm<ReasonCode> ( 'reason' );
  }

  private getReasonsByAdjustmentType ( adjustmentType: TransactionType ): GenericOption<ReasonCode>[] {
    return this.allReasons
      .filter ( reason => reason.reasonAdjustment === adjustmentType )
      .map ( FsapiAdjustBalanceFormPageComponent.mapReason )
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'adjustmentType': [ null, Validators.required ],
      'amount': [ null, [ Validators.required, Validators.min ( 0.01 ) ] ],
      'comment': [ null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ],
      'reason': [ { value: null, disabled: true }, Validators.required ],
    } );

    this.onFormFieldChange ( 'adjustmentType', ( adjustmentType: TransactionType ) => {
      this.reasons = this.getReasonsByAdjustmentType ( adjustmentType );
      this.wizardForm.get ( 'reason' ).setValue ( null );
      this.wizardForm.get ( 'reason' ).enable ();
    } );
  }

  private loadReasons (): Observable<ReasonCode[]> {
    return this.actionReasonService
      .findAllByPlatformAndType ( this.wizard.model.selection.platform, ProductActionReasonCodeType.ADJUST_BALANCE )
      .pipe (
        tap ( ( reasons: ReasonCode[] ) => {
          this.allReasons = _.sortBy ( reasons, 'reasonDescription' );
        } ),
      );
  }

  private static mapReason ( reason: ReasonCode ): GenericOption<ReasonCode> {
    return {
      displayValue: reason.reasonDescription,
      value: reason,
    };
  }
}
