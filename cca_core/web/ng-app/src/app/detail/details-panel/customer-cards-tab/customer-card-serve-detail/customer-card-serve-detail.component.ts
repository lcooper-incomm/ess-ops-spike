import {Component, Input} from '@angular/core';
import {MaplesCard, MaplesCardHistory} from '@cscore/maples-client-model';

@Component ( {
  selector: 'cca-customer-card-serve-detail',
  templateUrl: './customer-card-serve-detail.component.html'
} )
export class CustomerCardServeDetailComponent {
  @Input ()
  card: MaplesCard;
  @Input ()
  cardHistory: MaplesCardHistory;

  constructor () {
  }
}
