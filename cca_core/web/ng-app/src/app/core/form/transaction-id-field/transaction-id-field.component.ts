import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";

@Component ( {
  selector: 'cca-transaction-id-field',
  templateUrl: './transaction-id-field.component.html',
  styleUrls: [ './transaction-id-field.component.scss' ]
} )
export class TransactionIdFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'transactionId';
  @Input ()
  placeholder: string = 'Transaction ID';

  constructor () {
    super ();
  }

  ngOnInit () {
  }

}
