import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { QuickLookupQuoteWizard } from "../quick-lookup-quote-wizard";
import { WizardWidth } from "../../../core/wizard/wizard-width.enum";
import { MaplesQuote } from "@cscore/maples-client-model";
import { CsCoreCurrencyCode, CsCoreCurrencyUtil } from "@cscore/gringotts";
import { CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { QuoteService } from "../../../core/quote/quote.service";

@Component ( {
  selector: 'cca-quick-lookup-quote',
  templateUrl: './quick-lookup-quote.component.html',
  styleUrls: [ './quick-lookup-quote.component.scss' ]
} )
export class QuickLookupQuoteComponent extends WizardPage<QuickLookupQuoteWizard> implements OnInit {
  billingAddress: CsCoreAddress;
  key: string           = 'form-page';
  quote: MaplesQuote;
  mobilePhone: CsCorePhoneNumber;
  shippingAddress: CsCoreAddress;
  transactionTotal: string;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private quoteService: QuoteService ) {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.LARGE;
  }

  ngOnInit () {
    this.quote = this.wizard.model.quote;
    this.calculateTransactionTotal ();
    this.findAddress ();
    this.findMobilePhone ();
  }

  private calculateTransactionTotal () {
    let total = CsCoreCurrencyUtil.buildWithCode ( 0, CsCoreCurrencyCode.USD );

    if ( this.quote.items && this.quote.items.length ) {
      let cardTotal = this.quote.items[ 0 ].initialValue ? CsCoreCurrencyUtil.multiply ( this.quote.items[ 0 ].initialValue, this.quote.getTotalCardQuantity () ) : CsCoreCurrencyUtil.buildWithCode ( 0, CsCoreCurrencyCode.USD );
      let feeTotal  = this.quote.items[ 0 ].totals.purchaseFees ? CsCoreCurrencyUtil.multiply ( this.quote.items[ 0 ].totals.purchaseFees, this.quote.getTotalCardQuantity () ) : CsCoreCurrencyUtil.buildWithCode ( 0, CsCoreCurrencyCode.USD );
      total         = CsCoreCurrencyUtil.add ( cardTotal, feeTotal );
    }

    this.transactionTotal = total.displayValue;
  }

  private findAddress () {
    if ( this.quote.customer ) {
      this.billingAddress  = this.quote.customer.getAddressByType ( CsCoreAddressType.BILLING );
      this.shippingAddress = this.quote.customer.getAddressByType ( CsCoreAddressType.SHIPPING )
    }
  }

  private findMobilePhone () {
    if ( this.quote.customer ) {
      this.mobilePhone = this.quote.customer.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE )
    }
  }

}
