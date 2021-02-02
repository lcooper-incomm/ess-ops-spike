import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Customer } from 'src/app/core/customer/customer';

@Component ( {
  selector: 'cca-customer-balance-section',
  templateUrl: './customer-balance-section.component.html',
  styleUrls: [ './customer-balance-section.component.scss' ]
} )
export class CustomerBalanceSectionComponent extends AbstractSelectionAwareComponent<Customer> implements OnInit {

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

}
