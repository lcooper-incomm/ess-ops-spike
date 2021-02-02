import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CsCoreAddressType } from "@cscore/core-client-model";
import { Selection } from "../../../../../../../core/session/model/selection";
import { Transaction } from "../../../../../../../core/transaction/transaction";
import { SpinnerComponent } from "../../../../../../../core/spinner/spinner.component";
import { LocationService } from "../../../../../../../core/node/location/location.service";
import { HierarchyService } from "../../../../../../../core/node/hierarchy/hierarchy.service";
import { SearchTypeService } from "../../../../../../../core/search/search-type/search-type.service";
import { SecurityService } from "../../../../../../../core/security/security.service";
import { Workflow } from "../../../../../../../core/workflow/workflow.service";
import { Permission } from "../../../../../../../core/auth/permission";
import { finalize } from "rxjs/operators";
import { Hierarchy } from "../../../../../../../core/node/hierarchy/hierarchy";
import { SearchTypeType } from "../../../../../../../core/search/search-type/search-type-type.enum";
import { SearchParameterValueType } from "../../../../../../../core/search/search-type/search-parameter-value-type.enum";
import { CcaBaseComponent } from "../../../../../../../core/cca-base-component";

@Component ( {
  selector: 'cca-incomm-transaction-history-detail',
  templateUrl: './incomm-transaction-detail.component.html',
  styleUrls: [ './incomm-transaction-detail.component.scss' ]
} )
export class IncommTransactionDetailComponent extends CcaBaseComponent implements OnInit {
  AddressType = CsCoreAddressType;
  hasPermission: boolean;

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;

  @ViewChild ( 'hierarchySpinner' )
  hierarchySpinner: SpinnerComponent;

  constructor ( private locationService: LocationService,
                private hierarchyService: HierarchyService,
                private searchTypeService: SearchTypeService,
                private securityService: SecurityService,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    if ( this.transaction.nodes.terminal.id && !this.transaction.nodes.merchant || this.transaction.nodes.terminal.id && !this.transaction.nodes.location ) {
      this.findOne ( 'TERMINAL', this.transaction.nodes.terminal.id, false )
    }
    this.hasPermission = this.securityService.hasPermission ( Permission.SEARCH_BY_LOCATION );
  }

  findOne ( str, id, isTrue ) {
    this.hierarchySpinner.start ();
    this.hierarchyService
      .findOne ( str, id, isTrue )
      .pipe ( finalize ( () => this.hierarchySpinner.stop () ) )
      .subscribe ( ( hierarchy: Hierarchy ) => {
        this.transaction.nodes.merchant = hierarchy.merchants[ 0 ];
        this.transaction.nodes.location = hierarchy.location;
      } )
  }

  linkToWorkFlow () {
    let locationId = this.transaction.nodes.location.id;

    const searchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.LOCATION );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.LOCATION_ID, locationId );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }
}
