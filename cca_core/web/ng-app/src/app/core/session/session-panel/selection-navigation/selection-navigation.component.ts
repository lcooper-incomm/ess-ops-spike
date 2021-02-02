import {Component, Input} from '@angular/core';
import {CcaBaseComponent} from "../../../cca-base-component";
import {Selection, SelectionDataType} from "../../model/selection";
import {Workflow} from 'src/app/core/workflow/workflow.service';

@Component ( {
  selector: 'cca-selection-navigation',
  templateUrl: './selection-navigation.component.html',
  styleUrls: [ './selection-navigation.component.scss' ],
} )
export class SelectionNavigationComponent extends CcaBaseComponent {

  @Input () selections: Selection<SelectionDataType>[];

  constructor (
    private workflow: Workflow,
  ) {
    super ();
  }

  select ( selection: Selection<SelectionDataType> ): void {
    this.addSubscription (
      this.workflow.loadSelection ( selection ).subscribe ()
    );
  }
}
