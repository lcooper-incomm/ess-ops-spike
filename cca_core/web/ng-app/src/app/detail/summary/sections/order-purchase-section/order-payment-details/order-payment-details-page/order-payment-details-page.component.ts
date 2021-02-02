import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import * as _ from 'lodash';
import {MaplesOrder, MaplesOrderPayment, MaplesOrderTransaction} from '@cscore/maples-client-model';
import {CsCoreAddress, CsCorePhoneNumberType} from '@cscore/core-client-model';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {filterGenericOptionDisplayValueArray, GenericOption} from 'src/app/core/model/generic-option';
import {WizardWidth} from '../../../../../../core/wizard/wizard-width.enum';
import {OrderService} from '../../../../../../core/order/order.service';
import {PlatformType} from '../../../../../../core/platform/platform-type.enum';
import {OrderPaymentDetailsWizard} from '../order-payment-details-wizard';
import {map} from "rxjs/operators";

@Component({
  selector: 'cca-order-payment-details-page',
  templateUrl: './order-payment-details-page.component.html',
  styleUrls: ['./order-payment-details-page.component.scss'],
})
export class OrderPaymentDetailsPageComponent extends WizardPage<OrderPaymentDetailsWizard> {

  isAuthOnly: boolean   = false;
  key: string           = 'details-page';
  wizardForm: FormGroup = new FormGroup({});
  isCloseable: boolean  = true;

  archTransactions: GenericOption<string | number | boolean | CsCoreAddress>[]  = [];
  error: boolean                                                                = false;
  filterForm: FormGroup;
  platform: PlatformType;
  transaction: MaplesOrderTransaction;
  transactionFields: GenericOption<string | number | boolean | CsCoreAddress>[] = [];

  constructor(private orderService: OrderService) {
    super();
    this.width = WizardWidth.MEDIUM;
  }

  onLoad(): Observable<any> {
    this.initForm();
    this.subscribeToFilterChanges();
    this.platform          = this.wizard.model.selection.platform;
    this.transaction       = this.wizard.model.payment['transaction'];
    this.transactionFields = this.buildDetails();
    this.archTransactions  = _.cloneDeep(this.transactionFields);
    return of(null);
  }

  get payment(): MaplesOrderPayment {
    return this.wizard.model.payment;
  }

