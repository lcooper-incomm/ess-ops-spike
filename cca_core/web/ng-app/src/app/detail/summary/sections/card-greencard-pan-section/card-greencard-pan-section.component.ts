import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Card } from 'src/app/core/card/card';
import { SearchParameterValueType } from "../../../../core/search/search-type/search-parameter-value-type.enum";
import { SearchTypeType } from "../../../../core/search/search-type/search-type-type.enum";
import { Workflow } from "../../../../core/workflow/workflow.service";
import { SearchTypeService } from "../../../../core/search/search-type/search-type.service";

@Component ( {
  selector: 'cca-card-greencard-pan-section',
  templateUrl: './card-greencard-pan-section.component.html',
  styleUrls: [ './card-greencard-pan-section.component.scss' ]
} )
export class CardGreencardPanSectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  constructor ( private searchTypeService: SearchTypeService,
                protected store: Store<AppState>,
                private workflow: Workflow ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

  public searchPan ( pan: string ) {
    //Prepare searchTypeContainer
    const searchTypeContainer = this.searchTypeService.getCachedSearchTypeByType ( SearchTypeType.FINANCIAL_GIFT );

    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.GREENCARD_EPAN, pan );

    this.workflow.forwardingSearch ( searchTypeContainer, true )
      .subscribe ();
  }

}
