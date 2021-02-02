import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: [ './datepicker-field.component.scss' ]
} )
export class DatepickerFieldComponent extends CcaBaseComponent implements OnInit {

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
