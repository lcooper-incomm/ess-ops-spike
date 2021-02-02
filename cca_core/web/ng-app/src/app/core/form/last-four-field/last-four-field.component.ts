import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-last-four-field',
  templateUrl: './last-four-field.component.html',
  styleUrls: [ './last-four-field.component.scss' ]
} )
export class LastFourFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'lastFour';
  @Input ()
  placeholder: string = 'Last Four';

  constructor () {
    super ();
  }

  ngOnInit () {
  }
}

