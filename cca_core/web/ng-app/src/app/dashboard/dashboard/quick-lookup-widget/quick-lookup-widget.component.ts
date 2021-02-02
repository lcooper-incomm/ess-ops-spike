import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { IdentifierType } from "../../../core/session/model/identifier-type.enum";
import { Permission } from "../../../core/auth/permission";
import { LookupTypeEnum } from "./lookup-type.enum";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { LookupService } from "../../../core/lookup/lookup.service";
import { QuickLookupQuoteWizard } from "../../quick-lookup-quote-wizard/quick-lookup-quote-wizard";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { MaplesPartner } from "@cscore/maples-client-model";
import { MaplesQuote } from "@cscore/maples-client-model";
import { QuoteService } from "../../../core/quote/quote.service";
import { SearchParameterValueType } from "../../../core/search/search-type/search-parameter-value-type.enum";
import { finalize } from "rxjs/operators";

@Component ( {
  selector: 'cca-quick-lookup-widget',
  templateUrl: './quick-lookup-widget.component.html',
  styleUrls: [ './quick-lookup-widget.component.scss' ]
} )
export class QuickLookupWidgetComponent implements OnInit {
  associatedCards: string[] = [];
  currentStatus: CsCoreStatus;
  lookUpForm: FormGroup;
  LookupTypeEnum            = LookupTypeEnum;
  quote: MaplesQuote;
  searchComplete: boolean   = false;
  searchType: LookupTypeEnum;

  @ViewChild ( 'lookupSpinner' )
  lookupSpinner: SpinnerComponent;

  LookupType = {
    CARD_NUMBER: {
      value: LookupTypeEnum.CARD_NUMBER,
      displayValue: 'Card Number'
    },
    CARD_STATUS: {
      value: LookupTypeEnum.CARD_STATUS,
      displayValue: 'Card Status'
    },
    QUOTE_ID: {
      value: LookupTypeEnum.QUOTE_ID,
      displayValue: 'Quote'
    }
  };

  lookUpGroups: any[] = [
    {
      name: 'CARD NUMBER',
      items: [
        {
          platform: PlatformType.GREENCARD,
          lookupType: this.LookupType.CARD_NUMBER,
          identifierType: IdentifierType.SERIALNUMBER,
          displayValue: 'Greencard Serial Number',
          permission: Permission.SEARCH_BY_FINANCIAL_GIFT
        },
        {
          platform: PlatformType.VMS,
          lookupType: this.LookupType.CARD_NUMBER,
          identifierType: IdentifierType.ACCOUNT_NUMBER,
          displayValue: 'VMS Account Number',
          permission: Permission.SEARCH_BY_GPR
        },
        {
          platform: PlatformType.VMS,
          lookupType: this.LookupType.CARD_NUMBER,
          identifierType: IdentifierType.VAN,
          displayValue: 'VMS Card ID',
          permission: Permission.SEARCH_BY_GPR
        },
        {
          platform: PlatformType.GREENCARD,
          lookupType: this.LookupType.CARD_NUMBER,
          identifierType: SearchParameterValueType.CAN,
          displayValue: 'Greencard CAN',
          permission: Permission.SEARCH_BY_FINANCIAL_GIFT
        },
        {
          platform: PlatformType.VMS,
          lookupType: this.LookupType.CARD_NUMBER,
          identifierType: IdentifierType.SERIALNUMBER,
          displayValue: 'VMS Serial Number',
          permission: Permission.SEARCH_BY_GPR
        }
      ]
    },
    {
      name: 'CARD STATUS',
      items: [
        {
          platform: PlatformType.BOOST,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.PIN,
          displayValue: 'Boost PIN',
          permission: Permission.SEARCH_BOOST
        },
        {
          platform: PlatformType.NET10,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.PIN,
          displayValue: 'Net10 PIN',
          permission: Permission.SEARCH_NET10
        },
        {
          platform: PlatformType.VIRGIN,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.PIN,
          displayValue: 'Virgin PIN',
          permission: Permission.SEARCH_VIRGIN
        },
        {
          platform: PlatformType.TRACFONE,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.PIN,
          displayValue: 'TracFone PIN',
          permission: Permission.SEARCH_TRACFONE
        },
        {
          platform: PlatformType.MICROSOFT,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.VAN,
          displayValue: 'Microsoft VAN',
          permission: Permission.SEARCH_MICROSOFT
        },
        {
          platform: PlatformType.MICROSOFT,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.PIN,
          displayValue: 'Microsoft PIN',
          permission: Permission.SEARCH_MICROSOFT
        },
        {
          platform: PlatformType.GOOGLE,
          lookupType: this.LookupType.CARD_STATUS,
          identifierType: IdentifierType.PIN,
          displayValue: 'Google PIN',
          permission: Permission.SEARCH_GOOGLE
        }
      ]
    },
    {
      name: 'QUOTE',
      items: [
        {
          partner: MaplesPartner.AXBOL,
          platform: PlatformType.BOL,
          lookupType: this.LookupType.QUOTE_ID,
          displayValue: 'Amex BOL Quote ID',
          permission: Permission.SEARCH_BY_AMEX_BOL
        },
        {
          partner: null,
          platform: PlatformType.ECOMM,
          lookupType: this.LookupType.QUOTE_ID,
          displayValue: 'E-Comm Quote ID',
          permission: Permission.SEARCH_BY_ECOMM_ORDER
        },
        {
          partner: MaplesPartner.MBOL,
          platform: PlatformType.BOL,
          lookupType: this.LookupType.QUOTE_ID,
          displayValue: 'Mastercard BOL Quote ID',
          permission: Permission.SEARCH_BY_MASTERCARD_BOL
        },
        {
          partner: MaplesPartner.VANILLA,
          platform: PlatformType.BOL,
          lookupType: this.LookupType.QUOTE_ID,
          displayValue: 'Vanilla BOL Quote ID',
          permission: Permission.SEARCH_BY_VANILLA_BOL
        },
        {
          partner: MaplesPartner.WALMART,
          platform: PlatformType.BOL,
          lookupType: this.LookupType.QUOTE_ID,
          displayValue: 'Walmart BOL Quote ID',
          permission: Permission.SEARCH_BY_WALMART_BOL
        }
      ]
    }
  ];

