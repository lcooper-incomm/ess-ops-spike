import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditPartnerWizard} from '../add-edit-partner-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {PartnerService} from '../../../../../core/partner/partner.service';
import {Partner} from '../../../../../core/session/selection/partner';
import {CcaValidators} from '../../../../../core/validators/cca-validators';
import {GenericOption} from '../../../../../core/model/generic-option';

@Component({
  selector: 'cca-add-edit-partner-form-page',
  templateUrl: './add-edit-partner-form-page.component.html'
})
export class AddEditPartnerFormPageComponent extends WizardPage<AddEditPartnerWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  platforms: GenericOption<any>[] = [
    {value: 'CCL', displayValue: 'CCL'},
    {value: 'VMS', displayValue: 'VMS'},
  ];

  constructor(private partnerService: PartnerService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title            = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Partner';

    this.buildForm();
  }

  applyCodexResponse(partnerxResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    if (this.wizard.model.editMode) {
      this.wizard.model.partner.ivrDnis = this.wizardForm.getRawValue()['ivrDnis'];
    } else {
      Object.assign(this.wizard.model.partner, this.wizardForm.getRawValue());
    }

    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((partner: Partner) => {
          if (partner === null) {
            this.toast.error(`Partner failed to ${mode}.`);
          } else {
            this.toast.success(`Partner successfully ${mode}d.`);
            this.wizard.model.partner = partner;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<Partner> {
    if (this.wizard.model.editMode) {
      return this.partnerService.updateOne(this.wizard.model.partner);
    } else {
      return this.partnerService.create(this.wizard.model.partner);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      ivrDnis: new FormControl(this.wizard.model.partner.ivrDnis, [CcaValidators.ivrDnis()]),
      name: new FormControl(this.wizard.model.partner.name, [Validators.required]),
      platform: new FormControl(this.wizard.model.partner.platform, [Validators.required]),
      type: new FormControl(this.wizard.model.partner.type, []),
    });
  }
}
