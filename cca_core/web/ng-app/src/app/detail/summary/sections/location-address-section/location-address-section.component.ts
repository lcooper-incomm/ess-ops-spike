import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Location } from 'src/app/core/node/location/location';

@Component ( {
  selector: 'cca-location-address-section',
  templateUrl: './location-address-section.component.html',
  styleUrls: [ './location-address-section.component.scss' ]
} )
export class LocationAddressSectionComponent extends AbstractSelectionAwareComponent<Location> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
