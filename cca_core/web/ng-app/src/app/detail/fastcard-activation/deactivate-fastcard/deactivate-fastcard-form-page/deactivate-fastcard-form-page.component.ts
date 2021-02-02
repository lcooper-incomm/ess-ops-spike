import {Component, OnInit} from '@angular/core';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {DeactivateFastcardWizard} from '../deactivate-fastcard-wizard';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Card} from 'src/app/core/card/card';
import {GenericOption} from 'src/app/core/model/generic-option';
import {SecurityService} from 'src/app/core/security/security.service';
import {Permission} from 'src/app/core/auth/permission';
import {ApsLocation, CreditingOption, SimpleIdentifier} from '../../aps/aps-models';
import {DeactivationService} from '../deactivation.service';
import {DeactivateFastcardRequest, RequestActionType} from '../../aps/aps-request';
import {switchMap, tap} from 'rxjs/operators';
import {ApsService} from '../../aps/aps.service';

export type MerchantId = string;

@Component({
  selector: 'cca-deactivate-fastcard-form-page',
  templateUrl: './deactivate-fastcard-form-page.component.html',
  styleUrls: ['./deactivate-fastcard-form-page.component.scss'],
})
export class DeactivateFastcardFormPageComponent extends WizardPage<DeactivateFastcardWizard> implements OnInit {
  key: string             = 'form-page';
  wizardForm: FormGroup   = this.formBuilder.group({
    comment: [null],
    crediting: [null],
    reason: [null],
    identifier: [null],
    overrideShortPay: [false],
  });
  closeButtonText: string = 'Cancel';
  isCloseable: boolean    = true;
  isNextable: boolean     = true;

  deactivationLocation: ApsLocation;
  shortPayDeactivationLocation: ApsLocation;

  error: boolean     = false;
  searching: boolean = false;

  creditingOptions: GenericOption<CreditingOption>[] = DeactivationService.getDeactivationCreditingOptions();
  reasons: string[]                                  = DeactivationService.getDeactivationReasons();

  private deactivationLocations: Map<CreditingOption, ApsLocation> = new Map();

  constructor(
    private formBuilder: FormBuilder,
    private deactivationService: DeactivationService,
    private securityService: SecurityService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initActivatingLocations();

    this.onFormFieldChange('crediting', this.handleCreditingChange.bind(this));
  }

  get canOverrideShortPay(): boolean {
    return this.getCrediting() && !this.isIncommCrediting && this.hasShortPay && this.securityService.hasPermission(Permission.OVERRIDE_SHORT_PAY)
  }

  get hasShortPay(): boolean {
    return !!this.shortPayDeactivationLocation;
  }

  get isIncommCrediting(): boolean {
    const crediting = this.getCrediting();
    return !!crediting && crediting.value === CreditingOption.INCOMM;
  }

  onNext(): Observable<string> {
    const [request, merchantId]  = this.buildRequest();
    this.wizard.model.request    = request;
    this.wizard.model.merchantId = merchantId;
    return of('confirmation-page');
  }

  get overrideShortPay(): string {
    return this.getValueFromForm('overrideShortPay');
  }

  private buildRequest(): [DeactivateFastcardRequest, MerchantId] {
    // Selection and form data
    const card    = this.getCard();
    const comment = this.getComment();
    const note    = this.getReason();

    const identifierData = this.getIdentifier();

    //CCA-3055 Use 'return' for FastPin products with activation type '2200'
    const isSpecialFastPin: boolean        = card.activation && card.activation.type && card.activation.type.code === '2200';
    const requestAction: RequestActionType = isSpecialFastPin ? 'return' : 'deact';
    const identifier                       = isSpecialFastPin ? card.identifiers.vendorPin : identifierData.identifier;
    const identifierType                   = isSpecialFastPin ? 'fastpin' : identifierData.identifierType;

    // Activating location data
    const merchantId              = this.deactivationLocation.merchantId;
    const overrideMerchant        = this.isIncommCrediting || this.hasShortPay;
    const useShortPayLocationData = !this.isIncommCrediting && this.hasShortPay && !this.overrideShortPay;
    const billingData             = useShortPayLocationData ? this.shortPayDeactivationLocation : this.deactivationLocation;

    const data = {
      requestAction,
      comment,
      identifier,
      identifierType,
      overrideMerchant,
      note,
      ...billingData,
    };

    return [new DeactivateFastcardRequest(data), merchantId];
  }

  private getCard(): Card {
    return this.wizard.model.selection.getCard();
  }

  private getIdentifier(): SimpleIdentifier {
    return this.getValueFromForm('identifier');
  }

  private getCrediting(): GenericOption<CreditingOption> {
    return this.getValueFromForm('crediting');
  }

  private getComment(): string {
    return this.getValueFromForm('comment');
  }

  private getReason(): string {
    return this.getValueFromForm('reason');
  }

  private handleCreditingChange(crediting: GenericOption<CreditingOption>): void {
    const activatingLocation = this.deactivationLocations.get(crediting.value);
    if (activatingLocation) {
      this.deactivationLocation = activatingLocation;
      this.error                = false;
    } else {
      this.error = true;
    }
  }

  private initForm(): void {
    const card       = this.getCard();
    const identifier = card && ApsService.getBestIdentifierCombo(card);

    this.wizardForm = this.formBuilder.group({
      comment: [null, Validators.required],
      crediting: [null, Validators.required],
      reason: [null, Validators.required],
      identifier: [identifier, Validators.required],
      overrideShortPay: [false],
    });
  }

  private initActivatingLocations(): void {
    const card = this.getCard();
    this.deactivationLocations.clear();

    // Non-billable option
    this.deactivationLocations.set(CreditingOption.INCOMM, this.deactivationService.getIncommApsLocation());

    // Billable option
    this.addSubscription(
      this.deactivationService.getActivationApsLocation(card)
        .pipe(
          tap(activationLocation => this.deactivationLocations.set(CreditingOption.ACTIVATING_LOCATION, activationLocation)),
          // Also load the short pay for this location
          switchMap(activationLocation => this.loadShortPay(activationLocation)),
          tap(shortPayLocation => this.shortPayDeactivationLocation = shortPayLocation)
        )
        .subscribe()
    );
  }

  private loadShortPay(location: ApsLocation | null): Observable<ApsLocation> {
    if (location && location.merchantLegacyId) {
      return this.deactivationService.getShortPayApsLocation(location.merchantLegacyId);
    } else {
      return of(null);
    }
  }
}
