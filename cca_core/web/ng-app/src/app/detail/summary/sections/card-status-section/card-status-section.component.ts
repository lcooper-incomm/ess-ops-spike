import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { getPlatformTypeDisplayValue, PlatformType } from "../../../../core/platform/platform-type.enum";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-status-section',
  templateUrl: './card-status-section.component.html',
  styleUrls: [ './card-status-section.component.scss' ]
} )
export class CardStatusSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  PlatformType = PlatformType;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

  getPlatformTypeDisplayValue ( type: PlatformType ): string {
    return `${getPlatformTypeDisplayValue ( type )} Status`;
  }

}
