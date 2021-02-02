import { Component, OnInit, ViewChild } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Selection } from "../../../core/session/model/selection";
import { FeeDetail } from "../../../core/model/fee-detail";
import { FeePlan } from "../../../core/model/fee-plan";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ChangeFeePlanVmsWizard } from "./change-fee-plan-vms-wizard/change-fee-plan-vms-wizard";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { SecurityService } from "../../../core/security/security.service";
import { PlatformType } from "../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-customer-fees-tab',
  templateUrl: './customer-fees-tab.component.html',
  styleUrls: [ './customer-fees-tab.component.scss' ]
} )
export class CustomerFeesTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<FeeDetail> ();
  displayedColumns: string[] = [ 'description', 'clawback', 'percentage', 'min', 'amount' ];
  feePlan: FeePlan;
  filterControl: FormControl;
  filterForm: FormGroup      = new FormGroup ( {} );
  PlatformType               = PlatformType;
  selection: Selection<any>;

  @ViewChild ( 'feePlanSpinner' )
  feePlanSpinner: SpinnerComponent;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private store: Store<AppState>,
                public securityService: SecurityService,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.initForm ();
    this.subscribeToSessionState ();
    this.subscribeToFilterChanges ();
  }

  openChangeFeePlanDialog (): void {
    let wizard             = new ChangeFeePlanVmsWizard ();
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  private initDataSource (): void {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.filterPredicate     = ( feeDetail: FeeDetail, filterValue: string ): boolean => {
      return (feeDetail.description && feeDetail.description.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (feeDetail.amount && feeDetail.amount.displayValue && feeDetail.amount.displayValue.indexOf ( filterValue ) !== -1)
        || (feeDetail.percentage && feeDetail.percentage.indexOf ( filterValue ) !== -1)
        || (feeDetail.minAmount && feeDetail.minAmount.displayValue && feeDetail.minAmount.displayValue.indexOf ( filterValue ) !== -1)
        || (feeDetail.isClawbackEnabled && 'yes'.indexOf ( filterValue ) !== -1)
        || (!feeDetail.isClawbackEnabled && 'no'.indexOf ( filterValue ) !== -1);
    };
    this.dataSource.sortingDataAccessor = ( feeDetail: FeeDetail, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'description':
          sortValue = feeDetail.description ? feeDetail.description.toLowerCase () : null;
          break;
        case 'amount':
          sortValue = feeDetail.amount ? feeDetail.amount.value : null;
          break;
        case 'min':
          sortValue = feeDetail.minAmount ? feeDetail.minAmount.value : null;
          break;
        default:
          sortValue = feeDetail[ property ];
          break;
      }

      return sortValue;
    };
  }

  private initForm (): void {
    this.filterControl = new FormControl ( '', [] );
    this.filterForm    = new FormGroup ( {
      filter: this.filterControl
    } );
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterControl.valueChanges
        .pipe ( debounceTime ( 500 ) )
        .subscribe ( ( value: string ) => {
          if ( value ) {
            value = value.trim ();
            value = value.toLowerCase ();
          }
          this.dataSource.filter = value;
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;

            if ( state.selection.feePlans.length ) {
              this.feePlan = this.selection.getActiveFeePlan ();
              if ( this.feePlan ) {
                this.dataSource.data = this.feePlan.feeDetails;
              } else {
                this.dataSource.data = [];
              }
            } else {
              this.dataSource.data = [];
            }
          }
        } )
    );
  }

}
