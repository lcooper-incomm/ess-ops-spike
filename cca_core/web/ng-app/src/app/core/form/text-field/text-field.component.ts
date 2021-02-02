import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from "../../cca-base-component";

@Component ( {
  selector: 'cca-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: [ './text-field.component.scss' ]
} )
export class TextFieldComponent extends CcaBaseComponent implements OnInit {

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
