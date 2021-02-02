import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Merchant } from "../../../../core/node/merchant";
import { SelectionType } from "../../../../core/session/model/selection-type.enum";
import { Location } from 'src/app/core/node/location/location';

@Component ( {
  selector: 'cca-location-hierarchy-section',
  templateUrl: './location-hierarchy-section.component.html',
  styleUrls: [ './location-hierarchy-section.component.scss' ]
} )
export class LocationHierarchySectionComponent extends AbstractSelectionAwareComponent<Location> implements OnInit {

  businessUnit: string;
  merchants: string[] = [];
  location: string;

  private loadedHierarchy: boolean = false;

  constructor ( store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  private buildBusinessUnitDisplayValue (): void {
    if ( this.selection
      && this.selection.hierarchy
      && this.selection.hierarchy.businessUnit ) {
      let businessUnitNode = this.selection.hierarchy.businessUnit;
      this.businessUnit    = businessUnitNode.name;
      if ( businessUnitNode.legacyId ) {
        this.businessUnit += ` (${businessUnitNode.legacyId})`;
      }
    } else {
      this.businessUnit = null;
    }
  }

  private buildLocationDisplayValue (): void {
    if ( this.selection
      && this.selection.hierarchy
      && this.selection.hierarchy.location ) {
      let locationNode = this.selection.hierarchy.location;
      this.location    = locationNode.name;
      if ( locationNode.legacyId ) {
        this.location += ` (${locationNode.legacyId})`;
      }
    } else {
      this.location = null;
    }
  }

  private buildMerchantDisplayValue ( merchant: Merchant ): void {
    let merchantName = merchant.description;
    if ( !merchantName ) {
      merchantName = merchant.name;
    }
    if ( merchantName && merchant.legacyId ) {
      merchantName += ` (${merchant.legacyId})`;
    }
    this.merchants.push ( merchantName );
  }

  private buildMerchantDisplayValues (): void {
    this.merchants = [];
    if ( this.selection
      && this.selection.hierarchy
      && this.selection.hierarchy.merchants ) {
      this.selection.hierarchy.merchants.forEach ( ( merchant: Merchant ) => this.buildMerchantDisplayValue ( merchant ) );
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.type === SelectionType.LOCATION ) {
            if ( state.selection.hierarchy && !this.loadedHierarchy ) {
              this.loadedHierarchy = true;
              this.buildBusinessUnitDisplayValue ();
              this.buildMerchantDisplayValues ();
              this.buildLocationDisplayValue ();
            }
          }
        } )
    );
  }
}
