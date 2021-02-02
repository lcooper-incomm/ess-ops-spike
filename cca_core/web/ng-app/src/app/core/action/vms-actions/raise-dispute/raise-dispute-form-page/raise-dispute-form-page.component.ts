import { Component } from '@angular/core';
import { RaiseDisputePageType, RaiseDisputeWizard } from '../raise-dispute-wizard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CcaFormBuilder } from 'src/app/core/form/cca-form-builder.service';
import { CsCoreAddress, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { GenericOption } from 'src/app/core/model/generic-option';
import { Customer } from 'src/app/core/customer/customer';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Transaction } from 'src/app/core/transaction/transaction';
import { QueueService } from "../../../../queue/queue.service";
import { SessionQueue } from "../../../../session/model/session-queue";
import * as _ from "lodash";
import { ActionReasonCodeMapping, ActionReasonCodeMappingType } from "../../../../mapping/action-reason-code-mapping";
import { MappingService } from "../../../../mapping/mapping.service";
import { SessionDefinitionService } from "../../../../session/session-definition.service";
import { SessionType } from "../../../../session/model/session-type";
import { SessionTypeType } from "../../../../session/session-type-type.enum";
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { DateService } from 'src/app/core/date/date.service';

@Component ( {
  selector: 'cca-raise-dispute-form-page',
  templateUrl: './raise-dispute-form-page.component.html',
  styleUrls: [ './raise-dispute-form-page.component.scss' ]
} )
export class RaiseDisputeFormPageComponent extends WizardPage<RaiseDisputeWizard> {

  key: string           = RaiseDisputePageType.FORM;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor (
    private dateService: DateService,
    private formBuilder: CcaFormBuilder,
    private mappingService: MappingService,
    private queueService: QueueService,
    private sessionDefinitionService: SessionDefinitionService,
  ) {
    super ();
    this.width           = WizardWidth.LARGE;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.wizard.model.isGreenCard = this.wizard.model.selection.platform === 'GREENCARD';
    this.loadSessionTypes ();
    this.initForm ();
  }

  compareById ( a: any, b: any ): boolean {
    return a && b && a.id === b.id;
  }

  onLoad (): Observable<any> {
    return forkJoin ( [
      this.loadReasons (),
      this.loadQueues ()
    ] );
  }

