import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from "../../cca-base-component";

@Component ( {
  selector: 'cca-postal-code-field',
  templateUrl: './postal-code-field.component.html',
  styleUrls: [ './postal-code-field.component.scss' ]
} )
export class PostalCodeFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'postalCode';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
