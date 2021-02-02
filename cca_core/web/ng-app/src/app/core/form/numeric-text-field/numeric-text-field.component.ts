import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-numeric-text-field',
  templateUrl: './numeric-text-field.component.html',
  styleUrls: [ './numeric-text-field.component.scss' ]
} )
export class NumericTextFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string;
  @Input ()
  hint: string;
  @Input ()
  placeholder: string;

  constructor () {
    super ();
  }

  ngOnInit () {
  }
}
