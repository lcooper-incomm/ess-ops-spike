import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Bank, BankType, ComplaintOption } from "../../../../../../complaint/bank";

@Component ( {
  selector: 'cca-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: [ './complaint-form.component.scss' ]
} )
export class ComplaintFormComponent implements OnInit {

  @Input ()
  bank: Bank;
  @Input ()
  form: FormGroup;
  @Input ()
  inWizard: boolean = false;

  BankType = BankType;

  constructor () {
  }

  ngOnInit () {
  }

  isBankType(...bankTypes: BankType[]): boolean {
    return this.bank && bankTypes.includes(this.bank.systemValue);
  }

  compareOptions ( a: ComplaintOption, b: ComplaintOption ): boolean {
    return a && b && a.id === b.id;
  }
}
