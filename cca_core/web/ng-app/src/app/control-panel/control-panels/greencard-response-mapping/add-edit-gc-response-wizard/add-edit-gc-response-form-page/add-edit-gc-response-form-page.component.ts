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
import {GCResponse} from '../../../../../core/mapping/gc-response';
import {AddEditGCResponseWizard} from '../add-edit-gc-response-wizard';

@Component({
  selector: 'cca-add-edit-gc-response-form-page',
  templateUrl: './add-edit-gc-response-form-page.component.html'
})
export class AddEditGCResponseFormPageComponent extends WizardPage<AddEditGCResponseWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  constructor(private responseService: GCMappingService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Greencard Response';

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    Object.assign(this.wizard.model.response, this.wizardForm.getRawValue());

    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((response: GCResponse) => {
          if (response === null) {
            this.toast.error(`Greencard Response failed to ${mode}.`);
          } else {
            this.toast.success(`Greencard Response successfully ${mode}d.`);
            this.wizard.model.response = response;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<GCResponse> {
    if (this.wizard.model.editMode) {
      return this.responseService.updateResponse(this.wizard.model.response);
    } else {
      return this.responseService.createResponse(this.wizard.model.response);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      responseCode: new FormControl(this.wizard.model.response.responseCode, [Validators.required]),
      responseValue: new FormControl(this.wizard.model.response.responseValue, [Validators.required])
    });
  }
}
