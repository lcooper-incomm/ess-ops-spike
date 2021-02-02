import { Component } from '@angular/core';
import { ViewDisputeWizard } from '../view-dispute-wizard';
import { FormGroup } from '@angular/forms';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { EnhancedDispute } from '../../models/vms-response-models';
import { Customer } from 'src/app/core/customer/customer';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { ToastFactory } from 'src/app/toast/toast-factory.service';
import { DisputeDetailTransaction } from '../../models/vms-request-models';
import { CsCoreCodeType } from '@cscore/core-client-model';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { DeliveryMethod, DeliveryMethodCode } from 'src/app/core/model/minion/task/delivery-method';
import { SecurityService } from 'src/app/core/security/security.service';
import { Permission } from 'src/app/core/auth/permission';

@Component ( {
  selector: 'cca-view-dispute-form-page',
  templateUrl: './view-dispute-form-page.component.html',
  styleUrls: [ './view-dispute-form-page.component.scss' ]
} )
export class ViewDisputeFormPageComponent extends WizardPage<ViewDisputeWizard> {
  key: string = 'form-page';
  wizardForm: FormGroup;

  displayedColumns: string[] = [ 'id', 'fileName', 'fileDate' ];
  sending: boolean           = false;

  loadDisputes$: Observable<any>;

  constructor (
    private customerService: CustomerService,
    private formBuilder: CcaFormBuilder,
    private securityService: SecurityService,
    private toaster: ToastFactory,
    private transactionService: TransactionService,
  ) {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.MEDIUM;
  }

  canResendDisputeDocuments (): boolean {
    return this.securityService.hasPermission ( Permission.RESEND_DISPUTE_DOCUMENTS )
  }

  get customer (): Customer {
    return this.wizard.model.selection.getCustomer ();
  }

  ngOnInit () {
    this.loadDisputes$ = this.loadDispute ();
    this.wizardForm    = this.initForm ();
  }

  onLoad (): Observable<any> {
    return this.loadDisputes$;
  }

  resendDocuments (): void {
    this.sending         = true;
    const deliveryMethod = this.getValueFromForm<DeliveryMethod> ( 'deliveryMethod' );
    const deliveryValue  = deliveryMethod.code === DeliveryMethodCode.FAX ? this.getValueFromForm<string> ( 'fax' ) : null;
    const partner = this.wizard.model.selection.partner;
    const platform = this.wizard.model.selection.platform;
    this.addSubscription (
      this.customerService
        .resendDisputeDocuments (this.buildRequest (), deliveryMethod.code, deliveryValue, partner, platform)
        .pipe ( finalize ( () => this.sending = false ) )
        .subscribe ( () => {
          this.toaster.success ( 'Successfully resent dispute documents' );
        } )
    );
  }

  private initForm (): FormGroup {
    return this.formBuilder.deliveryMethod ( null, null, null, true );
  }

  private loadDispute (): Observable<EnhancedDispute> {
    return this.transactionService
      .getDisputeForTransaction ( this.wizard.model.selection.getPrimaryIdentifier (), this.wizard.model.transaction, this.wizard.model.selection.platform )
      .pipe ( tap ( result => {
        this.wizard.model.dispute = result;
      } ) );
  }

  private buildRequest (): DisputeDetailTransaction {
    return {
      transactionId: this.wizard.model.transaction.id,
      sourceRefNum: null,
      deliveryChannelCode: this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).code,
      requestCode: this.wizard.model.transaction.request.code,
      responseCode: this.wizard.model.transaction.response.code,
      businessDate: this.wizard.model.transaction.businessDate.getAsMilliseconds ()
    };
  }
}