  onNext (): Observable<string> {
    this.wizard.model.comment     = this.getValueFromForm<string> ( 'comment' );
    this.wizard.model.disputeType = this.getValueFromForm<SessionType> ( 'disputeType' );
    this.wizard.model.queue       = this.getValueFromForm<SessionQueue> ( 'disputeQueue' );
    this.wizard.model.reason      = this.getValueFromForm<ActionReasonCodeMapping> ( 'disputeReason' );

    if ( this.wizard.model.isGreenCard || this.customer.isVmsGiftCard ) {
      this.wizard.model.address     = this.getValueFromForm<CsCoreAddress> ( 'address' );
      this.wizard.model.firstName   = this.getValueFromForm<string> ( 'firstName' );
      this.wizard.model.dateOfBirth = this.getValueFromForm<string> ( 'dateOfBirth' );
      this.wizard.model.homePhone   = this.getPhoneNumber ( 'homePhone', CsCorePhoneNumberType.LANDLINE );
      this.wizard.model.lastName    = this.getValueFromForm<string> ( 'lastName' );
      this.wizard.model.mobilePhone = this.getPhoneNumber ( 'mobilePhone', CsCorePhoneNumberType.MOBILE );
      if ( this.wizard.model.mobilePhone ) {
        this.wizard.model.phoneNumber = this.wizard.model.mobilePhone;
      } else if ( !this.wizard.model.mobilePhone && this.wizard.model.homePhone ) {
        this.wizard.model.phoneNumber = this.wizard.model.homePhone;
      }
    } else {
      const customer                = this.wizard.model.selection.getCustomer ();
      this.wizard.model.dateOfBirth = customer.dateOfBirth && this.dateService.convertYYYYMMDDToMMDDYYYY ( customer.dateOfBirth );
      this.wizard.model.firstName   = customer.firstName;
      this.wizard.model.lastName    = customer.lastName;
      this.wizard.model.address     = customer.getPreferredAddress ();
      this.wizard.model.email       = customer.emailAddress;
      this.wizard.model.phoneNumber = customer.getPreferredPhone ();
      this.wizard.model.homePhone   = customer.getPhoneNumberByType ( CsCorePhoneNumberType.LANDLINE );
      this.wizard.model.mobilePhone = customer.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );
    }
    if ( this.codexResponse.questions && this.codexResponse.questions.length ) {
      return of ( RaiseDisputePageType.QUESTIONS );
    } else {
      return of ( RaiseDisputePageType.DOCUMENT );
    }
  }

  reasonChanged (): void {
    this.runAndApplyCodex ()
      .subscribe ( () => {
        this.wizard.pages.get ( RaiseDisputePageType.QUESTIONS ).instance.isIgnored = !(this.codexResponse.questions && this.codexResponse.questions.length);
      } )
  }

  private getPhoneNumber ( field: string, type: CsCorePhoneNumberType ): CsCorePhoneNumber {
    const number = this.getValueFromForm<string> ( field );
    return number && new CsCorePhoneNumber ( { number, type } );
  }

  get customer (): Customer {
    return this.wizard.model.selection.getCustomer ();
  }

  get transactions (): Transaction[] {
    return this.wizard.model.transactions;
  }

  /**
   * Create the form based upon the platform and dispute type.
   */
  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      comment: this.formBuilder.comment ( this.wizard.model.comment, true ),
      disputeType: new FormControl ( {
        value: this.wizard.model.typeOptions[ 0 ].value,
        disabled: true
      }, Validators.required ),
      disputeQueue: new FormControl ( { value: this.wizard.model.queue, disabled: this.wizard.model.isGreenCard }, Validators.required ),
      disputeReason: new FormControl ( this.wizard.model.reason, [ Validators.required ] ),
    } );
    if ( this.wizard.model.isGreenCard || this.customer.isVmsGiftCard ) {
      this.wizardForm.addControl ( 'address', this.formBuilder.address ( null, true ) );
      this.wizardForm.addControl ( 'firstName', new FormControl ( null, Validators.required ) );
      this.wizardForm.addControl ( 'dateOfBirth', new FormControl ( null, Validators.required ) );
      this.wizardForm.addControl ( 'homePhone', this.formBuilder.phoneNumber ( null, false ) );
      this.wizardForm.addControl ( 'lastName', new FormControl ( null, Validators.required ) );
      this.wizardForm.addControl ( 'mobilePhone', this.formBuilder.phoneNumber ( null, false ) );
    } else {
      // TODO: Legacy disables next in this case but there is no message to the user. Probably just prevent them from opening the form.
      const isValid = !!this.customer.firstName
        && !!this.customer.lastName
        && !!this.customer.dateOfBirth
        && !!this.customer.getPhoneNumberByType ( CsCorePhoneNumberType.LANDLINE )
        && !!this.customer.getPreferredAddress ();

      this.wizardForm.addControl ( 'isValid', new FormControl ( isValid, Validators.requiredTrue ) );
    }
  }

  private loadQueues (): Observable<any> {
    if ( !this.wizard.model.queueOptions.length ) {
      return this.queueService.findAllCaseQueues ()
        .pipe ( tap ( ( queues: SessionQueue[] ) => {
          let options: GenericOption<SessionQueue>[] = [];
          if(this.wizard.model.isGreenCard ){
            queues.forEach( ( ( queue: SessionQueue ) => {
              if ( queue.systemName === 'QUEUE_FRD_GIFTCARD_DISPUTE'  ) {
                options.push( new GenericOption({
                  displayValue:queue.displayName,
                  value: queue
                }))
              }
            }))
          }
          else  {
            queues.forEach( ( ( queue: SessionQueue ) => {
              if ( queue.systemName === 'COLUMBIA_GIFT_CARD' ||  queue.systemName === 'QUEUE_FRD_DISPUTE_VMS_TRANSACTIONS') {
                options.push( new GenericOption({
                  displayValue:queue.displayName,
                  value: queue
                }))
              }
            }))
          }
          this.wizard.model.queueOptions = options;
          this.wizardForm.get ( 'disputeQueue' ).setValue ( options[0].value );
          if(options.length <=1) {
            this.wizardForm.get('disputeQueue').disable();
          }
        } ) );
    } else {
      return of ( null );
    }
  }

  private loadReasons (): Observable<any> {
    if ( !this.wizard.model.reasonOptions.length ) {
      return this.mappingService.findAll ( ActionReasonCodeMappingType.RAISE_DISPUTE, this.wizard.model.selection.platform )
        .pipe ( tap ( ( reasons: ActionReasonCodeMapping[] ) => {
          let options: GenericOption<ActionReasonCodeMapping>[] = [];
          reasons.forEach ( ( reason: ActionReasonCodeMapping ) => options.push ( new GenericOption ( {
            displayValue: reason.displayValue,
            value: reason
          } ) ) );
          this.wizard.model.reasonOptions = options;
        } ) );
    } else {
      return of ( null );
    }
  }

  private loadSessionTypes (): void {
    if ( !this.wizard.model.typeOptions.length ) {
      let disputeType: SessionType = _.find ( this.sessionDefinitionService.getAllSessionTypes (), ( sessionType: SessionType ) => {
        return sessionType.getType () === SessionTypeType.DISPUTE;
      } );
      if ( disputeType ) {
        this.wizard.model.typeOptions.push ( new GenericOption ( {
          value: disputeType,
          displayValue: disputeType.displayName
        } ) );
        this.wizard.model.disputeType = disputeType;
      }
    }
  }
}
