import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-account-number-field',
  templateUrl: './account-number-field.component.html',
  styleUrls: [ './account-number-field.component.scss' ]
} )
export class AccountNumberFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'accountNumber';
  @Input ()
  placeholder: string = 'Account Number';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
