import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-card-redemption-section',
  templateUrl: './card-redemption-section.component.html',
  styleUrls: [ './card-redemption-section.component.scss' ]
} )
export class CardRedemptionSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  showRedemption: boolean = false;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.showRedemption = !!this.selection
      && !!this.selection.getCard ()
      && (!!this.selection.getCard ().identifiers.min
        || (!!this.selection.getCard ().redemption
          && (!!this.selection.getCard ().redemption.partnerVendorName
            || !!this.selection.getCard ().redemption.operatorVendorName
            || !!this.selection.getCard ().redemption.operatorExternalId
            || !!this.selection.getCard ().redemption.extendedAccountNumber
            || !!this.selection.getCard ().redemption.updateDate)));
  }

}
