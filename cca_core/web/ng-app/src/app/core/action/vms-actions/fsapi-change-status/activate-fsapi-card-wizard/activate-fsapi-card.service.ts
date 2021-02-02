import { Injectable } from '@angular/core';
import { CardAlerts } from "../../../../card/card-alerts";
import { Card } from "../../../../card/card";
import { CustomerService } from "../../../../customer/customer.service";
import { Customer } from "../../../../customer/customer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Selection } from 'src/app/core/session/model/selection';

@Injectable ( {
  providedIn: 'root'
} )
export class ActivateFsapiCardService {

  constructor ( private customerService: CustomerService ) {
  }

  validate ( customerId: string, selection: Selection<Customer>, ): Observable<any> {
    return this.customerService.findOneById ( customerId, selection.platform, selection.partner )
      .pipe(map((customer:Customer) => {
        this.handleResponse ( customer, selection );
      }));
  }

  private handleResponse ( refreshedCustomer: Customer, selection: Selection<Customer> ): void {
    let refreshedCard: Card = new Card ( refreshedCustomer.cards.find ( ( card: Card ) => {
      return card.identifiers.panLastFour === selection.selectedCard.identifiers.panLastFour;
      } )
    );

    if ( refreshedCard && refreshedCard.alerts && refreshedCard.alerts.isPinSet ) {
      if ( !selection.selectedCard.alerts ) {
        selection.selectedCard.alerts = new CardAlerts ();
      }
      selection.selectedCard.alerts.isPinSet = refreshedCard.alerts.isPinSet;
    }
  }

}
