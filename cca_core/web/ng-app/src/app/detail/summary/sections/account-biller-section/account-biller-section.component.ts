import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { CsCoreAddressType } from "@cscore/core-client-model";
import { Account } from 'src/app/core/account/account';

@Component ( {
  selector: 'cca-account-biller-section',
  templateUrl: './account-biller-section.component.html',
  styleUrls: [ './account-biller-section.component.scss' ]
} )
export class AccountBillerSectionComponent extends AbstractSelectionAwareComponent<Account> implements OnInit {

  AddressType = CsCoreAddressType;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
