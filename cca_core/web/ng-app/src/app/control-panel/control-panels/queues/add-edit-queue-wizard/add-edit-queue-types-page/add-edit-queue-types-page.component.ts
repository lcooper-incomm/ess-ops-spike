import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {AddEditQueueWizard} from '../add-edit-queue-wizard';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {SessionTypeType} from '../../../../../core/session/session-type-type.enum';
import {GenericOption} from '../../../../../core/model/generic-option';
import {getSelectionTypeOptions} from '../../../../../core/session/model/selection-type.enum';

@Component({
  selector: 'cca-add-edit-queue-types-page',
  templateUrl: './add-edit-queue-types-page.component.html'
})
export class AddEditQueueTypesPageComponent extends WizardPage<AddEditQueueWizard> implements OnInit {

  key: string             = 'types-page';
  wizardForm: FormGroup   = new FormGroup({});
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  selectionTypeOptions: GenericOption<any>[] = getSelectionTypeOptions();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.title           = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Queue';
    this.navigationTitle = 'Types';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Update the model from the form and call the update.
   */
  onNext(): Observable<any> {
    return of('categories-page');
  }

  /**
   * Return a list of session types which don't already exist in the queue.
   */
  public getSessionTypeList(): string[] {
    let addTypes: SessionTypeType[] = Object.keys(SessionTypeType).map((key: string) => SessionTypeType[key]);
    return addTypes.filter((type: SessionTypeType) => this.wizard.model.queue.sessionTypes.indexOf(type) === -1);
  }

  /**
   * Push the passed in sessionType to the array.
   *
   * @param sessionType
   */
  public addSessionType(sessionType: string): void {
    this.wizard.model.queue.sessionTypes.push(SessionTypeType[sessionType]);
  }

  /**
   * Delete the passed in sessionType from the array.
   *
   * @param sessionType
   */
  public deleteSessionType(sessionType: string): void {
    this.wizard.model.queue.sessionTypes = this.wizard.model.queue.sessionTypes.filter((type: SessionTypeType) => {
      return sessionType !== type;
    });
  }
}
