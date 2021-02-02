import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-serial-number-field',
  templateUrl: './serial-number-field.component.html',
  styleUrls: [ './serial-number-field.component.scss' ]
} )
export class SerialNumberFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'serialNumber';
  @Input ()
  placeholder: string = 'Serial Number';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
