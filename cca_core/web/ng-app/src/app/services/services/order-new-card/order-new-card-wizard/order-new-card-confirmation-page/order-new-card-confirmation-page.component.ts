import { Component } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { OrderNewCardWizard } from "../order-new-card-wizard";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CardService } from "../../../../../core/card/card.service";
import { RegisterVmsCardPage } from "../../../../../core/action/vms-actions/register-vms-card-wizard/register-vms-card-wizard";
import { OrderNewCardBuilderService } from "../../order-new-card-builder-service";
import { CsCoreAddress } from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-order-new-card-confirmation-page',
  templateUrl: './order-new-card-confirmation-page.component.html',
  styleUrls: [ './order-new-card-confirmation-page.component.scss' ]
} )
export class OrderNewCardConfirmationPageComponent extends WizardPage<OrderNewCardWizard> {
  homePhone: string;
  key: string           = 'confirmation-page';
  mobilePhone: string;
  mailingAddress: CsCoreAddress;
  physicalAddress: CsCoreAddress;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private cardBuilderService: OrderNewCardBuilderService,
                private cardService: CardService ) {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.width           = WizardWidth.LARGE;
  }

  onLoad (): Observable<any> {
    this.getDisplayValues ();
    return of ( null )
  }

  getDisplayValues () {
    this.homePhone       = this.cardBuilderService.getHomePhone ( this.wizard.model.request.accountHolder.phoneNumbers ).number
    this.mobilePhone     = this.cardBuilderService.getMobilePhone ( this.wizard.model.request.accountHolder.phoneNumbers ).number
    this.mailingAddress  = this.cardBuilderService.getMailingAddress ( this.wizard.model.request.accountHolder.addresses )
    this.physicalAddress = this.cardBuilderService.getPhysicalAddress ( this.wizard.model.request.accountHolder.addresses )
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.sendRequest ()
      .pipe (
        catchError ( () => {
          this.wizard.model.success = false;
          return 'results-page';
        } ),
      )
  }

  private sendRequest (): Observable<string> {
    return this.cardService
      .orderNewCard ( this.wizard.model.request, 'INCOMM' )
      .pipe (
        map ( result => {
          if ( result.productRegistrationResponseData && result.productRegistrationResponseData.challengeInfo ) {
            this.wizard.model.challengeInfo                                            = result.productRegistrationResponseData.challengeInfo;
            this.wizard.pages.get ( RegisterVmsCardPage.CHALLENGE ).instance.isIgnored = false;
            return 'challenge-page';
          } else {
            return 'result-page';
          }
        } ),
      );
  }
}




