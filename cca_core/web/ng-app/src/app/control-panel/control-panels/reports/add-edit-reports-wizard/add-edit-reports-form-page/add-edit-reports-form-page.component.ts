import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {ReportService} from '../../../../../reports/report.service';
import {Report} from '../../../../../reports/report';
import {AddEditReportsWizard} from '../add-edit-reports-wizard';

@Component({
  selector: 'cca-add-edit-reports-form-page',
  templateUrl: './add-edit-reports-form-page.component.html'
})
export class AddEditReportsFormPageComponent extends WizardPage<AddEditReportsWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  constructor(private reportService: ReportService) {
    super();
  }

  ngOnInit(): void {
    this.title = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Report';

    this.buildForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Update the model from the form and call the update.
   */
  onNext(): Observable<any> {
    Object.assign(this.wizard.model.report, this.wizardForm.getRawValue());

    return this.createOrUpdate()
      .pipe(
        switchMap(() => {
          return of(null);
        })
      );
  }

  /**
   * Call updateOne or create depending on the wizard mode.
   */
  private createOrUpdate(): Observable<Report> {
    if (this.wizard.model.editMode) {
      return this.reportService.updateOne(this.wizard.model.report);
    } else {
      return this.reportService.create(this.wizard.model.report);
    }
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      status: new FormControl(this.wizard.model.report.status, [Validators.required]),
      name: new FormControl(this.wizard.model.report.name, [Validators.required]),
      link: new FormControl(this.wizard.model.report.link, [Validators.required]),
      permissionDisplayName: new FormControl(this.wizard.model.report.permission.displayName)
    });

    this.wizardForm.get('permissionDisplayName').disable();
  }
}
