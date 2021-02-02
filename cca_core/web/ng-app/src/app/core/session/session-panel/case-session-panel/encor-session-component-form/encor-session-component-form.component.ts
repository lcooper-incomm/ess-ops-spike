import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {mapTo, switchMap, tap} from 'rxjs/operators';
import {AppState} from '../../../../../app-state';
import {SessionService} from '../../../session.service';
import {UpdateEncorComponentAction} from '../../../action/session-actions';
import {AutoSavingSessionComponentForm} from '../auto-saving-session-component-form';
import {buildPriorityOptions, EncorComponent} from '../../../model/encor-component';
import {GenericOption} from '../../../../model/generic-option';
import {Dictionary} from '../../../../dictionary/dictionary';
import {DictionaryService} from '../../../../dictionary/dictionary.service';

@Component({
  selector: 'cca-encor-session-component-form',
  templateUrl: './encor-session-component-form.component.html',
  styleUrls: ['./encor-session-component-form.component.scss']
})
export class EncorSessionComponentFormComponent extends AutoSavingSessionComponentForm implements OnInit {

  priorityOptions: GenericOption<any>[] = [];

  constructor(store: Store<AppState>,
              private dictionaryService: DictionaryService,
              private sessionService: SessionService) {
    super(store);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.priorityOptions = buildPriorityOptions();
    this.updateComplaintType(this.form.get('issueType').value).subscribe();
  }

  /**
   * Clear complaintType if issueType is not Complaint.
   *
   * @param id
   * @param formValue
   */
  private updateComplaintType(id: number, formValue?: any): Observable<any> {
    return this.dictionaryService.find('com.incomm.cca.model.dictionary.EncorTypes', id)
      .pipe(tap((option: Dictionary) => {
        if (option && option.displayValue === 'Complaint') {
          this.form.get('complaintType').enable();
        } else {
          if (formValue) {
            formValue['complaintType'] = null;
          }
          this.form.get('complaintType').disable();
        }
      })
    );
  }

  protected autoSave(formValue: any): Observable<void> {
    return this.updateComplaintType(formValue['issueType'], formValue)
      .pipe(switchMap(() => {
        let request: EncorComponent = new EncorComponent(formValue);
        request.id                  = this.session.encorComponent.id;
        return this.sessionService.updateOneEncorComponent(request)
          .pipe(
            tap(response => {
              this.store.dispatch(new UpdateEncorComponentAction(response));

              this.updateComplaintType(this.form.get('issueType').value);
            }),
            mapTo(null)
          );
      }));
  }
}
