import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-can-field',
  templateUrl: './can-field.component.html',
  styleUrls: [ './can-field.component.scss' ]
} )
export class CanFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'can';
  @Input ()
  placeholder: string = 'CAN';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
