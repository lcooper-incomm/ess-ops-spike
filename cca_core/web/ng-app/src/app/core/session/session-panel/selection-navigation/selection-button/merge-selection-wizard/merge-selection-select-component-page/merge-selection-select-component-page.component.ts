import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Card} from 'src/app/core/card/card';
import {CardsComponentCard} from 'src/app/core/session/model/cards-component-card';
import {isFsapiPlatform} from 'src/app/core/platform/platform-type.enum';
import {SelectionType} from 'src/app/core/session/model/selection-type.enum';
import {SessionComponentType} from 'src/app/core/session/model/session-component-type.enum';
import {WizardFormPage} from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import {MergeSelectionPageType, MergeSelectionWizard} from '../merge-selection-wizard';

@Component ( {
  selector: 'cca-select-component-page',
  templateUrl: './merge-selection-select-component-page.component.html',
  styleUrls: [ './merge-selection-select-component-page.component.scss' ]
} )
export class MergeSelectionSelectComponentPageComponent extends WizardFormPage<MergeSelectionWizard> implements OnInit {
  key: string             = MergeSelectionPageType.SELECT_COMPONENT;
  isCardMenuOpen: boolean = false;
  SelectionType           = SelectionType;
  SessionComponentType    = SessionComponentType;

  constructor () {
    super ();
  }

  get cardOptions (): Card[] {
    const customer = this.wizard.model.selection.getCustomer ();
    return customer && customer.cards;
  }

  isAlreadyInGrid ( card: Card ): boolean {
    const component = this.wizard.model.session.cardsComponent;
    const selection = this.wizard.model.selection;
    return !!component.cardSets.find ( cardSet => {
      const isFsapi = isFsapiPlatform ( selection.platform );
      const isInSet = ( cardsComponentCard: CardsComponentCard ): boolean => {
        return cardsComponentCard && cardsComponentCard.selectionId === selection.id && (!isFsapi || cardsComponentCard.lastFour === card.identifiers.panLastFour);
      };
      return isInSet ( cardSet.inactiveCard ) || isInSet ( cardSet.activeCard ) || isInSet ( cardSet.replacementCard );
    } );
  }

  ngOnInit () {
    this.wizard.model.selectedCardSetNumber = 0;
    super.ngOnInit ();
  }

  onComponentTypeChange ( componentType: SessionComponentType ): void {
    const cardControl       = this.wizardForm.get ( 'card' );
    const cardInGridControl = this.wizardForm.get ( 'isCardNotInGrid' );
    if ( componentType === SessionComponentType.CARDS ) {
      // Make card selection required
      cardControl.setValidators ( Validators.required );
      cardInGridControl.setValidators ( Validators.requiredTrue );

      if ( this.isCustomerSelection ) {
        // Select the first card if there is only one
        const cards = this.wizard.model.selection.getCustomer ().cards;
        if ( cards.length === 1 ) {
          cardControl.setValue ( cards[ 0 ] );
        }
      } else if ( this.isCardSelection ) {
        cardControl.setValue ( this.wizard.model.selection.getCard () );
      }
    } else {
      cardControl.clearValidators ();
      cardInGridControl.clearValidators ();
    }
    cardControl.updateValueAndValidity ();
    cardInGridControl.updateValueAndValidity ();
  }

  onNext (): Observable<string> {
    this.wizard.model.selectedComponent = this.componentType;
    this.wizard.model.selectedCard      = this.selectedCard;
    return of ( MergeSelectionPageType.POPULATE_COMPONENT );
  }

  get shouldShowCardSelector (): boolean {
    return this.isCustomerSelection && this.componentType === SessionComponentType.CARDS;
  }

  protected initForm (): FormGroup {
    const form = new FormGroup ( {
      card: new FormControl (),
      componentType: new FormControl ( this.wizard.model.selectedComponent, Validators.required ),
      isCardNotInGrid: new FormControl ( null ),
    } );

    this.addSubscription (
      form.get ( 'componentType' ).valueChanges.subscribe ( ( componentType: SessionComponentType ) => this.onComponentTypeChange ( componentType ) )
    );

    this.addSubscription (
      form.get ( 'card' ).valueChanges.subscribe ( ( card: Card ) => {
        this.wizard.model.isCardInGrid = card && this.isAlreadyInGrid ( card );
        form.get ( 'isCardNotInGrid' ).setValue ( !this.wizard.model.isCardInGrid );
      } )
    );

    return form;
  }

  private get componentType (): SessionComponentType {
    return this.getValueFromForm<SessionComponentType> ( 'componentType' );
  }

  private get isCardSelection (): boolean {
    return this.wizard.model.selection.type === SelectionType.CARD;
  }

  private get isCustomerSelection (): boolean {
    return this.wizard.model.selection.type === SelectionType.CUSTOMER;
  }

  private get selectedCard (): Card {
    return this.getValueFromForm<Card> ( 'card' );
  }
}
