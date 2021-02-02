import { Component, OnInit, Input } from '@angular/core';
import { GenericOption } from 'src/app/core/model/generic-option';
import { CardsComponentCardSet } from 'src/app/core/session/model/cards-component-card-set';
import { CardsComponentService } from 'src/app/core/session/session-panel/case-session-panel/cards-session-component-form/cards-component.service';
import { CardsComponentCardType } from 'src/app/core/session/model/cards-component-card-type.enum';
import { FormGroup } from '@angular/forms';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';

@Component ( {
  selector: 'cca-assign-card-set-form',
  templateUrl: './assign-card-set-form.component.html',
  styleUrls: [ './assign-card-set-form.component.scss' ]
} )
export class AssignCardSetFormComponent extends CcaBaseComponent implements OnInit {
  @Input () cardSets: CardsComponentCardSet[];
  @Input () form: FormGroup;

  cardSetOptions: GenericOption<CardsComponentCardSet>[]   = [];
  cardTypeOptions: GenericOption<CardsComponentCardType>[] = [];

  ngOnInit (): void {
    this.initCardSetOptions ();
    const cardTypeControl = this.form.get ( 'cardType' );
    cardTypeControl && cardTypeControl.disable ();
    this.addSubscription (
      this.form.get ( 'cardSet' ).valueChanges.subscribe ( ( cardSet: CardsComponentCardSet ) => {
        this.initCardTypeOptions ( cardSet );
        cardTypeControl && cardTypeControl.enable ();
      } )
    );
  }

  private initCardSetOptions (): void {
    this.cardSetOptions = this.cardSets.map ( cardSet => {
      return {
        value: cardSet,
        displayValue: cardSet.id.toString (),
      };
    } );

    const nextId = Math.max ( ...this.cardSets.map ( cardSet => cardSet.id ), 0 ) + 1;
    this.cardSetOptions.push ( {
      value: new CardsComponentCardSet ( {
        id: nextId
      } ),
      displayValue: 'New Set',
    } );
  }

  private initCardTypeOptions ( selectedCardSet: CardsComponentCardSet ) {
    const cardSet = this.cardSets.find ( cardSet => cardSet.id === selectedCardSet.id );
    if ( cardSet ) {
      this.cardTypeOptions = [];
      //If we found an existing cardSet, only add options for slots that aren't yet filled
      if ( !cardSet.activeCard ) {
        this.cardTypeOptions.push ( CardsComponentService.getCardTypeOption ( CardsComponentCardType.ACTIVE ) );
      }
      if ( !selectedCardSet.inactiveCard ) {
        this.cardTypeOptions.push ( CardsComponentService.getCardTypeOption ( CardsComponentCardType.INACTIVE ) );
      }
      if ( !cardSet.replacementCard ) {
        this.cardTypeOptions.push ( CardsComponentService.getCardTypeOption ( CardsComponentCardType.REPLACEMENT ) );
      }
    } else {
      //If we didn't find an existing cardSet, we're adding a new one, and we only need to add the Active and Inactive options
      this.cardTypeOptions = [
        CardsComponentService.getCardTypeOption ( CardsComponentCardType.ACTIVE ),
        CardsComponentService.getCardTypeOption ( CardsComponentCardType.INACTIVE ),
      ];
    }
  }
}
