import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from "../../../../../../core/transaction/transaction";
import { SearchTypeService } from "../../../../../../core/search/search-type/search-type.service";
import { Workflow } from "../../../../../../core/workflow/workflow.service";
import { SearchTypeType } from "../../../../../../core/search/search-type/search-type-type.enum";
import { SearchParameterValueType } from "../../../../../../core/search/search-type/search-parameter-value-type.enum";
import { Selection } from "../../../../../../core/session/model/selection";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../app-state";
import { Permission } from "../../../../../../core/auth/permission";
import { SecurityService } from "../../../../../../core/security/security.service";

@Component ( {
  selector: 'cca-transaction-history-location-detail',
  templateUrl: './transaction-history-location-detail.component.html',
  styleUrls: [ './transaction-history-location-detail.component.scss' ]
} )
export class TransactionHistoryLocationDetailComponent implements OnInit {
  hasPermission: boolean;

  @Input ()
  selection: Selection<any>;
  @Input ()
  transaction: Transaction;

  constructor ( private searchTypeService: SearchTypeService,
                private securityService: SecurityService,
                private store: Store<AppState>,
                private workflow: Workflow ) {
  }

  ngOnInit () {
    this.hasPermission = this.securityService.hasPermission ( Permission.SEARCH_BY_INCOMM );
  }

  public linkToProductByVan () {
    let van = this.transaction.identifiers.van;

    const searchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.FASTCARD_FASTPIN );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.VAN, van );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }

  public linkToProductByPan () {
    let pan = this.transaction.identifiers.pan;

    const searchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.FASTCARD_FASTPIN );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.PAN, pan );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }


}
