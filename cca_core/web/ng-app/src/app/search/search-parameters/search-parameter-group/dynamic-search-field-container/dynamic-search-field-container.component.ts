import { Component, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";
import { SearchParameterType } from "../../../../core/search/search-type/search-parameter-type.enum";
import { SearchParameter } from 'src/app/core/search/search-type/search-parameter';

@Component ( {
  selector: 'cca-dynamic-search-field-container',
  templateUrl: './dynamic-search-field-container.component.html',
  styleUrls: [ './dynamic-search-field-container.component.scss' ]
} )
export class DynamicSearchFieldContainerComponent {

  @Input ()
  form: FormGroup;
  @Input ()
  highlightedParameters: string[] = [];
  @Input ()
  parameter: SearchParameter;

  isHighlighted (): boolean {
    let isIdentificationField: boolean = this.parameter.type === SearchParameterType.IDENTIFICATION;

    return (isIdentificationField && (_.includes ( this.highlightedParameters, SearchParameterType.IDENTIFICATION_TYPE ) || _.includes ( this.highlightedParameters, SearchParameterType.IDENTIFICATION_NUMBER )))
      || ((!isIdentificationField && _.includes ( this.highlightedParameters, this.parameter.type )));
  }

}
