import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-pre-auth-key-field',
  templateUrl: './pre-auth-key-field.component.html',
  styleUrls: [ './pre-auth-key-field.component.scss' ]
} )
export class PreAuthKeyFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'preauthKey';
  @Input ()
  placeholder: string = 'Pre-Auth Key';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
