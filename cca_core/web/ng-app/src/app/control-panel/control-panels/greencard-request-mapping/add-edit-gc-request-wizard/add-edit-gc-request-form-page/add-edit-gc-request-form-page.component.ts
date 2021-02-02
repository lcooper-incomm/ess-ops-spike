import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {GCMappingService} from '../../../../../core/mapping/gc-mapping.service';
import {GCRequest} from '../../../../../core/mapping/gc-request';
import {AddEditGCRequestWizard} from '../add-edit-gc-request-wizard';
import {GenericOption} from '../../../../../core/model/generic-option';
import {getTransactionTypeOptions} from '../../../../../core/transaction/transaction-type.enum';

@Component({
  selector: 'cca-add-edit-gc-request-form-page',
  templateUrl: './add-edit-gc-request-form-page.component.html'
})
export class AddEditGCRequestFormPageComponent extends WizardPage<AddEditGCRequestWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  transactionTypeOptions: GenericOption<any>[] = getTransactionTypeOptions();

  constructor(private requestService: GCMappingService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Greencard Request';

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    Object.assign(this.wizard.model.request, this.wizardForm.getRawValue());

    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((request: GCRequest) => {
          if (request === null) {
            this.toast.error(`Greencard Request failed to ${mode}.`);
          } else {
            this.toast.success(`Greencard Request successfully ${mode}d.`);
            this.wizard.model.request = request;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<GCRequest> {
    if (this.wizard.model.editMode) {
      return this.requestService.updateRequest(this.wizard.model.request);
    } else {
      return this.requestService.createRequest(this.wizard.model.request);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      x95Code: new FormControl(this.wizard.model.request.x95Code, [Validators.required]),
      requestCode: new FormControl(this.wizard.model.request.requestCode, [Validators.required]),
      requestValue: new FormControl(this.wizard.model.request.requestValue, [Validators.required]),
      transactionType: new FormControl(this.wizard.model.request.transactionType, [Validators.required]),
    });
  }
}
