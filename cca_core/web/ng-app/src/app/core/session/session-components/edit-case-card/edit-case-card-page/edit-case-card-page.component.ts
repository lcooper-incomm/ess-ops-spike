import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CsCoreCurrency } from '@cscore/gringotts';
import { forkJoin, Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppState } from 'src/app/app-state';
import { Card } from 'src/app/core/card/card';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CsCoreStatus, CsCoreStatusType } from 'src/app/core/model/cs-core-status';
import { Customer } from 'src/app/core/customer/customer';
import { GenericOption } from 'src/app/core/model/generic-option';
import { isFsapiPlatform, PlatformType } from 'src/app/core/platform/platform-type.enum';
import { UpdateCardsComponentAction } from 'src/app/core/session/action/session-actions';
import { WizardFormPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-form-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { CardsComponent } from '../../../model/cards-component';
import { CardsComponentCard } from '../../../model/cards-component-card';
import { CardsComponentCardType } from '../../../model/cards-component-card-type.enum';
import {
  CardsComponentService,
  UpdateCardRequest
} from '../../../session-panel/case-session-panel/cards-session-component-form/cards-component.service';
import { EditCaseCardWizard } from '../edit-case-card-wizard';

@Component ( {
  selector: 'cca-edit-case-card-page',
  templateUrl: './edit-case-card-page.component.html',
  styleUrls: [ './edit-case-card-page.component.scss' ]
} )
export class EditCaseCardPageComponent extends WizardFormPage<EditCaseCardWizard> {
  key: string = 'page';

  readonly CardType = CardsComponentCardType;

  cardTypeOptions: GenericOption<CardsComponentCardType>[] = CardsComponentService.getCardTypeOptions ();

  constructor (
    private cardsComponentService: CardsComponentService,
    private formBuilder: CcaFormBuilder,
    private store: Store<AppState>,
  ) {
    super ();
    this.width            = WizardWidth.LARGE;
    this.isDeletable      = true;
    this.deleteButtonText = 'Remove';
    this.nextButtonText   = 'Save';
  }

  onClose (): Observable<any> {
    this.store.dispatch ( new UpdateCardsComponentAction ( this.wizard.model.session.cardsComponent ) );
    return of ( null );
  }

  onDelete (): Observable<any> {
    return this.cardsComponentService
      .deleteOneCard ( this.cardsComponentCard.id )
      .pipe (
        tap ( () => this.wizard.model.session.cardsComponent.removeCard ( this.cardsComponentCard.id ) )
      );
  }

  onNext (): Observable<string> {
    return this.sendRequest ().pipe ( mapTo ( null ) );
  }

  onExpand ( expanded: boolean ): void {
    this.width = expanded ? WizardWidth.EXTRA_LARGE : WizardWidth.LARGE;
  }

  get balance (): CsCoreCurrency {
    // TODO: same logic as in selection-card-information. Share it
    const selection = this.wizard.model.selection;
    if ( isFsapiPlatform ( this.platform ) ) {
      return selection.getCustomer ().accounts.spending.availableBalance;
    } else if ( this.platform === PlatformType.GREENCARD ) {
      return this.card && this.card.amounts.availableBalance;
    } else {
      return this.card && this.card.amounts.denomination;
    }
  }

  get card (): Card {
    // TODO: same logic as in selection-card-information. Share it
    const selection = this.wizard.model.selection;
    return this.customer ? this.customer.cards.find ( card => card.identifiers.panLastFour === this.cardsComponentCard.lastFour ) :
      selection.getCard ();
  }

  get cardsComponent (): CardsComponent {
    return this.wizard.model.session.cardsComponent;
  }

  get cardsComponentCard (): CardsComponentCard {
    return this.wizard.model.card;
  }

  set cardsComponentCard ( card: CardsComponentCard ) {
    this.wizard.model.card = card;
  }

  get selectedCardType (): CardsComponentCardType {
    return this.getValueFromForm<CardsComponentCardType> ( 'cardType' );
  }

  get customer (): Customer | null {
    const selection = this.wizard.model.selection;
    return isFsapiPlatform ( this.platform ) ? selection.getCustomer () : null;
  }

  get platform (): PlatformType {
    return this.wizard.model.selection.platform;
  }

  get status (): CsCoreStatus {
    return this.card && this.card.getStatusByType ( CsCoreStatusType.PLATFORM );
  }

  protected initForm (): FormGroup {
    return new FormGroup ( {
      cardType: new FormControl ( this.cardsComponentCard.cardType, Validators.required ),
      comment: this.formBuilder.comment ( this.cardsComponentCard.note ),
      incommLoadAmount: new FormControl ( EditCaseCardPageComponent.getValueOrDefault ( this.cardsComponentCard.incommLoadAmount ) ),
      merchantLoadAmount: new FormControl ( EditCaseCardPageComponent.getValueOrDefault ( this.cardsComponentCard.merchantLoadAmount ) ),
      recoveredAmount: new FormControl ( EditCaseCardPageComponent.getValueOrDefault ( this.cardsComponentCard.recoveredAmount ) ),
    } );
  }

  private buildRequest (): UpdateCardRequest {
    const request = {
      ...this.mapToRequest ( this.cardsComponentCard ),
      note: this.getValueFromForm<string> ( 'comment' ),
      // TODO: clear out flags if type changed?
    };

    switch ( request.cardType ) {
      case CardsComponentCardType.ACTIVE:
        return {
          ...request,
          recoveredAmount: this.getValueFromForm<number> ( 'recoveredAmount' ),
        };
      case CardsComponentCardType.INACTIVE:
        return {
          ...request,
          incommLoadAmount: this.getValueFromForm<number> ( 'incommLoadAmount' ),
          merchantLoadAmount: this.getValueFromForm<number> ( 'merchantLoadAmount' ),
        };
      case CardsComponentCardType.REPLACEMENT:
      default:
        return request;
    }
  }

  private getSwapCard (): CardsComponentCard | null {
    if ( this.selectedCardType !== this.cardsComponentCard.cardType ) {
      const cardSet = this.cardsComponent.cardSets.find ( cardSet => cardSet.id === this.cardsComponentCard.cardSet );
      const card    = cardSet && cardSet.getCardByType ( this.selectedCardType );
      return card && _.cloneDeep ( card );
    } else {
      return null;
    }
  }

  private mapToRequest ( card: CardsComponentCard ): UpdateCardRequest {
    return {
      ...card,
      // Build a condensed copy of the cardsComponent to send with the card for validation
      cardsComponent: {
        id: this.wizard.model.session.cardsComponent.id
      },
      // Flatten the amounts to numbers
      incommLoadAmount: card.incommLoadAmount && card.incommLoadAmount.value,
      merchantLoadAmount: card.merchantLoadAmount && card.merchantLoadAmount.value,
      recoveredAmount: card.recoveredAmount && card.recoveredAmount.value,
    };
  }

  private sendRequest (): Observable<CardsComponentCard[]> {
    const swapCard = this.getSwapCard ();

    if ( swapCard ) {
      EditCaseCardPageComponent.swap ( this.cardsComponentCard, swapCard );
    } else {
      this.cardsComponentCard.cardType = this.selectedCardType;
      EditCaseCardPageComponent.clearMonetaryFields ( this.cardsComponentCard );
    }

    const cardRequest = this.buildRequest ();
    const swapCardRequest = swapCard && this.mapToRequest ( swapCard );

    return forkJoin (
      [ cardRequest, swapCardRequest ]
        .filter ( card => !!card )
        .map ( card => this.cardsComponentService.updateOneCard ( card ) )
    ).pipe (
      tap ( ( cards: CardsComponentCard[] ) => {
        cards.forEach ( card => this.wizard.model.session.cardsComponent.addCard ( card ) );
      } )
    )
  }

  private static clearMonetaryFields ( card: CardsComponentCard ): void {
    if ( card.cardType === CardsComponentCardType.ACTIVE || card.cardType === CardsComponentCardType.REPLACEMENT ) {
      card.merchantLoadAmount = null;
      card.incommLoadAmount   = null;
    }
    if ( card.cardType === CardsComponentCardType.INACTIVE || card.cardType === CardsComponentCardType.REPLACEMENT ) {
      card.recoveredAmount = null;
    }
  }

  private static swap ( cardA: CardsComponentCard, cardB: CardsComponentCard ): void {
    const cardType = cardA.cardType;
    cardA.cardType = cardB.cardType;
    cardB.cardType = cardType;
    EditCaseCardPageComponent.clearMonetaryFields ( cardA );
    EditCaseCardPageComponent.clearMonetaryFields ( cardB );
  }

  private static getValueOrDefault ( currency: CsCoreCurrency ): number {
    return currency && currency.value || 0;
  }
}
