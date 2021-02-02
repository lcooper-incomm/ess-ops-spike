import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { RaiseCasePageType, RaiseCaseWizard } from "../raise-case-wizard";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SessionType } from "../../../../model/session-type";
import { SessionDefinitionService } from "../../../../session-definition.service";
import { SpinnerSize } from "../../../../../spinner/spinner-size.enum";
import { SpinnerComponent } from "../../../../../spinner/spinner.component";
import { QueueService } from "../../../../../queue/queue.service";
import { finalize } from 'rxjs/operators';
import { SessionQueue } from "../../../../model/session-queue";
import { SessionComponentType } from "../../../../model/session-component-type.enum";
import * as _ from "lodash";
import { WizardWidth } from "../../../../../wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-raise-case-case-information-page',
  templateUrl: './raise-case-case-information-page.component.html',
  styleUrls: [ './raise-case-case-information-page.component.scss' ]
} )
export class RaiseCaseCaseInformationPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  key: string                       = RaiseCasePageType.CASE_INFORMATION;
  queueOptions: SessionQueue[]      = [];
  sessionTypeOptions: SessionType[] = [];
  SpinnerSize                       = SpinnerSize;
  wizardForm: FormGroup             = new FormGroup ( {} );

  @ViewChild ( 'raiseCaseQueueSpinner' )
  queueSpinner: SpinnerComponent;

  constructor ( private queueService: QueueService,
                private sessionDefinitionService: SessionDefinitionService ) {
    super ();
    this.isNextable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForm ();
  }

  compareQueues ( a: SessionQueue, b: SessionQueue ): boolean {
    return a && b && a.id === b.id;
  }

  compareSessionTypes ( a: SessionType, b: SessionType ): boolean {
    return a && b && a.name === b.name;
  }

  loadQueues (): void {
    let sessionType: SessionType = this.wizardForm.get ( 'sessionType' ).value;
    this.wizardForm.get ( 'queue' ).disable ();
    if ( sessionType ) {
      this.queueSpinner.start ();
      this.queueService.findAllBySessionType ( sessionType.getType () )
        .pipe ( finalize ( () => this.queueSpinner.stop () ) )
        .subscribe ( ( queues: SessionQueue[] ) => {
          this.queueOptions = queues;
          this.wizardForm.get ( 'queue' ).enable ();

          // Set default if only one option
          if (this.queueOptions && this.queueOptions.length === 1) {
            this.wizardForm.get('queue').setValue(this.queueOptions[0]);
          }
        } );
    }
  }

  onLoad (): Observable<any> {
    this.updateForm ();
    this.sessionTypeOptions = this.sessionDefinitionService.getPermittedCaseTypesForRaiseCase ();
    this.loadQueues ();
    this.subscribeToFormChanges ();
    return of ( null );
  }

  onNext (): Observable<string> {
    let nextPage: RaiseCasePageType;
    let sessionType                        = this.wizard.model.sessionType;
    this.wizard.model.hasCustomerComponent = _.includes ( sessionType.components, SessionComponentType.CUSTOMER );
    this.wizard.model.hasEncorComponent    = _.includes ( sessionType.components, SessionComponentType.ENCOR );
    this.wizard.model.hasMerchantComponent = _.includes ( sessionType.components, SessionComponentType.MERCHANT );
    this.wizard.model.hasReceiptComponent  = _.includes ( sessionType.components, SessionComponentType.RECEIPT );

    // First, enable all the pages we'll need
    if ( this.wizard.model.hasCustomerComponent ) {
      this.wizard.pages.get ( RaiseCasePageType.CUSTOMER_INFORMATION ).instance.isIgnored = false;
    }
    if ( this.wizard.model.hasEncorComponent ) {
      this.wizard.pages.get ( RaiseCasePageType.ENCOR_INFORMATION ).instance.isIgnored = false;
    }
    if ( this.wizard.model.hasMerchantComponent ) {
      this.wizard.pages.get ( RaiseCasePageType.MERCHANT_INFORMATION ).instance.isIgnored = false;
    }
    if ( this.wizard.model.hasReceiptComponent ) {
      this.wizard.pages.get ( RaiseCasePageType.RECEIPT_INFORMATION ).instance.isIgnored = false;
    }

    // Then pick the next page to load
    if ( this.wizard.model.hasEncorComponent ) {
      nextPage = RaiseCasePageType.ENCOR_INFORMATION;
    } else if ( this.wizard.model.hasCustomerComponent ) {
      nextPage = RaiseCasePageType.CUSTOMER_INFORMATION;
    } else if ( this.wizard.model.hasMerchantComponent ) {
      nextPage = RaiseCasePageType.MERCHANT_INFORMATION;
    } else if ( this.wizard.model.hasReceiptComponent ) {
      nextPage = RaiseCasePageType.RECEIPT_INFORMATION;
    } else {
      nextPage = RaiseCasePageType.CONFIRMATION;
    }

    return of ( nextPage );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      sessionType: new FormControl ( this.wizard.model.sessionType, [ Validators.required ] ),
      queue: new FormControl ( this.wizard.model.queue ? this.wizard.model.queue.systemName : null, [ Validators.required ] )
    } );
  }

  private subscribeToFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( ( value: any ) => {
          this.wizard.model.sessionType = value.sessionType;
          this.wizard.model.queue       = value.queue;
          this.runAndApplyCodex ().subscribe ();
        } )
    );
  }

  private updateForm (): void {
    this.wizardForm.get ( 'sessionType' ).setValue ( this.wizard.model.sessionType );
    this.wizardForm.get ( 'queue' ).setValue ( this.wizard.model.queue );
  }
}
