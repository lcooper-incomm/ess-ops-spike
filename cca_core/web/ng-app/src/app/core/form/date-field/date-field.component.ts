import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from "../../cca-base-component";

@Component ( {
  selector: 'cca-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: [ './date-field.component.scss' ]
} )
export class DateFieldComponent extends CcaBaseComponent implements OnInit {

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
