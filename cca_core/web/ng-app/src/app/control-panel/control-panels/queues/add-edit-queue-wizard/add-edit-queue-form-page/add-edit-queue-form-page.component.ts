import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditQueueWizard} from '../add-edit-queue-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {QueueService} from '../../../../../core/queue/queue.service';
import {SessionQueue} from '../../../../../core/session/model/session-queue';
import {GenericOption} from '../../../../../core/model/generic-option';
import {getSelectionTypeOptions} from '../../../../../core/session/model/selection-type.enum';

@Component({
  selector: 'cca-add-edit-queue-form-page',
  templateUrl: './add-edit-queue-form-page.component.html'
})
export class AddEditQueueFormPageComponent extends WizardPage<AddEditQueueWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  loaded: boolean         = false;
  selectionTypeOptions: GenericOption<any>[] = getSelectionTypeOptions();

  constructor(private queueService: QueueService) {
    super();
  }

  ngOnInit(): void {
    this.title           = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Queue';
    this.navigationTitle = 'Info';

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Fetch the full queue which includes the session types.
   */
  onLoad(): Observable<any> {
    if (this.wizard.model.editMode && !this.loaded) {
      return this.queueService.findOne(this.wizard.model.queue.id)
        .pipe(
          switchMap((queue: SessionQueue) => {
            this.wizard.model.queue = queue;
            this.loaded = true;
            return of(null);
          })
        );
    } else {
      return of(null);
    }
  }

  /**
   * Update the model from the form and call the update.
   */
  onNext(): Observable<any> {
    Object.assign(this.wizard.model.queue, this.wizardForm.getRawValue());
    return of('types-page');
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      isActive: new FormControl(this.wizard.model.queue.isActive, [Validators.required]),
      isLocked: new FormControl(this.wizard.model.queue.isLocked),
      systemName: new FormControl(this.wizard.model.queue.systemName, [Validators.required, Validators.minLength(1)]),
      i3Name: new FormControl(this.wizard.model.queue.i3Name, [Validators.required, Validators.minLength(1)]),
      displayName: new FormControl(this.wizard.model.queue.displayName, [Validators.required, Validators.minLength(1)]),
      defaultNote: new FormControl(this.wizard.model.queue.defaultNote),
      type: new FormControl(this.wizard.model.queue.type, [Validators.required, Validators.minLength(1)]),
      locale: new FormControl(this.wizard.model.queue.locale, [Validators.required, Validators.minLength(1)]),
      permissionDisplayName: new FormControl(this.wizard.model.queue.permission.displayName)
    });

    this.wizardForm.get('permissionDisplayName').disable();
  }
}
