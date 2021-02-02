import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-van-field',
  templateUrl: './van-field.component.html',
  styleUrls: [ './van-field.component.scss' ]
} )
export class VanFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'van';
  @Input ()
  placeholder: string = 'VAN';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
