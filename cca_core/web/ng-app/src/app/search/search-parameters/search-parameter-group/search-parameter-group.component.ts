import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { SearchTypeParameterGroup } from "../../../core/search/search-type/search-type-parameter-group";

@Component ( {
  selector: 'cca-search-parameter-group',
  templateUrl: './search-parameter-group.component.html',
  styleUrls: [ './search-parameter-group.component.scss' ]
} )
export class SearchParameterGroupComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  group: SearchTypeParameterGroup;
  @Input ()
  highlightedParameters: string[] = [];

  constructor () {
  }

  ngOnInit () {
  }

}
