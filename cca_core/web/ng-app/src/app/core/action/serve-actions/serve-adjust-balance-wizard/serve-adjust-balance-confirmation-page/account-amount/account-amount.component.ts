import {Component, Input, OnInit} from '@angular/core';
import {CsCoreCurrency} from "@cscore/gringotts";

@Component({
  selector: 'cca-account-amount',
  templateUrl: './account-amount.component.html',
  styleUrls: ['./account-amount.component.scss']
})
export class AccountAmountComponent implements OnInit {
  @Input () amount: CsCoreCurrency;
  @Input () label: string;

  constructor() { }

  ngOnInit() {
  }

}