  buildDetails(): GenericOption<string | number | boolean | CsCoreAddress>[] {
    let customer            = this.transaction ? this.transaction.customer : null;
    let customerAddress1    = customer ? customer.addresses[0].line1 : null;
    let customerAddress2    = customer ? customer.addresses[0].line2 : null;
    let customerHomePhone   = (customer && customer.getPhoneNumberByType(CsCorePhoneNumberType.HOME)) ? customer.getPhoneNumberByType(CsCorePhoneNumberType.HOME) : null;
    let customerMobilePhone = (customer && customer.getPhoneNumberByType(CsCorePhoneNumberType.MOBILE)) ? customer.getPhoneNumberByType(CsCorePhoneNumberType.MOBILE) : null;
    let fraudProcessor      = this.transaction ? this.transaction.fraudProcessor : null;
    let processor           = this.transaction ? this.transaction.processor : null;
    let recipient           = this.transaction ? this.transaction.recipient : null;
    let recipientAddress    = (recipient && recipient.addresses.length) ? recipient.addresses[0].line1 : null;
    let recipientPhone      = (recipient && recipient.getPhoneNumberByType(CsCorePhoneNumberType.HOME)) ? recipient.getPhoneNumberByType(CsCorePhoneNumberType.HOME) : null;

    const fields: GenericOption<string | number | boolean | CsCoreAddress>[] = !this.transaction ? [] : [
      {
        displayValue: 'Address Line 1',
        value: customerAddress1,
      },
      {
        displayValue: 'Address Line 2',
        value: customerAddress2,
      },
      {
        displayValue: 'Agree?',
        value: this.transaction.isAgree,
      },
      {
        displayValue: 'Amount',
        value: this.transaction.amount && this.transaction.amount.displayValue,
      },
      {
        displayValue: 'Authorization Code',
        value: this.transaction.authorizationCode,
      },
      {
        displayValue: 'Card Name',
        value: this.transaction.ccName,
      },
      {
        displayValue: 'Created Date',
        value: this.transaction.createdDate && this.transaction.createdDate.displayValue,
      },
      {
        displayValue: 'Credit Card Hash',
        value: this.transaction.ccHash,
      },
      {
        displayValue: 'Credit Card Last 4',
        value: this.transaction.ccLastFour,
      },
      {
        displayValue: 'Credit Card Type',
        value: this.transaction.ccType,
      },
      {
        displayValue: 'Currency Code',
        value: (this.transaction.amount && this.transaction.amount.descriptor) ? this.transaction.amount.descriptor.description : null,
      },
      {
        displayValue: 'Email',
        value: customer && customer.emailAddress,
      },
      {
        displayValue: 'Email Confirm',
        value: customer && customer.emailConfirm,
      },
      {
        displayValue: 'Error Code',
        value: this.transaction.errorCode,
      },
      {
        displayValue: 'Error Message',
        value: this.transaction.errorMessage,
      },
      {
        displayValue: 'Fingerprint',
        value: this.transaction.fingerprint,
      },
      {
        displayValue: 'First Name',
        value: customer && customer.firstName,
      },
      {
        displayValue: 'Fraud Processor Cross-Reference',
        value: fraudProcessor && fraudProcessor.crossReference,
      },
      {
        displayValue: 'Fraud Processor Recommendation',
        value: fraudProcessor && fraudProcessor.recommendation,
      },
      {
        displayValue: 'Fraud Processor Remarks',
        value: fraudProcessor && fraudProcessor.remarks,
      },
      {
        displayValue: 'Fraud Processor Transaction',
        value: fraudProcessor && fraudProcessor.transaction,
      },
      {
        displayValue: 'Last 4 of Payment Card',
        value: this.payment.ccLastFour,
      },
      {
        displayValue: 'Last Name',
        value: customer && customer.lastName,
      },
      {
        displayValue: 'Mobile Number',
        value: customerMobilePhone && customerMobilePhone.number,
      },
      {
        displayValue: 'Opt-In',
        value: this.transaction.optIn,
      },
      {
        displayValue: 'Payment Config',
        value: this.transaction.paymentConfig,
      },
      {
        displayValue: 'Payment Method',
        value: this.payment.method,
      },
      {
        displayValue: 'Payment Processor',
        value: processor && processor.name,
      },
      {
        displayValue: 'Payment Reason',
        value: this.payment.reason,
      },
      {
        displayValue: 'Payment Status',
        value: this.payment.status.description,
      },
      {
        displayValue: 'Payment Token',
        value: this.transaction.paymentToken,
      },
      {
        displayValue: 'Phone Number',
        value: customerHomePhone && customerHomePhone.number,
      },
      {
        displayValue: 'Processor Approval Code',
        value: processor && processor.approvalCode,
      },
      {
        displayValue: 'Processor AVS Result Code',
        value: processor && processor.avsResultCode,
      },
      {
        displayValue: 'Processor CSC Result Code',
        value: processor && processor.cscResultCode,
      },
      {
        displayValue: 'Processor Display Message',
        value: processor && processor.displayMessage,
      },
      {
        displayValue: 'Processor Error Code',
        value: processor && processor.errorCode,
      },
      {
        displayValue: 'Processor ISS Transaction ID',
        value: processor && processor.issTransactionId,
      },
      {
        displayValue: 'Processor Result',
        value: processor && processor.result,
      },
      {
        displayValue: 'Processor Result Code',
        value: processor && processor.resultCode,
      },
      {
        displayValue: 'Processor Transaction ID',
        value: processor && processor.transactionId,
      },
      {
        displayValue: 'Processor Transaction Reference',
        value: processor && processor.transactionReference,
      },
      {
        displayValue: 'Profile Description',
        value: this.transaction.profileDescription,
      },
      {
        displayValue: 'Quote ID',
        value: this.transaction.quoteId,
      },
      {
        displayValue: 'Refund Amount',
        value: this.transaction.refundAmount && this.transaction.refundAmount.displayValue,
      },
      {
        displayValue: 'Relay Fingerprint',
        value: this.transaction.relayFingerprint,
      },
      {
        displayValue: 'Sequence ID',
        value: this.transaction.sequenceId,
      },
      {
        displayValue: 'Settlement Amount',
        value: this.transaction.settlementAmount && this.transaction.settlementAmount.displayValue,
      },
      {
        displayValue: 'Shipping Address',
        value: recipientAddress,
      },
      {
        displayValue: 'Shipping Email',
        value: recipient && recipient.emailAddress,
      },
      {
        displayValue: 'Shipping First Name',
        value: recipient && recipient.firstName,
      },
      {
        displayValue: 'Shipping Last Name',
        value: recipient && recipient.lastName,
      },
      {
        displayValue: 'Shipping Phone Number',
        value: recipientPhone && recipientPhone.number,
      },
      {
        displayValue: 'Store Payment Profile',
        value: this.transaction.storePaymentProfile,
      },
      {
        displayValue: 'Success?',
        value: this.transaction.isSuccess,
      },
      {
        displayValue: 'Trans Data IV',
        value: this.transaction.data,
      },
      {
        displayValue: 'Transaction ID',
        value: this.transaction.id,
      },
      {
        displayValue: 'Type',
        value: this.transaction.type,
      },
      {
        displayValue: 'Updated Date',
        value: this.transaction.updatedDate && this.transaction.updatedDate.displayValue,
      },
    ];
    return fields;
  }

  private get order(): MaplesOrder {
    return this.wizard.model.order;
  }

  private loadTransaction (): Observable<any> {
    return this.orderService.findTransactions ( this.wizard.model.order.id, this.wizard.model.selection.getMaplesPlatform(), this.wizard.model.selection.simplePartner )
      .pipe ( map ( ( transactions: MaplesOrderTransaction[] ) => {
        this.setTransaction ( transactions );
      } ) );
  }

  setTransaction ( transactions ) {
    // If not Ecomm partner, show the first transaction in the array
    if ( this.platform !== PlatformType.ECOMM ) {
      this.transaction = transactions[ 0 ];
    } else {
      this.findPreferredTransaction ( transactions );
    }
    this.transactionFields = this.buildDetails ();
    this.archTransactions  = _.cloneDeep ( this.transactionFields );
  }

  private findPreferredTransaction ( transactions ): void {
    let preferredTransaction = transactions.find ( transaction => transaction.type === 'AUTHONLY' );
    if ( !preferredTransaction ) {
      this.transaction = transactions[ 0 ];
    } else {
      this.isAuthOnly  = true;
      this.transaction = preferredTransaction;
    }
  }

  initForm () {
    this.filterForm = new FormGroup ( {
      filter: new FormControl ( null, [] )
    } );
  }

  private subscribeToFilterChanges(): void {
    this.addSubscription(
      this.filterForm.valueChanges
        .subscribe((value: any) => {
          this.transactionFields = filterGenericOptionDisplayValueArray(this.archTransactions, value.filter);
        })
    );
  }

}


