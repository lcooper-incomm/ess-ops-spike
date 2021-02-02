import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Account } from 'src/app/core/account/account';

@Component ( {
  selector: 'cca-account-status-section',
  templateUrl: './account-status-section.component.html',
  styleUrls: [ './account-status-section.component.scss' ]
} )
export class AccountStatusSectionComponent extends AbstractSelectionAwareComponent<Account> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
