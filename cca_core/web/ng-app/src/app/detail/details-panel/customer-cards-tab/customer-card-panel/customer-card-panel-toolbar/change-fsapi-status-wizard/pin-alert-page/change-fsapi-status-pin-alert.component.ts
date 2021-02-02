import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../../core/wizard/wizard-page";
import { ChangeFsapiStatusPageType, ChangeFsapiStatusWizard } from "../change-fsapi-status-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { CustomerService } from "../../../../../../../core/customer/customer.service";
import { Card } from "../../../../../../../core/card/card";
import * as _ from "lodash";
import { ToastFactory } from "../../../../../../../toast/toast-factory.service";
import { flatMap, map } from "rxjs/operators";
import { CardService } from "../../../../../../../core/card/card.service";
import { Customer } from "../../../../../../../core/customer/customer";
import { prettyPrintCardNumber } from "../../../../../../../core/utils/string-utils";

@Component ( {
  selector: 'cca-change-fsapi-status-pin-alert',
  templateUrl: './change-fsapi-status-pin-alert.component.html',
  styleUrls: [ './change-fsapi-status-pin-alert.component.scss' ]
} )
export class ChangeFsapiStatusPinAlertComponent extends WizardPage<ChangeFsapiStatusWizard> implements OnInit {
  key: string           = ChangeFsapiStatusPageType.PIN_ALERT_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private cardService: CardService,
                private customerService: CustomerService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable     = true;
    this.isBackable      = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {

  }

  onNext (): Observable<any> {
    return this.customerService.findOneById ( this.wizard.model.customerId, this.wizard.model.platform, this.wizard.model.partner )
      .pipe (
        flatMap ( ( customer: Customer ) => {
          let myCard = this.findCard ( customer.cards, this.wizard.model.panLastFour )
          if ( myCard.alerts.isPinSet ) {
            return of ( ChangeFsapiStatusPageType.CONFIRM_PAGE );
          } else {
            this.warnToast ( 'This card must have a PIN set before it can be activated.' )
            return of ( this.key );
          }
        } )
      );
  }

  onLoad (): Observable<any> {
    if ( !this.wizard.model.cardNumber ) {
      return this.cardService.decryptFsapiPan ( this.wizard.model.customerId, this.wizard.model.maskedPan )
        .pipe ( map ( ( formattedPan: string ) => {
          this.wizard.model.cardNumber = prettyPrintCardNumber ( formattedPan );
        } ) );
    } else {
      return of ( null );
    }
  }

  private findCard ( cards: Card[], myPanLastFour ): Card {
    return _.find ( cards, function ( o ) {
      return o.identifiers.panLastFour == myPanLastFour;
    } );
  }

  private warnToast ( message: string ) {
    this.toast.warn ( message );
  }
}
