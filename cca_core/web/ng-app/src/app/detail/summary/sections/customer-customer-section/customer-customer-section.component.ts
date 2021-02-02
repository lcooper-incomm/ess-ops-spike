import { Component, OnInit } from '@angular/core';
import { SecurityService } from "../../../../core/security/security.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Customer } from 'src/app/core/customer/customer';

@Component ( {
  selector: 'cca-customer-customer-section',
  templateUrl: './customer-customer-section.component.html',
  styleUrls: [ './customer-customer-section.component.scss' ]
} )
export class CustomerCustomerSectionComponent extends AbstractSelectionAwareComponent<Customer> implements OnInit {

  isSystemAdministrator: boolean = false;

  constructor ( private securityService: SecurityService,
                protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.isSystemAdministrator = this.securityService.getCurrentUser ().isSystemAdministrator;
  }

}
