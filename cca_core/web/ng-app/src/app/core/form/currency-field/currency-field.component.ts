import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: [ './currency-field.component.scss' ]
} )
export class CurrencyFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string;
  @Input ()
  placeholder: string;

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}

