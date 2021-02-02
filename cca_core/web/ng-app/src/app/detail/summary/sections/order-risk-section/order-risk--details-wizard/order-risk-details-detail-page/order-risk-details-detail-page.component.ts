import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardPage } from "../../../../../../core/wizard/wizard-page";
import { OrderRiskDetailsWizard } from "../order-risk-details-wizard";
import { FormControl, FormGroup } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { MaplesOrderPaymentRiskRule } from "@cscore/maples-client-model";
import { Observable, of } from "rxjs";

@Component ( {
  selector: 'cca-order-risk-details-detail-page',
  templateUrl: './order-risk-details-detail-page.component.html',
  styleUrls: [ './order-risk-details-detail-page.component.scss' ]
} )
export class OrderRiskDetailsDetailPageComponent extends WizardPage<OrderRiskDetailsWizard> implements OnInit {

  dataSource: MatTableDataSource<MaplesOrderPaymentRiskRule> = new MatTableDataSource<MaplesOrderPaymentRiskRule> ();
  displayedColumns: string[]                           = [ 'id', 'score', 'reason' ];
  filterControl                                        = new FormControl ();
  key: string                                          = 'detail-page';
  wizardForm: FormGroup                                = new FormGroup ( {} );

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor () {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = false;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  ngOnInit () {
    this.sort.disableClear          = true;
    this.dataSource.sort            = this.sort;
    this.dataSource.paginator       = this.paginator;
    this.dataSource.filterPredicate = ( riskRule: MaplesOrderPaymentRiskRule, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }
      return (riskRule.id && riskRule.id.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (riskRule.score && riskRule.score.toString ().toLowerCase ().indexOf ( filterValue ) !== -1)
        || (riskRule.reason && riskRule.reason.toLowerCase ().indexOf ( filterValue ) !== -1)
    };

    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'id':
          sortValue = item.id ? item.id.toLowerCase () : null;
          break;
        case 'score':
          sortValue = item.score ? item.score : null;
          break;
        case 'reason':
          sortValue = item.reason ? item.reason.toLowerCase () : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };
  }

  onLoad (): Observable<any> {
    this.dataSource.data = this.wizard.model.risk.rules;
    return of ( null );
  }

  public applyFilter ( filterValue: string ): void {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

}
