import {Component, Input, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../cca-base-component";
import {FormGroup} from "@angular/forms";

@Component ( {
  selector: 'cca-email-address-field',
  templateUrl: './email-address-field.component.html',
  styleUrls: [ './email-address-field.component.scss' ]
} )
export class EmailAddressFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'emailAddress';
  @Input ()
  placeholder: string = 'Email Address';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
