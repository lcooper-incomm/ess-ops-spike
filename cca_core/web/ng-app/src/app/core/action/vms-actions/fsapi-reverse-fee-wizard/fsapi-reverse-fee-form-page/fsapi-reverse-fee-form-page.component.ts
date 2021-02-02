import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FsapiReverseFeeWizard } from '../fsapi-reverse-fee-wizard';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { GenericOption } from 'src/app/core/model/generic-option';
import { ProductActionReasonCodeService } from '../../../product-action-reason-code.service';
import { ReasonCode } from '../../../product-action-reason-code';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { ProductActionReasonCodeType } from '../../../product-action-reason-code-type.enum';
import { Transaction } from 'src/app/core/transaction/transaction';

@Component ( {
  selector: 'cca-fsapi-reverse-fee-form-page',
  templateUrl: './fsapi-reverse-fee-form-page.component.html',
  styleUrls: [ './fsapi-reverse-fee-form-page.component.scss' ]
} )
export class FsapiReverseFeeFormPageComponent extends WizardPage<FsapiReverseFeeWizard> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  reasons: GenericOption<ReasonCode>[] = [];

  private reasons$: Observable<any>;

  constructor ( private actionReasonService: ProductActionReasonCodeService, private formBuilder: FormBuilder ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.reasons$        = this.loadReasons ().pipe ( shareReplay () );
    this.initForm ();
  }

  get transaction (): Transaction {
    return this.wizard.model.transaction;
  }

  onLoad (): Observable<any> {
    return this.reasons$;
  }

  onNext (): Observable<string> {
    this.wizard.model.comment = this.getValueFromForm<string> ( 'comment' );
    this.wizard.model.reason  = this.getValueFromForm<GenericOption<ReasonCode>> ( 'reason' ).value;
    return of ( 'confirmation-page' );
  }

  private initForm () {
    this.wizardForm = this.formBuilder.group ( {
      'comment': [ null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ],
      'reason': [ null, Validators.required ],
    } );
  }

  private loadReasons (): Observable<ReasonCode[]> {
    return this.actionReasonService
      .findAllByPlatformAndType ( PlatformType.VMS, ProductActionReasonCodeType.REVERSE_FEE )
      .pipe (
        tap ( reasons => this.reasons = reasons.map ( FsapiReverseFeeFormPageComponent.mapReason ) ),
      );
  }

  private static mapReason ( reason: ReasonCode ): GenericOption<ReasonCode> {
    return {
      displayValue: reason.reasonDescription,
      value: reason,
    };
  }
}
