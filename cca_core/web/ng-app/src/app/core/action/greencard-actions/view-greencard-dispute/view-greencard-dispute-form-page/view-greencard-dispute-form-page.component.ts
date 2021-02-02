import {Component} from '@angular/core';
import {ViewDisputeWizard} from '../../../vms-actions/view-dispute/view-dispute-wizard';
import {FormGroup} from '@angular/forms';
import {CcaFormBuilder} from 'src/app/core/form/cca-form-builder.service';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {finalize, tap} from 'rxjs/operators';
import {WizardWidth} from 'src/app/core/wizard/wizard-width.enum';
import {ToastFactory} from 'src/app/toast/toast-factory.service';
import {CustomerService} from 'src/app/core/customer/customer.service';
import {DeliveryMethod, DeliveryMethodCode} from 'src/app/core/model/minion/task/delivery-method';
import {SecurityService} from 'src/app/core/security/security.service';
import {Observable} from "rxjs";
import {Session} from "../../../../session/model/session";
import {SessionService} from "../../../../session/session.service";
import {MinionUtilsService} from "../../../../model/minion/minion-utils.service";
import {CsCoreAddress} from "@cscore/core-client-model";

@Component({
  selector: 'cca-view-greencard-dispute-form-page',
  templateUrl: './view-greencard-dispute-form-page.component.html',
  styleUrls: ['./view-greencard-dispute-form-page.component.scss']
})
export class ViewGreencardDisputeFormPageComponent extends WizardPage<ViewDisputeWizard> {
  key: string = 'form-page';
  wizardForm: FormGroup;

  displayedColumns: string[] = ['id', 'fileName', 'fileDate'];
  sending: boolean           = false;

  loadDisputesSession$: Observable<Session>;

  constructor(
    private customerService: CustomerService,
    private formBuilder: CcaFormBuilder,
    private securityService: SecurityService,
    private toaster: ToastFactory,
    private sessionService: SessionService,
    private minionUtil: MinionUtilsService
  ) {
    super();
    this.isCloseable = true;
    this.width       = WizardWidth.MEDIUM;
  }

  ngOnInit() {
    this.loadDisputesSession$ = this.loadDisputeSession();
  }

  onLoad(): Observable<any> {
    return this.loadDisputesSession$;
  }

  resendDocuments(): void {
    this.sending                         = true;
    const deliveryMethod: DeliveryMethod = this.getValueFromForm<DeliveryMethod>('deliveryMethod');
    const email: string                  = this.getValueFromForm<any>('email');
    const address: CsCoreAddress         = this.getValueFromForm<any>('address');
    const fax: string                    = deliveryMethod.code === DeliveryMethodCode.FAX ? this.getValueFromForm<string>('fax') : null;

    this.wizard.model.dispute.deliveryMethod = deliveryMethod;
    this.wizard.model.dispute.emailAddress   = email ? email : this.wizard.model.session.customerComponent.emailAddress;
    this.wizard.model.dispute.address        = address ? address : this.wizard.model.session.customerComponent.address;
    this.wizard.model.dispute.fax            = fax;

    const task = this.minionUtil.createDisputeTaskFromViewDisputeWizard(this.wizard.model);
    this.customerService.sendDisputeDocumentation(task)
      .pipe(finalize(() => this.sending = false))
      .subscribe(() => {
        this.toaster.success('Successfully resent dispute documents');
      })
  }

  private initForm(): FormGroup {
    return this.formBuilder.deliveryMethod(null, this.wizard.model.session.customerComponent.emailAddress, null, true);
  }

  private loadDisputeSession(): Observable<Session> {
    return this.sessionService.findSession(this.wizard.model.transaction.disputeId)
      .pipe(tap(result => {
        this.wizard.model.session = result;
        this.wizard.model.dispute = this.wizard.model.session.disputeComponent;
        this.wizardForm           = this.initForm();

      }))
  }
}
