import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {forkJoin, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CsCoreAddress, CsCorePhoneNumber, CsCorePhoneNumberType} from '@cscore/core-client-model';
import {MaplesAccountCode, MaplesCustomer, MaplesTransaction} from '@cscore/maples-client-model';
import {ServeRaiseDisputeWizard} from '../serve-raise-dispute-wizard';
import {CcaFormBuilder} from 'src/app/core/form/cca-form-builder.service';
import {WizardWidth} from 'src/app/core/wizard/wizard-width.enum';
import {GenericOption} from 'src/app/core/model/generic-option';
import {Customer} from 'src/app/core/customer/customer';
import {QueueService} from '../../../../queue/queue.service';
import {SessionQueue} from '../../../../session/model/session-queue';
import {MappingService} from '../../../../mapping/mapping.service';
import {SessionDefinitionService} from '../../../../session/session-definition.service';
import {SessionType} from '../../../../session/model/session-type';
import {SessionTypeType} from '../../../../session/session-type-type.enum';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {DateService} from 'src/app/core/date/date.service';
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cca-serve-raise-dispute-form-page',
  templateUrl: './serve-raise-dispute-form-page.component.html'
})
export class ServeRaiseDisputeFormPageComponent extends WizardPage<ServeRaiseDisputeWizard> {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(
    private customerAccountService: CustomerAccountService,
    private dateService: DateService,
    private formBuilder: CcaFormBuilder,
    private mappingService: MappingService,
    private queueService: QueueService,
    private sessionDefinitionService: SessionDefinitionService,
  ) {
    super();
    this.width           = WizardWidth.LARGE;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.title           = 'Raise Dispute';
    this.navigationTitle = 'Form';
  }

  ngOnInit(): void {
    this.loadSessionTypes();
    this.initForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  compareById(a: any, b: any): boolean {
    return a && b && a.id === b.id;
  }

  onLoad(): Observable<any> {
    return forkJoin([
      this.loadReasons(),
      this.loadQueues()
    ]);
  }

  onNext(): Observable<string> {
    this.wizard.model.comment           = this.getValueFromForm<string>('comment');
    this.wizard.model.disputeType       = this.getValueFromForm<SessionType>('disputeType');
    this.wizard.model.queue             = this.getValueFromForm<SessionQueue>('disputeQueue');
    this.wizard.model.reason            = this.getValueFromForm<MaplesAccountCode>('disputeReason');
    this.wizard.model.loadDisputeAmount = this.getValueFromForm<string>('loadDisputeAmount');

    this.wizard.model.address     = this.getValueFromForm<CsCoreAddress>('address');
    this.wizard.model.firstName   = this.getValueFromForm<string>('firstName');
    this.wizard.model.dateOfBirth = this.getValueFromForm<string>('dateOfBirth');
    this.wizard.model.homePhone   = this.getPhoneNumber('homePhone', CsCorePhoneNumberType.LANDLINE);
    this.wizard.model.lastName    = this.getValueFromForm<string>('lastName');
    this.wizard.model.mobilePhone = this.getPhoneNumber('mobilePhone', CsCorePhoneNumberType.MOBILE);
    if (this.wizard.model.mobilePhone) {
      this.wizard.model.phoneNumber = this.wizard.model.mobilePhone;
    } else if (!this.wizard.model.mobilePhone && this.wizard.model.homePhone) {
      this.wizard.model.phoneNumber = this.wizard.model.homePhone;
    }
    return of('confirmation-page');
  }

  private getPhoneNumber(field: string, type: CsCorePhoneNumberType): CsCorePhoneNumber {
    const number = this.getValueFromForm<string>(field);
    return number && new CsCorePhoneNumber({number, type});
  }

  get customer(): Customer {
    return this.wizard.model.selection.getCustomer();
  }

  get transactions(): MaplesTransaction[] {
    return this.wizard.model.transactions;
  }

  /**
   * Create the form based upon the platform and dispute type.
   */
  private initForm(): void {
    const customer: MaplesCustomer       = this.wizard.model.selection.getCustomerAccount().customer;
    const homePhone: CsCorePhoneNumber   = customer.phoneNumbers.find((phone: CsCorePhoneNumber) => {
      return phone.type === CsCorePhoneNumberType.HOME;
    });
    const mobilePhone: CsCorePhoneNumber = customer.phoneNumbers.find((phone: CsCorePhoneNumber) => {
      return phone.type === CsCorePhoneNumberType.MOBILE;
    });

    this.wizardForm = new FormGroup({
      comment: this.formBuilder.comment(this.wizard.model.comment, true),
      disputeType: new FormControl({
        value: this.wizard.model.typeOptions[0].value,
        disabled: true
      }, Validators.required),
      disputeQueue: new FormControl({value: this.wizard.model.queue, disabled: false}, Validators.required),
      disputeReason: new FormControl(this.wizard.model.reason, [Validators.required]),
      loadDisputeAmount: new FormControl(null, this.wizard.model.isLoadDispute ? [Validators.required] : [])
    });
    this.wizardForm.addControl('address', this.formBuilder.address(customer.getPrimaryAddress(), true));
    this.wizardForm.addControl('firstName', new FormControl(customer.firstName, Validators.required));
    this.wizardForm.addControl('dateOfBirth', new FormControl(customer.dateOfBirth, Validators.required));
    this.wizardForm.addControl('homePhone', this.formBuilder.phoneNumber(homePhone ? homePhone.number : null, false));
    this.wizardForm.addControl('lastName', new FormControl(customer.lastName, Validators.required));
    this.wizardForm.addControl('mobilePhone', this.formBuilder.phoneNumber(mobilePhone ? mobilePhone.number : null, false));
  }

  private loadQueues(): Observable<any> {
    if (!this.wizard.model.queueOptions.length) {
      return this.queueService.findAllCaseQueues()
        .pipe(tap((queues: SessionQueue[]) => {
          queues = queues.filter((queue: SessionQueue) => queue.systemName === 'QUEUE_FRD_DISPUTE_SERVE_TRANSACTIONS');
          if (queues && queues.length > 0) {
            this.wizard.model.queue = queues[0];
            this.wizardForm.get('disputeQueue').setValue(queues[0]);
            for (let queue of queues) {
              this.wizard.model.queueOptions.push(new GenericOption<SessionQueue>({
                value: queue,
                displayValue: queue.displayName
              }));
            }
          }
        }));
    } else {
      return of(null);
    }
  }

  private loadReasons(): Observable<any> {
    return this.customerAccountService.findAccountDisputeReasonOptions(this.wizard.model.selection.getMaplesPlatform()).pipe(
      tap((reasonOptions: GenericOption<MaplesAccountCode>[]) => {
        this.wizard.model.reasonOptions = reasonOptions;
      })
    );
  }

  private loadSessionTypes(): void {
    if (!this.wizard.model.typeOptions.length) {
      let disputeType: SessionType = _.find(this.sessionDefinitionService.getAllSessionTypes(), (sessionType: SessionType) => {
        return sessionType.getType() === SessionTypeType.DISPUTE;
      });
      if (disputeType) {
        this.wizard.model.typeOptions.push(new GenericOption({
          value: disputeType,
          displayValue: disputeType.displayName
        }));
        this.wizard.model.disputeType = disputeType;
      }
    }
  }
}
