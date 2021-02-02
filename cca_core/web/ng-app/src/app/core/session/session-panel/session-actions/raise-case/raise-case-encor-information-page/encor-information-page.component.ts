import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../../wizard/wizard-page';
import {RaiseCasePageType, RaiseCaseWizard} from '../raise-case-wizard';
import {SessionFormBuilder} from '../../../session-form-builder.service';
import {WizardWidth} from '../../../../../wizard/wizard-width.enum';
import {buildPriorityOptions, EncorComponent, EncorPriority} from '../../../../model/encor-component';
import {GenericOption} from '../../../../../model/generic-option';
import {DictionaryService} from '../../../../../dictionary/dictionary.service';
import {Dictionary} from '../../../../../dictionary/dictionary';
import {IdentifierType} from "../../../../model/identifier-type.enum";

@Component({
  selector: 'cca-raise-case-encor-information-page',
  templateUrl: './encor-information-page.component.html'
})
export class RaiseCaseEncorInformationPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  key: string           = RaiseCasePageType.ENCOR_INFORMATION;
  wizardForm: FormGroup = new FormGroup({});

  priorityOptions: GenericOption<any>[] = [];

  constructor(private sessionFormBuilder: SessionFormBuilder,
              private dictionaryService: DictionaryService) {
    super();
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  ngOnInit() {
    this.initForm();
  }

  onNext(): Observable<string> {
    this.wizard.model.encorComponent = new EncorComponent(this.wizardForm.get('encorComponent').value);

    return of(RaiseCasePageType.CUSTOMER_INFORMATION);
  }

  private initForm(): void {
    this.wizardForm = new FormGroup({
      encorComponent: this.sessionFormBuilder.buildEncorComponentForm(new EncorComponent({}))
    });

    let memberNumber = null;

    if (this.wizard.model.selection) {
      this.wizard.model.selection.identifiers.forEach (function (id) {
        if (id.type === IdentifierType.MEMBER_NUMBER) {
          memberNumber = id.value;
        }
      } );
    }

    this.wizardForm.get('encorComponent').get('customerId').setValue(this.wizard.model.encorComponent ? this.wizard.model.encorComponent.customerId : memberNumber );
    this.wizardForm.get('encorComponent').get('orderId').setValue(this.wizard.model.encorComponent ? this.wizard.model.encorComponent.orderId : null);
    this.priorityOptions = buildPriorityOptions();
    this.wizardForm.get('encorComponent').get('priority').setValue(EncorPriority.MEDIUM);
    this.wizardForm.get('encorComponent').get('complaintType').disable();

    this.updateComplaintType(this.wizardForm.get('encorComponent').get('issueType').value);
    this.wizardForm.get('encorComponent').get('issueType').valueChanges.subscribe((id: number) => {
      this.updateComplaintType(id);
    });
  }

  /**
   * Clear complaintType if issueType is not Complaint.
   *
   * @param id
   */
  private updateComplaintType(id: number): void {
    // Enable complaintType only if issueType is Complaint
    this.dictionaryService.find('com.incomm.cca.model.dictionary.EncorTypes', id)
      .subscribe((option: Dictionary) => {
        if (option && option.displayValue === 'Complaint') {
          this.wizardForm.get('encorComponent').get('complaintType').enable();
        } else {
          this.wizardForm.get('encorComponent').get('complaintType').setValue(null);
          this.wizardForm.get('encorComponent').get('complaintType').disable();
        }
      });
  }
}
