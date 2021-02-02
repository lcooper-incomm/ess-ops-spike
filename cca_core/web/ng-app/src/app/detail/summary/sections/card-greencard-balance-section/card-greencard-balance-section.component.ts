import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-greencard-balance-section',
  templateUrl: './card-greencard-balance-section.component.html',
  styleUrls: [ './card-greencard-balance-section.component.scss' ]
} )
export class CardGreencardBalanceSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
