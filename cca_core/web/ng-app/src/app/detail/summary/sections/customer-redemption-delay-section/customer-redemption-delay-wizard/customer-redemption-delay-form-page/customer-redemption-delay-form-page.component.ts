import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardPage } from "../../../../../../core/wizard/wizard-page";
import { CustomerRedemptionDelayWizard } from "../customer-redemption-delay-wizard";
import { MatSort, MatTableDataSource } from "@angular/material";
import { RedemptionDelay } from "../../../../../../core/customer/redemption-delay";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-customer-redemption-delay-table-page',
  templateUrl: './customer-redemption-delay-form-page.component.html',
  styleUrls: [ './customer-redemption-delay-form-page.component.scss' ]
} )
export class CustomerRedemptionDelayFormPageComponent extends WizardPage<CustomerRedemptionDelayWizard> implements OnInit {

  dataSource                 = new MatTableDataSource<RedemptionDelay> ();
  displayedColumns: string[] = [ 'merchant', 'remaining', 'amount' ];
  key: string                = CustomerRedemptionDelayWizard.FORM_PAGE;
  wizardForm: FormGroup      = new FormGroup ( {} );

  @ViewChild ( MatSort )
  sort: MatSort;

  constructor () {
    super ();
    this.isCloseable = true;
  }

  ngOnInit (): void {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.data                = this.wizard.model.redemptionDelays;
    this.dataSource.sortingDataAccessor = ( redemptionDelay: RedemptionDelay, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'amount':
          sortValue = redemptionDelay.loadAmount ? redemptionDelay.loadAmount.value : null;
          break;
        case 'merchant':
          sortValue = redemptionDelay.merchantName ? redemptionDelay.merchantName.toLowerCase () : null;
          break;
        case 'remaining':
          sortValue = redemptionDelay.availableDate;
          break;
        default:
          sortValue = redemptionDelay[ property ];
          break;
      }

      return sortValue;
    };
  }

  isFutureDate ( value: Date ): boolean {
    return value.getTime () > new Date ().getTime ();
  }

}
