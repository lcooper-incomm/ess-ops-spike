import { Component, Input, OnInit } from '@angular/core';
import { MaplesOrderItemCard } from "@cscore/maples-client-model";

@Component ( {
  selector: 'cca-order-item-display',
  templateUrl: './order-item-display.component.html',
  styleUrls: [ './order-item-display.component.scss' ]
} )
export class OrderItemDisplayComponent implements OnInit {
  @Input ()
  cards: MaplesOrderItemCard[] = [];
  @Input ()
  limit: number          = 18;

  showAll: boolean = false;

  constructor () {
  }

  ngOnInit () {
  }

}
