import { Component } from '@angular/core';
import { AdjustGreencardBalanceWizard } from '../adjust-greencard-balance-wizard';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { AdjustGreencardBalanceRequest } from '../../greencard-action-service/greencard-action-request-models';
import { GreencardActionService } from '../../greencard-action-service/greencard-action.service';
import { catchError, map } from 'rxjs/operators';
import { TransactionType } from '../../../../transaction/transaction-type.enum';
import { BalanceAdjustmentService } from 'src/app/core/balance-adjustment/balance-adjustment.service';
import { ReasonCode } from '../../../product-action-reason-code';
import { CsCoreCurrency, CsCoreCurrencyUtil } from '@cscore/gringotts';

@Component ( {
  selector: 'cca-adjust-greencard-balance-confirmation-page',
  templateUrl: './adjust-greencard-balance-confirmation-page.component.html',
  styleUrls: [ './adjust-greencard-balance-confirmation-page.component.scss' ],
} )
export class AdjustGreencardBalanceConfirmationPageComponent extends WizardPage<AdjustGreencardBalanceWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  closeButtonText: string = 'Cancel';
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  nextButtonText: string  = 'Submit';

  amount: string;
  comment: string;
  serialNumber: string;
  reason: string;
  resultingBalance: string;

  constructor ( private greencardActionService: GreencardActionService ) {
    super ();
  }

  onLoad (): Observable<any> {
    this.amount           = this.getAmountAsCurrency ().displayValue;
    this.comment          = this.wizard.model.comment;
    this.serialNumber     = this.wizard.model.card.identifiers.serialNumber;
    this.reason           = this.getReason ().reasonDescription;
    this.resultingBalance = this.computeResultingBalance ().displayValue;
    return of ( null );
  }

  onNext (): Observable<string> {
    return this.greencardActionService
      .adjustBalance ( this.buildRequest () )
      .pipe (
        map ( () => {
          this.wizard.pages.get ( 'success-page' ).instance.isIgnored = false;
          this.wizard.pages.get ( 'failure-page' ).instance.isIgnored = true;
          return 'success-page';
        } ),
        catchError ( () => {
          this.wizard.pages.get ( 'success-page' ).instance.isIgnored = true;
          this.wizard.pages.get ( 'failure-page' ).instance.isIgnored = false;
          return of ( 'failure-page' );
        } )
      )
  }

  private computeResultingBalance (): CsCoreCurrency | null {
    return BalanceAdjustmentService.computeResultingBalance (
      this.getAvailableBalance (),
      this.wizard.model.amount,
      this.getReason ().reasonAdjustment as TransactionType
    );
  }

  private getAmountAsCurrency (): CsCoreCurrency | null {
    const value            = this.wizard.model.amount;
    const availableBalance = this.getAvailableBalance ();
    return value && availableBalance && CsCoreCurrencyUtil.buildWithDescriptor ( value, availableBalance.descriptor );
  }

  private getAvailableBalance (): CsCoreCurrency {
    return this.wizard.model.card.amounts.availableBalance;
  }

  private getReason (): ReasonCode {
    return this.wizard.model.reason;
  }

  buildRequest (): AdjustGreencardBalanceRequest {
    const serialNumber = this.wizard.model.card.identifiers.serialNumber;
    const reason       = this.wizard.model.reason.reasonCode;
    const amount       = this.wizard.model.amount.toString ();
    const comment      = this.wizard.model.comment;

    return new AdjustGreencardBalanceRequest ( {
      serialNumber,
      reason,
      amount,
      comment,
    } );
  }
}
