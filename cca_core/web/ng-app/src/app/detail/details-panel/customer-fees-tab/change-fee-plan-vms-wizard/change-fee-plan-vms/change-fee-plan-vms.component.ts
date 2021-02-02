import { Component, OnInit, ViewChild } from '@angular/core';
import { Selection } from "../../../../../core/session/model/selection";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { ChangeFeePlanVmsWizard } from "../change-fee-plan-vms-wizard";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { FeeDetail } from "../../../../../core/model/fee-detail";
import { UpdateAccountDetail, UpdateAccountRequest } from "../../../../../core/customer/update-account-request";
import { FeePlan, FlatFeePlan } from "../../../../../core/model/fee-plan";
import { UpdateAccountActionType } from "../../../../../core/customer/update-account-action-type.enum";

@Component ( {
  selector: 'cca-change-fee-plan-vms',
  templateUrl: './change-fee-plan-vms.component.html',
  styleUrls: [ './change-fee-plan-vms.component.scss' ]
} )
export class ChangeFeePlanVmsComponent extends WizardPage<ChangeFeePlanVmsWizard> implements OnInit {
  key: string           = 'form-page';
  selection: Selection<any>;
  wizardForm: FormGroup = new FormGroup ( {} );

  dataSource: MatTableDataSource<FeeDetail> = new MatTableDataSource<FeeDetail> ();
  displayedColumns: string[]                = [ 'description', 'isClawbackEnabled', 'percentage', 'amount', 'minAmount' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;

  constructor () {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = "Next";
    this.width          = WizardWidth.EXTRA_LARGE;
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'description':
          sortValue = item.description ? item.description.toLowerCase () : null;
          break;
        case 'amount.displayValue':
          sortValue = item.amount.displayValue.toLowerCase ();
          break;
        case 'percentage':
          sortValue = item.percentage.toLowerCase ();
          break;
        case 'minAmount.displayValue':
          sortValue = item.minAmount.displayValue.toString ().toLowerCase ();
          break;
        case 'isClawbackEnabled':
          sortValue = item.isClawbackEnabled ? true : false;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };

    this.initForms ();
    this.subscribeToFormChanges ();

    this.wizard.model.customerId     = this.wizard.model.selection.getCustomer ().id;
    this.wizard.model.currentFeePlan = this.wizard.model.selection.getActiveFeePlan ();
    this.wizard.model.newFeePlan     = this.wizard.model.currentFeePlan;
    this.wizardForm.get ( 'feePlan' ).setValue ( this.wizard.model.currentFeePlan );
    this.dataSource.data = this.wizard.model.currentFeePlan.feeDetails;
  }

  compareFeePlans ( a: FeePlan, b: FeePlan ): boolean {
    return a && b && a.id === b.id;
  }

  onNext (): Observable<any> {
    this.wizard.model.comment = this.wizardForm.get ( 'comment' ).value;
    this.wizard.model.request = this.buildRequest ();
    return of ( 'review-page' );
  }

  private buildRequest (): UpdateAccountRequest {
    let formValue = this.wizardForm.getRawValue ();

    let requestFeePlan           = new FlatFeePlan ();
    requestFeePlan.id            = formValue.feePlan.id;
    requestFeePlan.effectiveDate = new Date ().getTime ();

    let accountDetail     = new UpdateAccountDetail ();
    accountDetail.feePlan = requestFeePlan;

    let request           = new UpdateAccountRequest ();
    request.accountDetail = accountDetail;
    request.action        = UpdateAccountActionType.UPDATE_FEE_PLAN;
    request.comment       = formValue.comment;
    request.isExpedited   = false;
    request.isFeeWaived   = false;
    request.reason        = formValue.comment;

    return request;
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      feePlan: new FormControl ( this.wizard.model.currentFeePlan ),
      isNewFee: new FormControl ( '', Validators.requiredTrue ),
      comment: new FormControl ( '', [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] )
    } );
  }

  private subscribeToFormChanges (): void {
    this.addSubscription (
      this.wizardForm.get ( 'feePlan' ).valueChanges
        .subscribe ( ( value: FeePlan ) => {
          this.dataSource.data         = value.feeDetails;
          this.wizard.model.newFeePlan = value;
          let isNewFee                 = value && value.id !== this.wizard.model.currentFeePlan.id;
          this.wizardForm.get ( 'isNewFee' ).setValue ( isNewFee );
        } )
    );
  }
}
