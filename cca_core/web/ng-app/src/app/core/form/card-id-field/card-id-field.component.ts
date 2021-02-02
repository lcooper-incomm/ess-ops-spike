import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-card-id-field',
  templateUrl: './card-id-field.component.html',
  styleUrls: [ './card-id-field.component.scss' ]
} )
export class CardIdFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'cardId';
  @Input ()
  placeholder: string = 'Card ID';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