  constructor ( private lookupService: LookupService,
                private quoteService: QuoteService,
                private wizardRunner: WizardRunner ) {
  }

  ngOnInit () {
    this.associatedCards = [];
    this.initForm ();
  }

  public doLookup () {
    this.searchComplete  = false;
    this.quote           = null;
    this.associatedCards = [];
    this.currentStatus   = null;
    this.searchType      = this.lookUpForm.get ( 'lookUpControl' ).value.lookupType.value;
    this.lookupSpinner.start ();

    if ( this.searchType === LookupTypeEnum.CARD_NUMBER ) {
      this.lookupService.cardNumberLookup ( this.lookUpForm.get ( 'lookUpControl' ).value.identifierType, this.lookUpForm.get ( 'identifierControl' ).value, this.lookUpForm.get ( 'lookUpControl' ).value.platform )
        .subscribe ( ( response: string[] ) => {
          this.setCardResult ( response );
        }, err => {
          this.lookupSpinner.stop ();
        } );
    } else if ( this.searchType === LookupTypeEnum.CARD_STATUS ) {
      this.lookupSpinner.start ();
      this.lookupService.cardStatusLookup ( this.lookUpForm.get ( 'lookUpControl' ).value.identifierType, this.lookUpForm.get ( 'identifierControl' ).value, this.lookUpForm.get ( 'lookUpControl' ).value.platform )
        .subscribe ( ( response: CsCoreStatus ) => {
          this.setStatusResult ( response );
        }, err => {
          this.lookupSpinner.stop ();
        } );
    } else if ( this.lookUpForm.get ( 'lookUpControl' ).value.lookupType.value === LookupTypeEnum.QUOTE_ID ) {
      let quoteId  = this.lookUpForm.get ( 'identifierControl' ).value;
      let partner  = this.lookUpForm.get ( 'lookUpControl' ).value.partner;
      let platform = this.lookUpForm.get ( 'lookUpControl' ).value.platform;

      this.quoteService.findOneById ( quoteId, platform, partner )
        .pipe ( finalize ( () => {
          this.searchComplete = true;
          this.lookupSpinner.stop ()
        } ) )
        .subscribe ( ( quote: MaplesQuote ) => {
          this.quote          = quote;

          if ( this.quote ) {
            let wizard         = new QuickLookupQuoteWizard ();
            wizard.model.quote = this.quote;
            this.wizardRunner.run ( wizard );
          }
        } );
    }
  }

  public reset () {
    this.associatedCards = [];
    this.currentStatus   = null;
    this.searchComplete  = false;
    this.lookUpForm.get ( 'identifierControl' ).enable ();
    this.lookUpForm.get ( 'identifierControl' ).setValue ( '' );
  }

  private initForm () {
    this.lookUpForm = new FormGroup ( {
      lookUpControl: new FormControl ( [], [ Validators.required ] ),
      identifierControl: new FormControl ( [], [ Validators.required ] )
    } );
    this.lookUpForm.get ( 'identifierControl' ).disable ();
  }

  private setCardResult ( response ) {
    response             = response.join ( ', ' );
    this.associatedCards = response;
    this.searchComplete  = true;
    this.lookupSpinner.stop ();
  }

  private setStatusResult ( response ) {
    this.currentStatus  = response;
    this.searchComplete = true;
    this.lookupSpinner.stop ();
  }

}
