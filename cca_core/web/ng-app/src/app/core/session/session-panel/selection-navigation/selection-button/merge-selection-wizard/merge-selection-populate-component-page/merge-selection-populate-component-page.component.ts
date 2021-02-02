import { Component } from '@angular/core';
import { MergeSelectionWizard, MergeSelectionPageType, ComponentUpdate } from '../merge-selection-wizard';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { SessionComponentType } from 'src/app/core/session/model/session-component-type.enum';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { SelectionType } from 'src/app/core/session/model/selection-type.enum';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CustomerComponent } from 'src/app/core/session/model/customer-component';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { CsCoreAddress } from "@cscore/core-client-model";
import { CardsComponentCardSet } from 'src/app/core/session/model/cards-component-card-set';
import { CardsComponentCardType } from 'src/app/core/session/model/cards-component-card-type.enum';
import { CardsComponentCard } from 'src/app/core/session/model/cards-component-card';
import { isFsapiPlatform } from 'src/app/core/platform/platform-type.enum';

@Component ( {
  selector: 'cca-merge-selection-populate-component-page',
  templateUrl: './merge-selection-populate-component-page.component.html',
  styleUrls: [ './merge-selection-populate-component-page.component.scss' ]
} )
export class MergeSelectionPopulateComponentPageComponent extends WizardFormPage<MergeSelectionWizard> {
  key: string                   = MergeSelectionPageType.POPULATE_COMPONENT;
  wizardForm: FormGroup;
  readonly SessionComponentType = SessionComponentType;

  private cardsComponentForm: FormGroup;
  private customerComponentForm: FormGroup;
  private merchantComponentForm: FormGroup;

  constructor ( private formBuilder: CcaFormBuilder ) {
    super ();
    this.isBackable = true;
    this.width      = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initCardsComponentForm ();
    this.initCustomerComponentForm ();
    this.initMerchantsComponentForm ();
  }

  onLoad (): Observable<any> {
    this.width      = this.wizard.model.selectedComponent === SessionComponentType.CARDS ? WizardWidth.LARGE : WizardWidth.MEDIUM;
    this.wizardForm = this.initForm ();
    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.component = this.getModifiedComponent ();
    return of ( MergeSelectionPageType.CONFIRMATION );
  }

  protected initForm (): FormGroup {
    switch ( this.wizard.model.selectedComponent ) {
      case SessionComponentType.CARDS:
        return this.cardsComponentForm;
      case SessionComponentType.CUSTOMER:
        return this.customerComponentForm;
      case SessionComponentType.MERCHANT:
        return this.merchantComponentForm;
      default:
        return new FormGroup ( {} );
    }
  }

  private getModifiedComponent (): ComponentUpdate {
    switch ( this.wizard.model.selectedComponent ) {
      case SessionComponentType.CARDS:
        // We're creating a new disputed card record in this case
        // If VMS, we also need the last four of the selected card
        const isFsapi = isFsapiPlatform ( this.wizard.model.selection.platform );
        return new CardsComponentCard ( {
          selectionId: this.wizard.model.selection.id,
          lastFour: isFsapi ? this.wizard.model.selectedCard.identifiers.panLastFour : null,
          cardSet: this.getValueFromForm<CardsComponentCardSet> ( 'cardSet' ).id,
          cardType: this.getValueFromForm<CardsComponentCardType> ( 'cardType' ),
        } );
      case SessionComponentType.CUSTOMER:
        const customerComponent = {
          ...this.wizard.model.session.customerComponent,
          firstName: this.getValueFromForm<string> ( 'firstName' ),
          lastName: this.getValueFromForm<string> ( 'lastName' ),
        };
        if ( this.isCustomerSelection ) {
          customerComponent.address      = this.getValueFromForm<CsCoreAddress> ( 'address' );
          customerComponent.dateOfBirth  = this.getValueFromForm<string> ( 'dateOfBirth' );
          customerComponent.emailAddress = this.getValueFromForm<string> ( 'email' );
          customerComponent.phoneNumber  = this.getValueFromForm<string> ( 'phone' );
        }
        return customerComponent as CustomerComponent;
      case SessionComponentType.MERCHANT:
        const merchantComponent = this.wizard.model.session.merchantComponent;
        return {
          ...merchantComponent,
          // Format CsCoreTimestamp fields properly
          deactivatedDate: merchantComponent.deactivatedDate && merchantComponent.deactivatedDate.value,
          firstRedemptionAttemptedDate: merchantComponent.firstRedemptionAttemptedDate && merchantComponent.firstRedemptionAttemptedDate.value,
          lastReloadedDate: merchantComponent.lastReloadedDate && merchantComponent.lastReloadedDate.value,
          purchasedDate: merchantComponent.purchasedDate && merchantComponent.purchasedDate.value,
          address: this.getValueFromForm<CsCoreAddress> ( 'address' ),
          contactName: this.getValueFromForm<string> ( 'contactName' ),
          contactPhone: this.getValueFromForm<string> ( 'contactPhone' ),
          locationName: this.getValueFromForm<string> ( 'locationName' ),
          merchantName: this.getValueFromForm<string> ( 'merchantName' ),
        };
    }
  }

  private initCardsComponentForm (): void {
    if ( this.wizard.model.session.cardsComponent ) {
      this.cardsComponentForm = new FormGroup ( {
        cardSet: new FormControl ( null, Validators.required ),
        cardType: new FormControl ( null, Validators.required ),
      } );
    }
  }

  private initCustomerComponentForm (): void {
    if ( this.wizard.model.session.customerComponent ) {
      const customerComponent = this.wizard.model.session.customerComponent;
      const form              = new FormGroup ( {
        firstName: new FormControl ( customerComponent.firstName, Validators.required ),
        lastName: new FormControl ( customerComponent.lastName, Validators.required ),
      } );
      if ( this.isCustomerSelection ) {
        form.addControl ( 'address', this.formBuilder.address ( customerComponent.address ) );
        form.addControl ( 'dateOfBirth', this.formBuilder.date ( customerComponent.dateOfBirth ) );
        form.addControl ( 'email', this.formBuilder.emailAddress ( customerComponent.emailAddress ) );
        form.addControl ( 'phone', this.formBuilder.phoneNumber ( customerComponent.phoneNumber ) );
      }
      this.customerComponentForm = form;
    }
  }

  private initMerchantsComponentForm (): void {
    if ( this.wizard.model.session.merchantComponent ) {
      const merchantComponent    = this.wizard.model.session.merchantComponent;
      this.merchantComponentForm = new FormGroup ( {
        address: this.formBuilder.address ( merchantComponent.address ),
        contactName: new FormControl ( merchantComponent.contactName ),
        contactPhone: new FormControl ( merchantComponent.contactPhone ),
        locationName: new FormControl ( merchantComponent.locationName ),
        merchantName: new FormControl ( merchantComponent.merchantName ),
      } );
    }
  }

  private get isCustomerSelection (): boolean {
    return this.wizard.model.selection.type === SelectionType.CUSTOMER;
  }
}
