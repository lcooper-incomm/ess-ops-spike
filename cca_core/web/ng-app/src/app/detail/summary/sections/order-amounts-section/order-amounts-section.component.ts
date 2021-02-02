import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { MaplesOrder } from '@cscore/maples-client-model';

@Component ( {
  selector: 'cca-order-amounts-section',
  templateUrl: './order-amounts-section.component.html',
  styleUrls: [ './order-amounts-section.component.scss' ]
} )
export class OrderAmountsSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
