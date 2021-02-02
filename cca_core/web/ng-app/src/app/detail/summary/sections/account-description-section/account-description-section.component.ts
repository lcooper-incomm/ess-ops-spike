import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Account } from 'src/app/core/account/account';

@Component ( {
  selector: 'cca-account-description-section',
  templateUrl: './account-description-section.component.html',
  styleUrls: [ './account-description-section.component.scss' ]
} )
export class AccountDescriptionSectionComponent extends AbstractSelectionAwareComponent<Account> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
