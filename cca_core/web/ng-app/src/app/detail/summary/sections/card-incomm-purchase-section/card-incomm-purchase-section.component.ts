import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-incomm-purchase-section',
  templateUrl: './card-incomm-purchase-section.component.html',
  styleUrls: [ './card-incomm-purchase-section.component.scss' ]
} )
export class CardIncommPurchaseSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
