import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-description-section',
  templateUrl: './card-description-section.component.html',
  styleUrls: [ './card-description-section.component.scss' ]
} )
export class CardDescriptionSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
