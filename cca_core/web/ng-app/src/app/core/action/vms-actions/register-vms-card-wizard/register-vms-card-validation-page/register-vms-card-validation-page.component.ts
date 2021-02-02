import { Component } from '@angular/core';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { RegisterVmsCardPage, RegisterVmsCardWizard } from '../register-vms-card-wizard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/core/card/card';
import { SpinnerSize } from 'src/app/core/spinner/spinner-size.enum';
import { Customer } from 'src/app/core/customer/customer';
import { ToastFactory } from 'src/app/toast/toast-factory.service';
import { Logger } from 'src/app/logging/logger.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { prettyPrintCardNumber } from '../../../../utils/string-utils';
import { CardService } from 'src/app/core/card/card.service';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { CustomerService } from 'src/app/core/customer/customer.service';

@Component ( {
  selector: 'cca-register-vms-card-validation-page',
  templateUrl: './register-vms-card-validation-page.component.html',
  styleUrls: [ './register-vms-card-validation-page.component.scss' ],
} )
export class RegisterVmsCardValidationPageComponent extends WizardFormPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.VALIDATION;

  readonly SpinnerSize = SpinnerSize;

  validating: boolean           = false;
  ignoreShippingStatus: boolean = false;

  constructor (
    private cardService: CardService,
    private customerService: CustomerService,
    private toaster: ToastFactory,
    private logger: Logger,
  ) {
    super ();
    this.width = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    super.ngOnInit ();
    this.ignoreShippingStatus = !!this.wizard.model.card;
  }

  onLoad (): Observable<any> {
    const customerId = this.wizard.model.customer.id;
    const maskedPan  = this.wizard.model.card.identifiers.panMasked;
    return this.cardService.decryptFsapiPan ( customerId, maskedPan )
      .pipe (
        map ( formattedPan => this.wizard.model.cardNumber = prettyPrintCardNumber ( formattedPan ) ),
        catchError ( () => of ( null ) )
      );
  }

  onNext (): Observable<string> {
    return of ( RegisterVmsCardPage.ENROLLMENT_TYPE );
  }
  get card (): Card {
    return this.wizard.model.card;
  }

  validate () {
    this.validating = true;
    const customer  = this.wizard.model.customer;
    const platform  = this.wizard.model.platform;
    const partner   = this.wizard.model.partner;
    this.addSubscription (
      this.customerService.findOneById ( customer.id, platform, partner ).subscribe ( ( customer: Customer ) => {
        this.validating = false;
        if ( customer ) {
          const card = customer.cards.find ( card => card.identifiers.cardId === this.wizard.model.card.identifiers.cardId );

          if ( !card ) {
            this.logger.error ( 'No matching card found on refresh!' );
            this.toaster.error ( 'Count not validate card. Please try again or contact customer support.' )
          } else if ( card.alerts && card.alerts.isPinSet ) {
            this.card.alerts.isPinSet = card.alerts.isPinSet;
            const isPinSetControl     = this.wizardForm.get ( 'isPinSet' );
            isPinSetControl.setValue ( this.card.alerts.isPinSet );
            isPinSetControl.updateValueAndValidity ();
          }
        }
      } )
    );
  }

  protected initForm (): FormGroup {
    return new FormGroup ( {
      isPinSet: new FormControl ( this.card && this.card.alerts.isPinSet, Validators.requiredTrue )
    } );
  }
}
