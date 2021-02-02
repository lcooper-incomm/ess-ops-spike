import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { RaiseCasePageType, RaiseCaseWizard } from "../raise-case-wizard";
import { FormGroup } from "@angular/forms";
import { SessionFormBuilder } from "../../../session-form-builder.service";
import { Observable, of } from "rxjs";
import { GenericOption } from "../../../../../model/generic-option";
import { ReceiptComponent } from "../../../../model/receipt-component";
import { CsCoreCurrencyCode, CsCoreCurrencyUtil } from "@cscore/gringotts";
import { DateService } from "../../../../../date/date.service";
import { WizardWidth } from "../../../../../wizard/wizard-width.enum";

const paymentMethodOptions: GenericOption<string>[] = [
  { value: 'VISA', displayValue: 'VISA' },
  { value: 'MASTERCARD', displayValue: 'MasterCard' },
  { value: 'DISCOVER', displayValue: 'Discover' },
  { value: 'AMERICAN_EXPRESS', displayValue: 'American Express' },
  { value: 'CASH', displayValue: 'Cash' },
  { value: 'DEBIT', displayValue: 'Debit' },
  { value: 'MONEY_ORDER', displayValue: 'Money Order' },
];

@Component ( {
  selector: 'cca-raise-case-receipt-information-page',
  templateUrl: './raise-case-receipt-information-page.component.html',
  styleUrls: [ './raise-case-receipt-information-page.component.scss' ]
} )
export class RaiseCaseReceiptInformationPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  key: string                           = RaiseCasePageType.RECEIPT_INFORMATION;
  paymentMethodOptions: GenericOption<string>[] = paymentMethodOptions;
  wizardForm: FormGroup                 = new FormGroup ( {} );

  constructor ( private dateService: DateService,
                private sessionFormBuilder: SessionFormBuilder ) {
    super ();
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    let rawValue               = this.wizardForm.getRawValue ();
    rawValue.totalAmount       = rawValue.totalAmount ? CsCoreCurrencyUtil.buildWithCode ( Number ( rawValue.totalAmount ), CsCoreCurrencyCode.USD ) : null;
    rawValue.transactionAmount = rawValue.transactionAmount ? CsCoreCurrencyUtil.buildWithCode ( Number ( rawValue.transactionAmount ), CsCoreCurrencyCode.USD ) : null;
    rawValue.transactionDate   = rawValue.transactionDate ? this.dateService.buildCsCoreTimestampFromDateString ( rawValue.transactionDate ) : null;

    this.wizard.model.receiptComponent = new ReceiptComponent ( rawValue );
    return of ( RaiseCasePageType.CONFIRMATION );
  }

  private initForm (): void {
    this.wizardForm = this.sessionFormBuilder.buildReceiptComponentForm ( new ReceiptComponent () );
  }

}
