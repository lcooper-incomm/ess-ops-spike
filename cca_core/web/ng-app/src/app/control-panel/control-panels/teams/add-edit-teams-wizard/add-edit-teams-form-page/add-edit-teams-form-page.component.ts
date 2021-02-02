import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {AddEditTeamsWizard} from '../add-edit-teams-wizard';
import {Team} from '../../../../../core/auth/team';
import {TeamService} from '../../../../../core/team/team.service';

@Component({
  selector: 'cca-add-edit-teams-form-page',
  templateUrl: './add-edit-teams-form-page.component.html'
})
export class AddEditTeamsFormPageComponent extends WizardPage<AddEditTeamsWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  loaded: boolean         = false;

  constructor(private teamService: TeamService) {
    super();
  }

  ngOnInit(): void {
    this.title           = (this.wizard.model.editMode ? 'Edit' : 'Add') + ' Team';
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
      return this.teamService.findOne(this.wizard.model.team.id)
        .pipe(
          switchMap((team: Team) => {
            this.wizard.model.team = team;
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
    Object.assign(this.wizard.model.team, this.wizardForm.getRawValue());
    return of('user-page');
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      systemName: new FormControl(this.wizard.model.team.systemName, [Validators.required, Validators.minLength(1)]),
      displayName: new FormControl(this.wizard.model.team.displayName, [Validators.required, Validators.minLength(1)]),
      description: new FormControl(this.wizard.model.team.description)
    });
  }
}
