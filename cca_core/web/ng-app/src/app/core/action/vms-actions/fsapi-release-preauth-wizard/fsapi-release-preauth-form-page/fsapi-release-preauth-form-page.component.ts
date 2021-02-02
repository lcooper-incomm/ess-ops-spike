import { Component } from '@angular/core';
import { FsapiReleasePreauthWizard } from '../fsapi-release-preauth-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductActionReasonCodeService } from '../../../product-action-reason-code.service';
import { tap, shareReplay } from 'rxjs/operators';
import { ProductActionReasonCodeType } from '../../../product-action-reason-code-type.enum';
import { ReasonCode } from '../../../product-action-reason-code';
import { GenericOption } from 'src/app/core/model/generic-option';

@Component ( {
  selector: 'cca-fsapi-release-preauth-form-page',
  templateUrl: './fsapi-release-preauth-form-page.component.html',
  styleUrls: [ './fsapi-release-preauth-form-page.component.scss' ]
} )
export class FsapiReleasePreauthFormPageComponent extends WizardPage<FsapiReleasePreauthWizard> {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  reasons: GenericOption<ReasonCode>[] = [];
  private reasons$: Observable<ReasonCode[]>;

  constructor ( private formBuilder: FormBuilder, private reasonCodeService: ProductActionReasonCodeService ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.initForm ();
  }

  ngOnInit () {
    this.reasons$ = this.loadReasons ().pipe ( shareReplay () );
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
      'reason': [ null, Validators.required ],
      'comment': [ null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] ],
    } );
  }

  private loadReasons (): Observable<ReasonCode[]> {
    return this.reasonCodeService
      .findAllByPlatformAndType ( this.wizard.model.selection.platform, ProductActionReasonCodeType.RELEASE_PRE_AUTH )
      .pipe (
        tap ( reasons => this.reasons = reasons.map ( FsapiReleasePreauthFormPageComponent.mapReason ) ),
      );
  }

  private static mapReason ( reason: ReasonCode ): GenericOption<ReasonCode> {
    return { value: reason, displayValue: reason.reasonDescription };
  }
}
