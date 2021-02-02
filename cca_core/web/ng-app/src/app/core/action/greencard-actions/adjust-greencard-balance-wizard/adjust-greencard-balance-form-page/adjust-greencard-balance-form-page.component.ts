import { Component, ChangeDetectionStrategy } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { AdjustGreencardBalanceWizard } from '../adjust-greencard-balance-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericOption } from 'src/app/core/model/generic-option';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { tap, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TransactionType } from '../../../../transaction/transaction-type.enum';
import { ProductActionReasonCodeService } from '../../../product-action-reason-code.service';
import { ProductActionReasonCodeType } from '../../../product-action-reason-code-type.enum';
import { ReasonCode } from '../../../product-action-reason-code';

@Component ( {
  selector: 'cca-adjust-greencard-balance-form-page',
  templateUrl: './adjust-greencard-balance-form-page.component.html',
  styleUrls: [ './adjust-greencard-balance-form-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class AdjustGreencardBalanceFormPageComponent extends WizardPage<AdjustGreencardBalanceWizard> {
  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  closeButtonText: string = 'Cancel';
  isCloseable: boolean    = true;
  isNextable: boolean     = true;

  adjustmentTypes: GenericOption<TransactionType>[] = [
    {
      displayValue: 'Credit',
      value: TransactionType.CREDIT,
    },
    {
      displayValue: 'Debit',
      value: TransactionType.DEBIT,
    }
  ];

  reasons: GenericOption<ReasonCode>[] = [];

  private allReasons: ReasonCode[] = [];
  private reasons$: Observable<any>;

  constructor ( private formBuilder: FormBuilder, private actionReasonService: ProductActionReasonCodeService ) {
    super ();
    this.reasons$ = this.loadReasons ().pipe ( shareReplay () );
    this.initForm ();
  }

  onLoad (): Observable<any> {
    return this.reasons$;
  }

  onNext (): Observable<string> {
    this.wizard.model.amount  = this.getAmount ();
    this.wizard.model.comment = this.getComment ();
    this.wizard.model.reason  = this.getReason ();
    return of ( 'confirmation-page' );
  }

  private getAmount (): number {
    return parseFloat ( this.getValueFromForm<string> ( 'amount' ) );
  }

  private getComment (): string {
    return this.getValueFromForm<string> ( 'comment' );
  }

  private getReason (): ReasonCode {
    return this.getValueFromForm<GenericOption<ReasonCode>> ( 'reason' ).value;
  }

  private getReasonsByAdjustmentType ( adjustmentType: TransactionType ): GenericOption<ReasonCode>[] {
    return this.allReasons
      .filter ( reason => reason.reasonAdjustment === adjustmentType )
      .map ( AdjustGreencardBalanceFormPageComponent.mapReason )
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'amount': [ null, [ Validators.required, Validators.min ( 0.01 ) ] ],
      'adjustmentType': [ null ],
      'reason': [ { value: null, disabled: true } ],
      'comment': [ null ],
    } );

    this.onFormFieldChange ( 'adjustmentType', ( adjustmentType: GenericOption<TransactionType> ) => {
      this.reasons = this.getReasonsByAdjustmentType ( adjustmentType.value );
      this.wizardForm.get ( 'reason' ).setValue ( null );
      this.wizardForm.get ( 'reason' ).enable ();
    } );
  }

  private loadReasons (): Observable<ReasonCode[]> {
    return this.actionReasonService
      .findAllByPlatformAndType ( PlatformType.GREENCARD, ProductActionReasonCodeType.ADJUST_BALANCE )
      .pipe (
        tap ( reasons => this.allReasons = reasons ),
      );
  }

  private static mapReason ( reason: ReasonCode ): GenericOption<ReasonCode> {
    return {
      displayValue: reason.reasonDescription,
      value: reason,
    };
  }
}
