import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Card } from "../../../core/card/card";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import * as _ from "lodash";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";
import { Workflow } from "../../../core/workflow/workflow.service";
import { Permission } from "../../../core/auth/permission";
import { SecurityService } from "../../../core/security/security.service";
import { SearchTypeType } from "../../../core/search/search-type/search-type-type.enum";
import { SearchParameterValueType } from "../../../core/search/search-type/search-parameter-value-type.enum";
import { SearchTypeService } from "../../../core/search/search-type/search-type.service";
import { CustomerVerificationService } from '../abstract-search-results-table/customer-verification/customer-verification.service';

@Component ( {
  selector: 'cca-ddp-search-results-table',
  templateUrl: './ddp-search-results-table.component.html',
  styleUrls: [ './ddp-search-results-table.component.scss' ]
} )
export class DdpSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Card> ();
  displayedColumns: string[] = [ 'serialNumber', 'van', 'pin', 'pan', 'upc', 'description', 'vendorId', 'owner', 'activationDate', 'status', 'amount' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private hasLocationSearchPermission: boolean = false;
  private textFilter: string;

  constructor (
    customerVerificationService: CustomerVerificationService,
    private searchTypeService: SearchTypeService,
    private securityService: SecurityService,
    store: Store<AppState>,
    workflow: Workflow,
  ) {
    super ( customerVerificationService, store, workflow );
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( card: Card, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'description':
          sortValue = card.productDescription ? card.productDescription.toLowerCase () : null;
          break;
        case 'owner':
          sortValue = card.productOwner ? card.productOwner.toLowerCase () : null;
          break;
        case 'serialNumber':
          sortValue = card.identifiers.serialNumber;
          break;
        case 'van':
          sortValue = card.identifiers.van;
          break;
        case 'pan':
          sortValue = card.identifiers.pan;
          break;
        case 'activationDate':
          sortValue = (card.activation && card.activation.activationDate) ? card.activation.activationDate.value : null;
          break;
        case 'pin':
          sortValue = card.identifiers.pin;
          break;
        case 'upc':
          sortValue = card.identifiers.upc;
          break;
        case 'vendorId':
          sortValue = card.identifiers.vendorId;
          break;
        case 'amount':
          sortValue = (card.amounts.denomination) ? card.amounts.denomination.value : null;
          break;
        case 'status':
          let status = card.getStatusByPlatform ( PlatformType.DDP );
          sortValue  = (status && status.name) ? status.name.toLowerCase () : null;
          break;
        default:
          sortValue = card[ property ];
          break;
      }

      return sortValue;
    };
    this.hasLocationSearchPermission    = this.securityService.hasPermission ( Permission.SEARCH_BY_LOCATION );
    this.subscribeToSearchState ();
  }

  canLinkToMerchant ( card: Card ): boolean {
    return this.hasLocationSearchPermission && !!card.productOwner;
  }

  linkToMerchant ( name: string ): void {
    const locationSearchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.LOCATION );
    locationSearchTypeContainer.clear ();
    locationSearchTypeContainer.parameters.set ( SearchParameterValueType.MERCHANT_NAME, name );

    this.workflow.forwardingSearch ( locationSearchTypeContainer, true )
      .subscribe ();
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.textFilter = searchState.textFilter;
            if ( searchState.selectedSearchType ) {
              this.dataSource.data = this.filterResults ( searchState.selectedSearchType.results );
            } else {
              this.dataSource.data = [];
            }
          }
        }
      } )
    );
  }

  private filterResults ( cards: Card[] ): Card[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( cards, function ( card: Card ) {
        let status: CsCoreStatus            = card.getStatusByPlatform ( PlatformType.DDP );
        let activationDate: CsCoreTimestamp = card.activation ? card.activation.activationDate : null;
        return (card.identifiers.serialNumber && card.identifiers.serialNumber.indexOf ( filter ) !== -1)
          || (card.identifiers.pin && card.identifiers.pin.indexOf ( filter ) !== -1)
          || (card.identifiers.upc && card.identifiers.upc.indexOf ( filter ) !== -1)
          || (card.productDescription && card.productDescription.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.identifiers.vendorId && card.identifiers.vendorId.indexOf ( filter ) !== -1)
          || (card.productOwner && card.productOwner.toLowerCase ().indexOf ( filter ) !== -1)
          || (status && status.name && status.name.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.amounts.denomination && card.amounts.denomination.displayValue.indexOf ( filter ) !== -1);
      } );
    }
    return cards;
  }

}
