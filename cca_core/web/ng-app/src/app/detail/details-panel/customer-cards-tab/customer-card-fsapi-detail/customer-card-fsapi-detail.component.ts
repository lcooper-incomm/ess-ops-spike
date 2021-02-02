import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../../../core/card/card";
import {Customer} from "../../../../core/customer/customer";
import {CsCoreStatusType} from "../../../../core/model/cs-core-status";

@Component ( {
  selector: 'cca-customer-card-fsapi-detail',
  templateUrl: './customer-card-fsapi-detail.component.html',
  styleUrls: [ './customer-card-fsapi-detail.component.scss' ]
} )
export class CustomerCardFsapiDetailComponent implements OnInit {
  @Input ()
  card: Card;

  @Input()
  customer: Customer;

  constructor () {
  }

  ngOnInit () {

  }

  get shippedStatus(): string {
    return this.card.getStatusByType(CsCoreStatusType.SHIPPING).name;
  }
}
