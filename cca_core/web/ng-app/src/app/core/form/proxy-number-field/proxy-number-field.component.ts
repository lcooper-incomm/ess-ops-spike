import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-proxy-number-field',
  templateUrl: './proxy-number-field.component.html',
  styleUrls: [ './proxy-number-field.component.scss' ]
} )
export class ProxyNumberFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'proxyNumber';
  @Input ()
  placeholder: string = 'Proxy Number';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
