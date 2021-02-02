import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-phone-number-field',
  templateUrl: './phone-number-field.component.html',
  styleUrls: [ './phone-number-field.component.scss' ]
} )
export class PhoneNumberFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'phoneNumber';
  @Input ()
  placeholder: string = 'Phone Number';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
