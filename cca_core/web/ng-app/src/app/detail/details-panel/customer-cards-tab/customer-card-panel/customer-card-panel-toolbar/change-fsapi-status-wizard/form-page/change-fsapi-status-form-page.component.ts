import {Component, OnInit} from '@angular/core';
import {WizardPage} from '../../../../../../../core/wizard/wizard-page';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangeFsapiStatusPageType, ChangeFsapiStatusWizard} from '../change-fsapi-status-wizard';
import {Selection} from '../../../../../../../core/session/model/selection';
import {Observable, of} from 'rxjs';
import {CsCoreStatusType} from '../../../../../../../core/model/cs-core-status';
import {AppStateType} from '../../../../../../../app-state-type.enum';
import {SessionState} from '../../../../../../../core/session/session-state';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../../../app-state';
import {TogglzService} from '../../../../../../../core/config/togglz.service';
import {TogglzType} from '../../../../../../../core/config/togglz-type.enum';

@Component({
  selector: 'cca-change-fsapi-status',
  templateUrl: './change-fsapi-status-form-page.component.html',
  styleUrls: ['./change-fsapi-status-form-page.component.scss']
})
export class ChangeFsapiStatusFormPageComponent extends WizardPage<ChangeFsapiStatusWizard> implements OnInit {
  key: string           = ChangeFsapiStatusPageType.FORM_PAGE;
  selection: Selection<any>;
  wizardForm: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>,
              private togglzService: TogglzService) {
    super();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit() {
    this.subscribeToSessionState();
    this.addDisplayNames();
    this.wizard.model.currentStatus = this.wizard.model.card.getStatusByType(CsCoreStatusType.PLATFORM) && this.wizard.model.card.getStatusByPlatform(this.wizard.model.platform).name;
    this.wizard.model.isPinSet      = this.wizard.model.card.alerts.isPinSet;
    this.wizard.model.panLastFour   = this.wizard.model.card.identifiers.panLastFour;
  }

  onLoad(): Observable<string> {
    this.wizard.pages.get(ChangeFsapiStatusPageType.PIN_ALERT_PAGE).instance.isIgnored = true;
    return of(null);
  }

  onNext(): Observable<string> {
    this.wizard.model.comment = this.wizardForm.get('comment').value;
    this.wizard.model.value   = this.wizardForm.get('value').value;

    if (this.showPinPage()) {
      this.wizard.pages.get(ChangeFsapiStatusPageType.PIN_ALERT_PAGE).instance.isIgnored = false;
      return of(ChangeFsapiStatusPageType.PIN_ALERT_PAGE);
    } else {
      return of(ChangeFsapiStatusPageType.CONFIRM_PAGE);
    }
  }

  private addDisplayNames() {
    this.initForms();
  }

  private initForms(): void {
    this.wizardForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      currentStatus: new FormControl(this.wizard.model.card.getStatusByType(CsCoreStatusType.PLATFORM).name),
      isVmsGiftCard: new FormControl(this.wizard.model.card.isVmsGiftCard),
      panLastFour: new FormControl(this.wizard.model.card.identifiers.panLastFour),
      type: new FormControl('CARD_STATUS'),
      value: new FormControl('', [Validators.required])
    });
  }

  private showPinPage() {
    return !this.togglzService.isActive(TogglzType.BYPASS_PIN_CHECK_ON_ACTIVATE_CARD)
      && this.wizardForm.value.value === 'ACTIVE'
      && !this.selection.getCustomer().isVmsGiftCard
      && !this.wizard.model.card.alerts.isPinSet;
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.selection               = state.selection;
            this.wizard.model.customerId = this.selection.getCustomer().id;
            this.wizard.model.platform   = this.selection.platform;
            this.wizard.model.partner    = this.selection.partner;
            this.wizard.model.maskedPan  = this.selection.selectedCard.identifiers.panMasked;
          }
        })
    );
  }

}
