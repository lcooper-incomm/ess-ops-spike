import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from '@ngrx/store';
import {MaplesOrder, MaplesOrderPayment} from '@cscore/maples-client-model';
import {Selection} from '../../../../core/session/model/selection';
import {OrderPaymentDetailsWizard} from '../order-purchase-section/order-payment-details/order-payment-details-wizard';
import {OrderService} from '../../../../core/order/order.service';
import {WizardRunner} from '../../../../core/wizard/wizard-runner/wizard-runner.service';
import {AppState} from '../../../../app-state';
import {AppStateType} from '../../../../app-state-type.enum';
import {SessionState} from '../../../../core/session/session-state';
import {CcaBaseComponent} from '../../../../core/cca-base-component';

@Component({
  selector: 'cca-order-payment-details-section',
  templateUrl: './order-payment-details-section.component.html'
})
export class OrderPaymentDetailsSectionComponent extends CcaBaseComponent implements OnChanges, OnInit {

  @Input()
  selection: Selection<MaplesOrder>;

  showPayments: boolean                     = false;
  paymentTransactions: MaplesOrderPayment[] = [];

  constructor(private orderService: OrderService,
              private store: Store<AppState>,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit(): void {
    this.subscribeToSessionState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTransactions();
  }

  updateTransactions(): void {
    if (this.selection) {
      this.paymentTransactions = this.selection.getPaymentTransactions();
      if (this.paymentTransactions.length <= 1) {
        this.showPayments = true;
      }
    }
  }

  openPaymentDetails(payment: MaplesOrderPayment): void {
    const order            = this.selection && this.selection.getOrder();
    const wizard           = new OrderPaymentDetailsWizard();
    wizard.model.selection = this.selection;
    wizard.model.order     = order;
    wizard.model.payment   = payment;
    this.wizardRunner.run(wizard);
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          this.updateTransactions();
        })
    );
  }
}
