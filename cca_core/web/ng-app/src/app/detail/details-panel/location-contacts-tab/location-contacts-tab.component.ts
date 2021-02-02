import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { Location } from 'src/app/core/node/location/location';

@Component ( {
  selector: 'cca-location-contacts-tab',
  templateUrl: './location-contacts-tab.component.html',
  styleUrls: [ './location-contacts-tab.component.scss' ]
} )
export class LocationContactsTabComponent extends AbstractSelectionAwareComponent<Location> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
