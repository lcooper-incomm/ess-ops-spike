import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";
import { StateProvinceService } from "./state-province.service";

@Component ( {
  selector: 'cca-state-province-field',
  templateUrl: './state-province-field.component.html',
  styleUrls: [ './state-province-field.component.scss' ]
} )
export class StateProvinceFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  controlName: string       = 'state';
  countries: CountryGroup[] = [];
  @Input ()
  country: string           = null;
  @Input ()
  form: FormGroup;
  @Input ()
  placeholder: string       = 'State/Province';

  constructor ( private stateProvinceService: StateProvinceService ) {
    super ();
  }

  ngOnInit () {
    this.countries = this.stateProvinceService.getCountryGroups ();
  }

}

export class CountryGroup {
  displayName: string;
  priority: number;
  value: string;

  children: StateProvince[] = [];
}

export class StateProvince {
  abbreviation: string;
  country: string;
  name: string;
}
