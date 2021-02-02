import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditOpCodeWizard} from '../add-edit-opcode-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {ToastFactory} from '../../../../../toast/toast-factory.service';
import {MaplesTransactionService} from '../../../../../core/transaction/maples-transaction.service';
import {OpCodeDescriptor} from '../../../../../core/transaction/op-code';
import {GenericOption} from '../../../../../core/model/generic-option';
import {getTransactionTypeOptions} from '../../../../../core/transaction/transaction-type.enum';

@Component({
  selector: 'cca-add-edit-opcode-form-page',
  templateUrl: './add-edit-opcode-form-page.component.html'
})
export class AddEditOpCodeFormPageComponent extends WizardPage<AddEditOpCodeWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText          = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  transactionTypeOptions: GenericOption<any>[] = getTransactionTypeOptions();

  constructor(private transactionService: MaplesTransactionService,
              private toast: ToastFactory) {
    super();
  }

  ngOnInit(): void {
    this.title       = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' OpCode';
    this.isDeletable = this.wizard.model.editMode;
    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    Object.assign(this.wizard.model.opcode, this.wizardForm.getRawValue());

    let mode: string = this.wizard.model.editMode ? 'update' : 'create';

    return this.createOrUpdate()
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((opcode: OpCodeDescriptor) => {
          if (opcode === null) {
            this.toast.error(`OpCode failed to ${mode}.`);
          } else {
            this.toast.success(`OpCode successfully ${mode}d.`);
            this.wizard.model.opcode = opcode;
          }
          return of(null);
        })
      );
  }

  onDelete(): Observable<any> {
    return this.transactionService.deleteOpCode(this.wizard.model.opcode)
      .pipe(
        catchError(() => of(null))
      )
      .pipe(
        switchMap((opcode: OpCodeDescriptor) => {
          if (opcode === null) {
            this.toast.error(`OpCode failed to delete.`);
          } else {
            this.toast.success(`OpCode successfully deleted.`);
            this.wizard.model.opcode = opcode;
          }
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on what mode the wizard is in.
   */
  private createOrUpdate(): Observable<OpCodeDescriptor> {
    if (this.wizard.model.editMode) {
      return this.transactionService.updateOpCode(this.wizard.model.opcode);
    } else {
      return this.transactionService.createOpCode(this.wizard.model.opcode);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      code: new FormControl(this.wizard.model.opcode.code, [Validators.required]),
      requestValue: new FormControl(this.wizard.model.opcode.requestValue, [Validators.required]),
      responseValue: new FormControl(this.wizard.model.opcode.responseValue, [Validators.required, Validators.minLength(1)]),
      transactionType: new FormControl(this.wizard.model.opcode.transactionType, [Validators.required, Validators.minLength(1)]),
    });
  }
}
